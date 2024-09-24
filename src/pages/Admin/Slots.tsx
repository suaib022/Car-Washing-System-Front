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

const slotStatusOptions = [
  { label: "Available", value: "available" },
  { label: "Canceled", value: "canceled" },
];

const Slots = () => {
  const [status, setStatus] = useState("");
  const [hideButton, setHideButton] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfSlots, setNumberOfSlots] = useState(500);

  const navigate = useNavigate();

  const { data: allSlots, isFetching } = useGetAllSlotsQuery({ page, limit });
  const { data: allSlotsWithoutLimit } = useGetAllSlotsQuery({ limit: 50000 });

  const [updateSlotStatus] = useUpdateSlotMutation();

  // handle numberOfProducts state for pagination
  useEffect(() => {
    if (allSlotsWithoutLimit?.data) {
      setNumberOfSlots(allSlotsWithoutLimit.data.length);
    }
  }, [allSlotsWithoutLimit]);

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
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/dashboard/slotManagement/addSlot")}
          className="btn w-1/5 bg-teal-900 hover:bg-teal-950 text-white mb-2"
        >
          Create New Slot
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-teal-950 text-center text-white">
              <th>SL</th>
              <th>Service Name</th>
              <th>Duration (Minute)</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allSlots?.data?.map((slot, index) => (
              <tr
                key={slot?._id}
                className="hover:bg-teal-950 text-center hover:text-white"
              >
                <th>{index + 1 + (page - 1) * limit}</th>
                <td>{slot?.service?.name}</td>
                <td>{slot?.service?.duration}</td>
                <td>{moment(slot?.date).format("DD MMM YYYY")}</td>
                <td>{slot.startTime}</td>
                <td>{slot.endTime}</td>
                <td className=" hover:cursor-pointer font-semibold">
                  <dialog id={`${slot?._id}`} className="modal">
                    <div className="modal-box bg-teal-950 text-white">
                      <h2 className="text-start mb-4">
                        {" "}
                        Change Booking Status :{" "}
                      </h2>
                      <select
                        onChange={handleChange}
                        defaultValue={slot?.isBooked}
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
                              onClick={() => handleChangeSlotStatus(slot?._id)}
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
                      onClick={() => {
                        document.getElementById(`${slot._id}`).showModal();
                      }}
                      className={`uppercase ${
                        slot.isBooked === "canceled" && ""
                      }  ${slot.isBooked === "booked" && "btn-disabled"} ${
                        slot.isBooked === "available" && ""
                      } text-white border-0 btn btn-xs rounded-2xl w-20 px-2`}
                      style={
                        slot.isBooked === "booked"
                          ? { color: "white", backgroundColor: "#fda4af" }
                          : slot.isBooked === "canceled"
                          ? { color: "", backgroundColor: "#db2777" }
                          : slot.isBooked === "available"
                          ? { color: "", backgroundColor: "#16a34a" }
                          : {}
                      }
                    >
                      {slot?.isBooked}
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

export default Slots;
