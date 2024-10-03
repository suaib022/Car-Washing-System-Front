import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";

import moment from "moment";
import { useGetAllBookingsQuery } from "../../redux/features/booking/bookingApi";
import CountdownTimer from "../../utils/CountDownTimer";
import GetBookingStatus from "../../utils/GetBookingStatus";
import img from "../../assets/images/Result/no-data-found.jpg";

const BookingManagement = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfBookings, setNumberOfBookings] = useState(500);

  const { data: allBookings, isFetching } = useGetAllBookingsQuery({
    page,
    limit,
  });
  const { data: allBookingsWithoutLimit } = useGetAllBookingsQuery({
    limit: 50000,
  });

  // handle numberOfBookings state for pagination
  useEffect(() => {
    if (allBookingsWithoutLimit?.data) {
      setNumberOfBookings(allBookingsWithoutLimit.data.length);
    }
  }, [allBookingsWithoutLimit]);

  // handle page and limit for pagination
  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const onShowSizeChange = (_current: number, size: number) => {
    setLimit(size);
    setPage(1);
  };

  const handleOpenDialog = (id: string) => {
    const dialog = document.getElementById(id) as HTMLDialogElement | null;
    if (dialog) {
      dialog.showModal();
    }
  };

  if (isFetching) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (allBookingsWithoutLimit?.data?.length === 0) {
    return <img src={img} />;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-teal-950 text-center text-white">
              <th>SL</th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration (Minute)</th>
              <th>Time Left</th>
              <th>Status</th>
              <th>Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {allBookings?.data?.map((booking: any, index: any) => (
              <tr
                key={booking?._id}
                className="hover:bg-teal-950 text-center hover:text-white"
              >
                <th>{index + 1 + (page - 1) * limit}</th>
                <th>
                  <img
                    className="w-20 h-12 rounded-full"
                    src={booking?.service?.image}
                    alt=""
                  />
                </th>
                <td className="font-semibold">{booking?.service?.name}</td>
                <td className="font-semibold">
                  {moment(booking?.slot?.date).format("DD MMM YYYY")}
                </td>
                <td className="font-semibold">{booking?.slot?.startTime}</td>
                <td className="font-semibold">{booking?.slot?.endTime}</td>
                <td className="font-semibold">{booking?.service?.duration}</td>
                <td>
                  <CountdownTimer
                    date={booking?.slot?.date}
                    time={booking?.slot?.startTime}
                    duration={booking?.service?.duration}
                  />
                </td>
                <td>
                  {" "}
                  <GetBookingStatus
                    due={booking?.due}
                    date={booking?.slot?.date}
                    time={booking?.slot?.startTime}
                    duration={booking?.service?.duration}
                  />
                </td>
                <td className=" hover:cursor-pointer font-semibold">
                  <dialog id={`${booking?._id}`} className="modal">
                    <div className="modal-box space-y-2 text-start px-8 bg-teal-950 text-white">
                      <h2 className="text-start mb-4 text-2xl underline">
                        Vehicle Details :
                      </h2>
                      <h2 className="ml-10">
                        Type :{" "}
                        <span className="uppercase">
                          {booking?.vehicleType}
                        </span>
                      </h2>
                      <h2 className="ml-10">Brand : {booking?.vehicleBrand}</h2>
                      <h2 className="ml-10">Model : {booking?.vehicleModel}</h2>
                      <h2 className="ml-10">
                        Registration Plate : {booking?.registrationPlate}
                      </h2>
                      <h2 className="ml-10">
                        Manufacturing Year : {booking?.manufacturingYear}
                      </h2>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-6 items-center border-0">
                            <button className="btn btn-sm rounded-md bg-red-700 border-0 btn-error text-white">
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <div className="flex justify-center items-center">
                    <div
                      className="underline font-bold text-sm"
                      onClick={() => handleOpenDialog(booking._id)}
                    >
                      View Details
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6  shadow-xl rounded-md px-4 py-4">
          <Pagination
            showQuickJumper
            current={page}
            pageSize={limit}
            total={numberOfBookings}
            onChange={onChange}
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
