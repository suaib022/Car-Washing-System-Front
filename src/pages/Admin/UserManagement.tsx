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
                    <div className="badge badge-accent font-semibold py-3">
                      {user.role}
                    </div>
                  ) : (
                    <div className="badge badge-error font-semibold py-3">
                      {user.role}
                    </div>
                  )}
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
