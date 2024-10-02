import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
} from "../../redux/features/slots/slotApi";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useGetAllBookingsQuery } from "../../redux/features/booking/bookingApi";
import CountdownTimer from "../../utils/CountDownTimer";
import GetBookingStatus from "../../utils/GetBookingStatus";

const slotStatusOptions = [
  { label: "Available", value: "available" },
  { label: "Canceled", value: "canceled" },
];

const BookingManagement = () => {
  const [status, setStatus] = useState("");
  const [hideButton, setHideButton] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfBookings, setNumberOfBookings] = useState(500);

  const [updateSlotStatus] = useUpdateSlotMutation();

  const { data: allBookings, isFetching } = useGetAllBookingsQuery({
    page,
    limit,
  });
  const { data: allBookingsWithoutLimit } = useGetAllBookingsQuery({
    limit: 50000,
  });

  // handle numberOfProducts state for pagination
  useEffect(() => {
    if (allBookingsWithoutLimit?.data) {
      setNumberOfBookings(allBookingsWithoutLimit.data.length);
    }
  }, [allBookingsWithoutLimit]);

  const handleChange = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    setHideButton(false);
  };

  const handleChangeSlotStatus = (slotId) => {
    try {
      console.log({ status });
      const updatedData = { isBooked: status };
      updateSlotStatus({ slotId, updatedData });

      toast.success("Slots status updated successfully!", { duration: 2200 });

      setHideButton(true);
    } catch (error) {
      console.error("Error updating slot status:", error);
    }
  };

  // handle page and limit for pagination
  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const onShowSizeChange = (_current: number, size: number) => {
    setLimit(size);
    setPage(1);
  };

  // console.log({ allSlots });
  // console.log({ serviceId });
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

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-teal-950 text-center text-white">
              <th>SL</th>
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
            {allBookings?.data?.map((booking, index) => (
              <tr
                key={booking?._id}
                className="hover:bg-teal-950 text-center hover:text-white"
              >
                <th>{index + 1 + (page - 1) * limit}</th>
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
                    <div className="modal-box bg-teal-950 text-white">
                      <h2 className="text-start mb-4">
                        {" "}
                        Change Booking Status :{" "}
                      </h2>
                      <select
                        onChange={handleChange}
                        defaultValue={booking?.isBooked}
                        className="select select-ghost w-full max-w-xs"
                      >
                        {slotStatusOptions.map((option) => (
                          <option value={option.value} key={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-6 items-center border-0">
                            <button
                              onClick={() =>
                                handleChangeSlotStatus(booking?._id)
                              }
                              className={`btn btn-sm rounded-md bg-blue-600 border-0 btn-error text-white hover:bg-blue-600 ${
                                hideButton && "hidden"
                              }`}
                            >
                              Change
                            </button>
                            <button
                              onClick={() => setHideButton(true)}
                              className="btn btn-sm rounded-md bg-red-700 border-0 btn-error text-white"
                            >
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
                      onClick={() => {
                        document.getElementById(`${booking._id}`).showModal();
                      }}
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
