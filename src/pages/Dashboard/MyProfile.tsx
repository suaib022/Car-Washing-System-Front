import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import { getCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const MyProfile = () => {
  const { userEmail } = useAppSelector(getCurrentUser);
  const { data: user } = useGetSingleUserQuery(userEmail, { skip: !userEmail });

  return (
    <div className="bg-teal-950 w-3/4 mx-auto rounded-2xl py-8">
      <div className=" flex flex-col justify-center space-y-2 items-center min-h-[40vh]">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="badge badge-error gap-2">Admin</div>
        <div className="text-center">
          <h2 className="text-white font-semibold text-xl">
            {user?.data?.name}
          </h2>
          <h2 className="text-white font-semibold text-md">
            Email : {user?.data?.email}
          </h2>
          <h2 className="text-white font-semibold text-md">
            Contact No :{user?.data?.phone}
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
