import moment from "moment";

const OrderSummary = ({ selectedSlot }: any) => {
  return (
    <div className="w-full md:w-1/2 border rounded-md py-8">
      <img
        src={selectedSlot?.data?.service?.image}
        alt=""
        className="w-1/2 mx-auto max-h-[400px]"
      />
      <h2 className="text-blue-500 font-semibold text-2xl mt-4 flex w-3/4 mx-auto">
        {selectedSlot?.data?.service?.name}
      </h2>
      <h2 className="text-gray-400 font-semibold text-lg mt-2 flex w-3/4 mx-auto">
        Time Interval :{" "}
        <span className="text-rose-500">
          {" "}
          {moment(selectedSlot?.data?.date).format("DD MMM YYYY")}, From{" "}
          {moment(selectedSlot?.data?.startTime, "HH:mm").format("h:mm A")} To{" "}
          {moment(selectedSlot?.data?.endTime, "HH:mm").format("h:mm A")}
        </span>
      </h2>
    </div>
  );
};

export default OrderSummary;
