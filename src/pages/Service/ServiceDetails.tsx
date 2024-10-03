/* eslint-disable react-hooks/rules-of-hooks */
import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import errorImg from "../../assets/images/Result/error-404.png";
import { Flex, Pagination, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetSingleServiceQuery } from "../../redux/features/service/serviceApi";
import { Button } from "../../components/ui/button";
import { useGetAllSlotsQuery } from "../../redux/features/slots/slotApi";
import BookService from "../../components/modal/user/BookService";
import { useEffect, useState } from "react";
import type {
  DatePickerProps,
  PaginationProps,
  TableColumnsType,
  TableProps,
} from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentToken } from "../../redux/features/auth/authSlice";
import { TUser, verifyToken } from "../../utils/verifyToken";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [numberOfProducts, setNumberOfProducts] = useState(500);

  const navigate = useNavigate();

  if (serviceId === undefined) {
    return <div>Error: ID is missing</div>;
  }

  let user: TUser = null;
  const token = useAppSelector(getCurrentToken);
  if (token) {
    user = verifyToken(token as any) as TUser;
  }
  const { data: currentUser } = useGetSingleUserQuery(user?.userEmail);

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

  const {
    data: selectedDatesAvailableSlotsWithoutLimit,
    isFetching: isSelectedDatesAvailableSlotsFetching,
  } = useGetAllSlotsQuery({
    service: serviceId,
    isBooked: "available",
    limit: 50000,
  });

  const {
    data: selectedDatesAvailableSlots,
    isFetching: isSelectedDatesSlotsFetching,
  } = useGetAllSlotsQuery({
    service: serviceId,
    isBooked: "available",
    limit: limit,
    date: date,
    page: page,
  });

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    selectDate(dateString as string);
  };

  const disablePastDates: DatePickerProps["disabledDate"] = (current) => {
    return current && current.isBefore(dayjs().startOf("day"));
  };

  // console.log({ service, availableSlots });

  // handle numberOfProducts state for pagination
  useEffect(() => {
    if (selectedDatesAvailableSlotsWithoutLimit?.data) {
      setNumberOfProducts(selectedDatesAvailableSlotsWithoutLimit.data.length);
    }
  }, [selectedDatesAvailableSlotsWithoutLimit]);

  // handle page and limit for pagination
  const onChangePagination: PaginationProps["onChange"] = (
    pageNumber,
    pageSize
  ) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const onShowSizeChange = (_current: number, size: number) => {
    setLimit(size);
    setPage(1);
  };

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
          <h2 className="text-4xl font-semibold text-start">{name}</h2>
          <h2 className="font-semibold text-lg  text-start">
            Duration : <span className="text-blue-400">{duration} Minutes</span>
          </h2>
          <h2 className="font-semibold text-lg  text-start">
            Price : <span className="text-orange-500"> {price} BDT</span>
          </h2>
          <p className="text-lg font-semibold ">
            Description :{" "}
            <span className="italic text-gray-400">{description}</span>
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

          {currentUser && currentUser?.data?.role === "user" && (
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
                  <DatePicker
                    onChange={onChange}
                    disabledDate={disablePastDates}
                  />
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
                    loading={
                      isFetching ||
                      isSelectedDatesSlotsFetching ||
                      isSelectedDatesAvailableSlotsFetching
                    }
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

                <div className="mt-6 bg-teal-950 shadow-xl rounded-md pb-4 pt-4 ">
                  <Pagination
                    style={{ color: "white" }}
                    showQuickJumper
                    current={page}
                    pageSize={limit}
                    total={numberOfProducts}
                    onChange={onChangePagination}
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
