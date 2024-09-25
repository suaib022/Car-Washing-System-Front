import { Button, Row } from "antd";
import UseForm from "../../components/form/Form";
import FormInput from "../../components/form/Input";
import loginImg from "../../assets/images/form/login.png";
import { FieldValues } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    email: "3web@programming-hero.com",
    password: "u3",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging In...");
    try {
      const { email, password } = data;
      const userInfo = {
        email,
        password,
      };

      const res = await login(userInfo).unwrap();
      console.log({ res });

      const { message, token } = res;
      const accessToken = token;
      const user = verifyToken(accessToken) as TUser;

      dispatch(setUser({ user, token }));
      navigate("/");
      toast.success(message, { id: toastId, duration: 2500 });
    } catch (error) {
      toast.error(error.data.message, { id: toastId, duration: 2500 });
    }
  };
  return (
    <div className="md:flex">
      <img className="hidden md:block md:w-1/2" src={loginImg} alt="" />
      <div className="md:w-1/2 flex flex-col shadow-xl py-16 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 underline text-orange-700">
          Login Now{" "}
        </h2>
        <Row className="h-4/5 " justify="center" align="middle" style={{}}>
          <div className=" w-3/5">
            <UseForm onSubmit={onSubmit} defaultValues={defaultValues}>
              <div className="space-y-2  flex flex-col font-semibold">
                <FormInput
                  required={true}
                  type="email"
                  name="email"
                  label="Email :"
                ></FormInput>
                <FormInput
                  required={true}
                  type="password"
                  name="password"
                  label="Password :"
                ></FormInput>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "0",
                    font: "inherit",
                    width: "100%",
                    marginTop: "40px",
                  }}
                  htmlType="submit"
                  className=""
                >
                  login
                </Button>
              </div>
            </UseForm>
          </div>
        </Row>

        <div className=" w-3/5 mx-auto flex justify-between items-center">
          <h2 className="">Don't Have An Account?</h2>
          <h2 className="underline">
            <NavLink to={"/signUp"}>Register</NavLink>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
