import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import moment from "moment";

const ViewUsersBookings = ({ userId }: any) => {
  const { data: usersBookings } = useGetAllBookingsQuery({ customer: userId });

  return (
    <div>
      <div className="overflow-x-auto">
        {usersBookings?.data?.length > 0 ? (
          <table className="table text-white">
            <thead>
              <tr className="text-white text-center bg-teal-700">
                <th>SL</th>
                <th>Service Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody className="text-white text-center">
              {usersBookings?.data?.map((booking: any, index: any) => (
                <tr key={booking?._id}>
                  <th>{index + 1}</th>
                  <td>{booking?.service?.name}</td>
                  <td className="font-semibold">
                    {moment(booking?.slot?.date).format("DD MMM YYYY")}
                  </td>
                  <td className="font-semibold">{booking?.slot?.startTime}</td>
                  <td className="font-semibold">{booking?.slot?.endTime}</td>
                  <td className="font-semibold">
                    {booking?.service?.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <h2 className="text-white text-center font-semibold my-8 mb-0 text-lg">
              This user has not booked anything yet
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewUsersBookings;
