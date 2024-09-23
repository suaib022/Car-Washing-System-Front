import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import AddService from "../../components/admin/AddService";
import { useState } from "react";
import {
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
} from "../../redux/features/slots/slotApi";
import toast from "react-hot-toast";
import AddSlot from "../../components/admin/AddSlot";

const slotStatusOptions = [
  { label: "Available", value: "available" },
  { label: "Canceled", value: "canceled" },
];

const ServiceManagement = () => {
  const [status, setStatus] = useState("");
  const [hideButton, setHideButton] = useState(true);

  const { data: allSlots, isFetching } = useGetAllSlotsQuery(undefined);
  const [updateSlotStatus] = useUpdateSlotMutation();

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
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="btn w-1/5 bg-teal-900 hover:bg-teal-950 text-white mb-2"
        >
          Create New Slot
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-teal-950">
            <AddSlot />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-red-700 hover:bg-red-800 text-white">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-teal-950 text-center text-white">
              <th>SL</th>
              <th>Service Name</th>
              <th>Duration (Minute)</th>
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
                <th>{index + 1}</th>
                <td>{slot?.service?.name}</td>
                <td>{slot?.service?.duration}</td>
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
      </div>
    </div>
  );
};

export default ServiceManagement;
