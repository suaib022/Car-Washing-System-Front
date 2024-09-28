/* eslint-disable react-hooks/rules-of-hooks */
import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import errorImg from "../../assets/images/Result/error-404.png";
import { Flex, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useGetSingleServiceQuery } from "../../redux/features/service/serviceApi";
import { Button } from "../../components/ui/button";
import { useGetAllSlotsQuery } from "../../redux/features/slots/slotApi";
import BookService from "../../components/modal/user/BookService";
import { useState } from "react";
import type { DatePickerProps, TableColumnsType, TableProps } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";
type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  _id: string;
  slotInterval: string;
}

const ProductDetails = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedItems, setSelectedItems] = useState<DataType[]>([]);
  const { serviceId } = useParams<{ serviceId: string }>();
  const [date, selectDate] = useState(moment().format("YYYY-MM-DD"));

  const navigate = useNavigate();

  if (serviceId === undefined) {
    return <div>Error: ID is missing</div>;
  }

  const {
    data: service,
    isLoading,
    isError,
  } = useGetSingleServiceQuery(serviceId);

  const { data: availableSlots, isFetching } = useGetAllSlotsQuery({
    service: serviceId,
    isBooked: "available",
    limit: 50000,
  });

  const { data: selectedDatesAvailableSlots, isSelectedDatesSlotsFetching } =
    useGetAllSlotsQuery({
      service: serviceId,
      isBooked: "available",
      limit: 50000,
      date: date,
    });

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    selectDate(dateString as string);
  };

  // console.log({ service, availableSlots });

  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (isError) {
    return <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  const slotData: DataType[] = selectedDatesAvailableSlots?.data?.map(
    (item: any, index: any) => ({
      key: index,
      _id: item._id,
      slotInterval: `${moment(item?.date).format("DD MMM YYYY")}, From ${moment(
        item?.startTime,
        "HH:mm"
      ).format("h:mm A")} To ${moment(item?.endTime, "HH:mm").format(
        "h:mm A"
      )}`,
    })
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const items = slotData.filter((item) =>
      newSelectedRowKeys.includes(item.key)
    );
    setSelectedItems(items);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio",
    selections: [Table.SELECTION_NONE],
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Time Interval",
      dataIndex: "slotInterval",
    },
  ];

  // console.log({ selectedItems });
  // console.log({ date });
  console.log({ selectedDatesAvailableSlots });

  const { name, price, description, duration, image } = service.data;

  return (
    <>
      <dialog id={`modal_${serviceId}`} className="modal">
        <div className="modal-box bg-teal-950">
          <BookService />
        </div>
      </dialog>
      <div className="flex bg-teal-950 text-white px-6 py-6 rounded-xl shadow-xl sm:flex-row flex-col gap-6">
        <div className="sm:w-1/2 border-red-700 my-auto">
          <img
            className="sm:h-64 sm:w-full md:h-4/5 md:m-auto lg:w-full lg:h-full"
            src={image}
            alt=""
          />
        </div>

        <div className="space-y-3 my-auto sm:w-1/2">
          <h2 className="text-orange-600 font-semibold text-lg text-start">
            $ {price}
          </h2>
          <h2 className="text-2xl font-semibold text-start">{name}</h2>

          <h2 className="font-semibold text-lg text-start">
            Duration : <span className="text-blue-500">{duration} Minutes</span>
          </h2>
          <p className="text-lg font-semibold">
            Description : <span className="italic">{description}</span>
          </p>

          <h2 className="flex items-center gap-1 text-sm">
            {availableSlots?.data?.length > 0 ? (
              <>
                <FaCheckCircle className="text-green-500" />
                <p className="">
                  {availableSlots?.data?.length} slots available
                </p>
              </>
            ) : (
              <>
                <RxCrossCircled className="text-red-500" />
                <p className="">
                  No slot is available at this moment for this service
                </p>
              </>
            )}
          </h2>

          <div className="pt-2">
            <div className="flex w-full justify-between">
              <h2 className="text-xl text-white font-semibold text-start mb-4">
                Available Slots{" "}
                {moment().format("MMM DD YYYY") ===
                moment(date).format("MMM DD YYYY") ? (
                  <span>Today</span>
                ) : (
                  <span>
                    On{" "}
                    <span className="text-blue-500">
                      {" "}
                      {moment(date).format("MMM DD YYYY")}
                    </span>
                  </span>
                )}
              </h2>
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </div>
            <div>
              {selectedDatesAvailableSlots?.data?.length === 0 ? (
                <div className="bg-white  text-black text-center py-6 font-semibold text-lg rounded-md">
                  <p>
                    No Slots available on {moment(date).format("MMM DD YYYY")}
                  </p>
                </div>
              ) : (
                <Table
                  showHeader={false}
                  pagination={false}
                  className=" "
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={slotData}
                  loading={isFetching || isSelectedDatesSlotsFetching}
                />
              )}

              <Button
                onClick={() =>
                  navigate(`/book-service/${selectedItems[0]._id}`)
                }
                className={`bg-rose-600 text-white hover:text-white max-w-48 mt-4 border-rose-700 hover:bg-rose-700 h-9 ${
                  selectedItems?.length === 0 && "hidden"
                }`}
              >
                Book This Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
