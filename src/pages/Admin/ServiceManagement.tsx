import { LoadingOutlined } from "@ant-design/icons";
import {
  useGetAllServicesQuery,
  useSoftDeleteServiceMutation,
} from "../../redux/features/service/serviceApi";
import { Flex, Pagination, PaginationProps, Spin } from "antd";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import AddService from "../../components/modal/admin/AddService";
import UpdateService from "../../components/modal/admin/UpdateService";
import { handleOpenDialog } from "../../utils/Modal";
import img from "../../assets/images/Result/no-data-found.jpg";
import { useNavigate } from "react-router-dom";

const ServiceManagement = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfServices, setNumberOfServices] = useState(500);

  const navigate = useNavigate();

  const { data: allServices, isFetching } = useGetAllServicesQuery({
    isDeleted: "false",
    page: page,
    limit: limit,
    sort: "-createdAt",
  });
  const { data: allServicesWithoutLimit } = useGetAllServicesQuery({
    isDeleted: "false",
    limit: 50000,
  });
  const [moveToBin] = useSoftDeleteServiceMutation();

  // handle numberOfServices state for pagination
  useEffect(() => {
    if (allServicesWithoutLimit?.data) {
      setNumberOfServices(allServicesWithoutLimit.data.length);
    }
  }, [allServicesWithoutLimit]);

  const handleDeleteService = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, move to trash!",
    }).then((result) => {
      if (result.isConfirmed) {
        moveToBin(id).then(() => {
          toast.success("Item moved to trash", { duration: 2000 });
        });
      }
    });
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
          onClick={() => handleOpenDialog("add-service")}
          className="btn w-1/5 border-0 bg-teal-950 text-white mb-2"
        >
          Add Service
        </button>
        <dialog id="add-service" className="modal">
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
      {allServicesWithoutLimit?.data?.length != 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
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
                  <th>{index + 1 + (page - 1) * limit}</th>
                  <td onClick={() => navigate(`/services/${service?._id}`)}>
                    <img
                      className="w-12 h-12 cursor-pointer rounded-full"
                      src={service?.image}
                      alt=""
                    />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>{service.duration}</td>
                  <td className="underline hover:cursor-pointer font-semibold">
                    <dialog id={`${service?._id}`} className="modal">
                      <div className="modal-box">
                        <UpdateService serviceId={service._id} />
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <div className="flex justify-evenly items-center">
                      <span onClick={() => handleOpenDialog(service._id)}>
                        <FiEdit className="text-lg text-teal-700" />
                      </span>

                      <span>
                        <FaRegTrashAlt
                          onClick={() => handleDeleteService(service._id)}
                          className="text-red-600 text-lg"
                        />
                      </span>
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
              total={numberOfServices}
              onChange={onChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </div>
      ) : (
        <img src={img} />
      )}
    </div>
  );
};

export default ServiceManagement;
