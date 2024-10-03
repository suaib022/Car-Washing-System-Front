import { LoadingOutlined } from "@ant-design/icons";
import {
  useGetAllServicesQuery,
  usePermanentDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../../redux/features/service/serviceApi";
import { Flex, Row, Spin } from "antd";
import { FaTrashRestore } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import UpdateService from "../../components/modal/admin/UpdateService";

const TrashManagement = () => {
  const { data: allServices, isFetching } = useGetAllServicesQuery({
    isDeleted: "true",
  });

  const [deletePermanently] = usePermanentDeleteServiceMutation();
  const [restoreService] = useUpdateServiceMutation();

  const handleDeleteService = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The item will be removed permanently from your database",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePermanently(id);
        toast.success("Item has been deleted permanently", { duration: 2000 });
      }
    });
  };

  const handleRestoreService = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The item will be restored from bin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = {
          isDeleted: false,
        };
        restoreService({ serviceId: id, updatedData });
        toast.success("Item has been restored successfully", {
          duration: 2000,
        });
      }
    });
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
      {allServices?.data?.length !== 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-teal-950 text-white">
                <th>SL</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allServices?.data?.map((service: any, index: any) => (
                <tr
                  key={service?._id}
                  className="hover:bg-teal-950 hover:text-white"
                >
                  <th>{index + 1}</th>
                  <th>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={service?.image}
                      alt=""
                    />
                  </th>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>{service.duration}</td>
                  <td className="underline hover:cursor-pointer font-semibold">
                    <dialog id={`${service?._id}`} className="modal">
                      <div className="modal-box">
                        <UpdateService serviceId={service?._id} />
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <div className="flex justify-start gap-3 items-center">
                      <MdOutlineDeleteForever
                        onClick={() => {
                          handleDeleteService(service?._id);
                        }}
                        className="underline text-2xl text-red-600 font-bold"
                      />
                      <FaTrashRestore
                        onClick={() => {
                          handleRestoreService(service?._id);
                        }}
                        className="underline text-lg text-blue-600 font-bold"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Row
          className="flex flex-col"
          justify="center"
          align="middle"
          style={{ height: "50vh" }}
        >
          <h2 className="text-center text-6xl font-semibold">Empty Bin</h2>
          <p className="text-center text-2xl mt-4 font-semibold">
            Your bin is empty
          </p>
        </Row>
      )}
    </div>
  );
};

export default TrashManagement;
