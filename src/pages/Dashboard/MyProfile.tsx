import EditProfile from "../../components/modal/user/EditProfile";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import { getCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { FaUserEdit } from "react-icons/fa";

const MyProfile = () => {
  const { userEmail } = useAppSelector(getCurrentUser);

  const { data: user } = useGetSingleUserQuery(userEmail, { skip: !userEmail });

  return (
    <div className="bg-teal-950 w-3/4 mx-auto rounded-2xl py-8">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-teal-950">
          <EditProfile userId={user?.data?._id} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-700 hover:bg-red-800 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className=" flex flex-col justify-center  space-y-2 items-center min-h-[40vh]">
        <div className="text-white items-center w-full flex sm:justify-between justify-end sm:-mt-20 -mt-16 px-12">
          <h2 className="text-3xl hidden sm:block font-semibold">My Profile</h2>
          <h2>
            <FaUserEdit
              onClick={() => {
                document.getElementById(`my_modal_1`).showModal();
              }}
              className="text-2xl hover:cursor-pointer"
            />
          </h2>
        </div>
        <div className="divider"></div>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user?.data?.image} />
          </div>
        </div>
        <div className="badge badge-error text-teal-950 uppercase font-bold">
          {user?.data?.role}
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-white font-semibold text-xl">
            {user?.data?.name}
          </h2>
          <h2 className="text-white font-semibold text-md">
            Email : {user?.data?.email}
          </h2>
          <h2 className="text-white font-semibold text-md">
            Contact No : {user?.data?.phone}
          </h2>
          <p className="text-white">Address : {user?.data?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

// name: string;
// email: string;
// password: string;
// phone: string;
// role: TUserRole;
// address: string;
