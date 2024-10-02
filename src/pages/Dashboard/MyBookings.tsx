import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  useGetUsersAllBookingsQuery,
  usePayBookingMutation,
} from "../../redux/features/booking/bookingApi";
import CountdownTimer from "../../utils/CountDownTimer";
import toast from "react-hot-toast";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import GetBookingStatus from "../../utils/GetBookingStatus";

const MyBookings = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfSlots, setNumberOfSlots] = useState(500);
  const [shouldShowPayButton, setShouldShowPayButton] = useState<
    Record<string, boolean>
  >({});

  const [payBooking] = usePayBookingMutation();

  const { data: allBookings, isFetching } = useGetUsersAllBookingsQuery({
    page,
    limit,
  });
  const { data: allBookingsWithoutLimit } = useGetUsersAllBookingsQuery({
    limit: 50000,
  });

  // handle numberOfProducts state for pagination
  useEffect(() => {
    if (allBookingsWithoutLimit?.data) {
      setNumberOfSlots(allBookingsWithoutLimit.data.length);
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

  const handlePayment = async (slotId: string) => {
    const toastId = toast.loading("Redirecting to payment page");
    try {
      const res = await payBooking(slotId);

      const paymentWindow = window.open(res.data.data.payment_url, "_blank");

      if (paymentWindow) {
        toast.dismiss(toastId);
      } else {
        toast.error("Failed to open the payment page.");
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId, duration: 2200 });
    }
  };

  // Helper function to check if the current time exceeds 1 hour before the start time
  const checkNeedToPay = (slotStartTime: string, currentDue: string) => {
    if (currentDue === "paid") return false;
    const startTime = moment(slotStartTime, "HH:mm");
    const currentTime = moment();
    const oneHourBeforeStartTime = startTime.subtract(1, "hours");
    return currentTime.isBefore(oneHourBeforeStartTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedVisibility: Record<string, boolean> = {}; // Explicitly typing the object
      allBookings?.data?.forEach((booking) => {
        updatedVisibility[booking._id] = checkNeedToPay(
          booking.slot.startTime,
          booking.due
        );
      });
      setShouldShowPayButton(updatedVisibility);
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [allBookings]);

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

  // console.log({ allBookingsWithoutLimit });
  console.log({ shouldShowPayButton });
  return (
    <div>
      <div className="overflow-x-auto">
        <Alert
          style={{ marginBottom: "10px" }}
          banner
          message={
            <Marquee pauseOnHover gradient={false}>
              If you don't pay your due at least 1 hour before the starting
              time, your booking will be canceled
            </Marquee>
          }
        />
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
              <th>Due</th>
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
                      onClick={() => {
                        document.getElementById(`${booking._id}`).showModal();
                      }}
                    >
                      View Details
                    </div>
                  </div>
                </td>
                <td className={`font-semibold uppercase  `}>
                  <div className="flex flex-col gap-2">
                    <h2
                      className={`uppercase ${
                        booking?.due === "paid" && "text-orange-600"
                      } `}
                    >
                      {booking?.due}
                    </h2>

                    {/* Conditionally render the Pay button */}
                    <button
                      onClick={() => handlePayment(booking?.slot?._id)}
                      className={`${
                        (!shouldShowPayButton[booking._id] ||
                          booking?.due === "paid") &&
                        "hidden"
                      } btn btn-xs w-12 bg-rose-500 text-white border-0`}
                    >
                      Pay
                    </button>
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
            total={numberOfSlots}
            onChange={onChange}
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
