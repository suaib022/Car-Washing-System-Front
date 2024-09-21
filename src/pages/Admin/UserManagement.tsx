import { LoadingOutlined } from "@ant-design/icons";
import { useGetAllUsersQuery } from "../../redux/features/auth/authApi";
import { Flex, Spin } from "antd";

const UserManagement = () => {
  const { data: allUsers, isFetching } = useGetAllUsersQuery(undefined);

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

  console.log({ allUsers });
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
                <td>
                  {user?.role === "user" ? (
                    <div className="badge badge-accent font-bold text-xs py-3 uppercase">
                      {user.role}
                    </div>
                  ) : (
                    <div className="badge badge-error font-bold text-xs uppercase py-3">
                      {user.role}
                    </div>
                  )}
                </td>
                <td
                  onClick={() =>
                    document.getElementById(`${user._id}`).showModal()
                  }
                  className="underline hover:cursor-pointer font-semibold"
                >
                  <dialog id={`${user?._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click the button below to close
                      </p>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  View Bookings
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
