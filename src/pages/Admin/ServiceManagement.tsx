import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import { Flex, Spin } from "antd";
import AddService from "../../components/admin/AddService";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateService from "../../components/admin/UpdateService";
import { useState } from "react";

const ServiceManagement = () => {
  const [serviceId, setServiceId] = useState("");

  const { data: allServices, isFetching } = useGetAllServicesQuery(undefined);

  const handleDeleteService = () => {
    console.log("object");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleChange = (id: string) => {
    setServiceId(id);
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
  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="btn w-1/5 bg-teal-900 hover:bg-teal-950 text-white mb-2"
        >
          Add Service
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-teal-950">
            <AddService />
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
            <tr className="bg-teal-950 text-white">
              <th>SL</th>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allServices?.data?.map((user, index) => (
              <tr
                key={user?._id}
                className="hover:bg-teal-950 hover:text-white"
              >
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.price}</td>
                <td>{user.duration}</td>
                <td className="underline hover:cursor-pointer font-semibold">
                  <dialog id={`${user?._id}`} className="modal">
                    <div className="modal-box">
                      <UpdateService serviceId={serviceId} />
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <div className="flex justify-evenly items-center">
                    <span
                      onClick={() => {
                        document.getElementById(`${user._id}`).showModal();
                        handleChange(user._id);
                      }}
                    >
                      <FiEdit className="text-lg" />
                    </span>
                    <span>
                      <FaTrash
                        onClick={handleDeleteService}
                        className="text-red-600 text-lg"
                      />
                    </span>
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
