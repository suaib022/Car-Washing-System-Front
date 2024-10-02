import { LoadingOutlined } from "@ant-design/icons";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { Flex, Pagination, PaginationProps, Spin } from "antd";
import { useEffect, useState } from "react";
import ViewUsersBookings from "../../components/modal/admin/ViewUsersBookings";
import toast from "react-hot-toast";

const userRoleOptions = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

const UserManagement = () => {
  const [UserRole, setUserRole] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfUsers, setNumberOfUsers] = useState(500);
  const [hideButton, setHideButton] = useState(true);

  const [updateUser] = useUpdateUserMutation();

  const { data: allUsers, isFetching } = useGetAllUsersQuery({
    page: page,
    limit: limit,
  });
  const {
    data: allUsersWithoutLimit,
    isFetching: isAllUsersWithoutLimitFetching,
  } = useGetAllUsersQuery({ limit: 50000 });

  // handle numberOfProducts state for pagination
  useEffect(() => {
    if (allUsersWithoutLimit?.data) {
      setNumberOfUsers(allUsersWithoutLimit.data.length);
    }
  }, [allUsersWithoutLimit]);

  // handle page and limit for pagination
  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const onShowSizeChange = (_current: number, size: number) => {
    setLimit(size);
    setPage(1);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserRole(e.target.value);
    setHideButton(false);
  };

  const handleChangeUserRole = (userId) => {
    try {
      const updatedData = { role: UserRole };
      updateUser({ userId, updatedData });

      toast.success("Slots status updated successfully!", { duration: 2200 });

      setHideButton(true);
    } catch (error) {
      console.error("Error updating slot status:", error);
    }
  };

  if (isFetching || isAllUsersWithoutLimitFetching) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  console.log({ allUsers });
  console.log({ allUsersWithoutLimit });
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-teal-950 text-white">
              <th>SL</th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.data?.map((user, index) => (
              <tr
                key={user?._id}
                className="hover:bg-teal-950 hover:text-white"
              >
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.phone}</td>

                <td className=" hover:cursor-pointer font-semibold">
                  <dialog id={`${user?._id}`} className="modal">
                    <div className="modal-box bg-teal-950 text-white">
                      <h2 className="text-start mb-4"> Change User Role : </h2>
                      <select
                        onChange={handleChange}
                        defaultValue={user?.role}
                        className="select select-ghost w-full max-w-xs"
                      >
                        {userRoleOptions.map((option) => (
                          <option value={option.value} key={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-6 items-center border-0">
                            <button
                              onClick={() => handleChangeUserRole(user?._id)}
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

                  <div
                    onClick={() => {
                      document.getElementById(`${user?._id}`).showModal();
                    }}
                  >
                    {user?.role === "user" ? (
                      <div className="badge badge-accent font-bold text-xs py-3 text-white uppercase">
                        {user.role}
                      </div>
                    ) : (
                      <div className="badge badge-error font-bold text-xs uppercase text-white py-3">
                        {user.role}
                      </div>
                    )}
                  </div>
                </td>
                {user?.role === "user" && (
                  <td
                    onClick={() =>
                      document.getElementById(`${user.email}`).showModal()
                    }
                    className="underline hover:cursor-pointer font-semibold"
                  >
                    <dialog id={`${user?.email}`} className="modal">
                      <div className="modal-box">
                        <ViewUsersBookings userId={user?._id} />
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm text-white">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    View Bookings
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6  shadow-xl rounded-md px-4 py-4">
          <Pagination
            showQuickJumper
            current={page}
            pageSize={limit}
            total={numberOfUsers}
            onChange={onChange}
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
