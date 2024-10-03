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
import { RiTimerLine } from "react-icons/ri";
import { TBooking } from "../../types/booking";
import { handleOpenDialog } from "../../utils/Modal";
import img from "../../assets/images/Result/no-data-found.jpg";

const MyBookings = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfSlots, setNumberOfSlots] = useState(500);
  const [shouldShowPayButton, setShouldShowPayButton] = useState<
    Record<string, boolean>
  >({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [nearestBooking, setNearestBooking] = useState<any>(null);

  const [payBooking] = usePayBookingMutation();

  const { data: allBookings, isFetching } = useGetUsersAllBookingsQuery({
    page,
    limit,
  });
  const { data: allBookingsWithoutLimit } = useGetUsersAllBookingsQuery({
    limit: 50000,
  });

  // Handle numberOfBookings state for pagination
  useEffect(() => {
    if (allBookingsWithoutLimit?.data) {
      setNumberOfSlots(allBookingsWithoutLimit.data.length);
    }
  }, [allBookingsWithoutLimit]);

  useEffect(() => {
    const now = moment();
    const filtered =
      allBookingsWithoutLimit?.data.filter((booking: TBooking) => {
        const bookingEndTime = moment(
          `${booking.slot.date} ${booking.slot.endTime}`,
          "YYYY-MM-DD HH:mm"
        );
        return bookingEndTime.isAfter(now);
      }) || [];
    setFilteredBookings(filtered);
  }, [allBookingsWithoutLimit]);

  // Find the nearest booking based on the start time
  useEffect(() => {
    if (filteredBookings.length > 0) {
      const now = moment();
      const nearest = filteredBookings.reduce(
        (closest, booking: any) => {
          const bookingStartTime = moment(
            `${booking.slot.date} ${booking.slot.startTime}`,
            "YYYY-MM-DD HH:mm"
          );
          const timeDifference = bookingStartTime.diff(now);

          if (timeDifference > 0 && timeDifference < closest.timeDifference) {
            return { booking, timeDifference };
          }
          return closest;
        },
        { booking: null, timeDifference: Infinity }
      );

      setNearestBooking(nearest.booking);
    }
  }, [filteredBookings]);

  // Handle page and limit for pagination
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

  const checkNeedToPay = (
    slotStartTime: string,
    slotDate: string,
    currentDue: string | number
  ) => {
    if (currentDue === "paid") return false;

    // Combine the date and time to create a full datetime string
    const fullDateTime = `${moment(slotDate).format(
      "YYYY-MM-DD"
    )} ${slotStartTime}`;

    // Parse the full date and time
    const startTime = moment(fullDateTime, "YYYY-MM-DD HH:mm");
    const currentTime = moment();

    // Calculate one hour before the start time
    const oneHourBeforeStartTime = startTime.clone().subtract(1, "hours");

    // Check if current time is before one hour before the start time
    return currentTime.isBefore(oneHourBeforeStartTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedVisibility: Record<string, boolean> = {};

      filteredBookings.forEach((booking: any) => {
        updatedVisibility[booking._id] = checkNeedToPay(
          booking.slot.startTime,
          booking.slot.date,
          booking.due
        );
      });

      setShouldShowPayButton(updatedVisibility);
    }, 1000);

    return () => clearInterval(interval);
  }, [filteredBookings]);

  console.log({ nearestBooking });
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
        {nearestBooking && (
          <>
            <h2 className="text-lg text-center py-2 text-md font-semibold">
              You nearest booked slot will start in{" "}
              <CountdownTimer
                date={nearestBooking?.slot?.date}
                time={nearestBooking?.slot?.startTime}
                duration={nearestBooking?.service?.duration}
              />
            </h2>
          </>
        )}
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
        <h2 className="text-black text-3xl font-semibold text-center mb-5 mt-4">
          Upcoming Bookings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-6">
          {filteredBookings?.map((booking: TBooking) => (
            <div
              key={booking?._id}
              className="card card-side bg-white rounded-md shadow-xl"
            >
              <figure className="w-1/3">
                <img
                  style={{ width: "90%" }}
                  className=" border-2 my-2 mx-2 rounded-full"
                  src={booking?.service?.image}
                  alt="Movie"
                />
              </figure>
              <div className="card-body w-2/3">
                <div className="text-blue-600 mb-2 flex items-center justify-between font-semibold">
                  <RiTimerLine className="text-2xl" />
                  <p className="ml-1 text-lg text-black">
                    {booking?.service?.duration} Min
                  </p>
                </div>
                <div className="card-actions justify-start">
                  <h2 className="text-lg font-bold text-rose-500">
                    Starts In :{" "}
                  </h2>
                  <CountdownTimer
                    date={booking?.slot?.date}
                    time={booking?.slot?.startTime}
                    duration={booking?.service?.duration}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

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
            {allBookings?.data?.map((booking: any, index: any) => (
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
                      onClick={() => handleOpenDialog(`${booking?._id}`)}
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
