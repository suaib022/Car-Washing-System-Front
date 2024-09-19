import { Button, Row } from "antd";
import UseForm from "../../components/form/Form";
import FormInput from "../../components/form/Input";
import loginImg from "../../assets/images/form/login.png";
import { FieldValues } from "react-hook-form";
import { NavLink } from "react-router-dom";

const Login = () => {
  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;

    console.log({ email, password });
  };
  return (
    <div className="md:flex">
      <img className="hidden md:block md:w-1/2" src={loginImg} alt="" />
      <div className="md:w-1/2 shadow-xl py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline text-orange-700">
          Login Now{" "}
        </h2>
        <Row
          className="flex flex-col h-4/5"
          justify="center"
          align="middle"
          style={{}}
        >
          <UseForm onSubmit={onSubmit}>
            <div className="space-y-8  flex flex-col font-semibold">
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
                }}
                htmlType="submit"
                className=""
              >
                login
              </Button>
            </div>
          </UseForm>

          <div className="mt-4 flex justify-evenly items-center w-1/2">
            <h2>Don't Have An Account?</h2>
            <h2 className="underline">
              <NavLink to={"/signUp"}>Register</NavLink>
            </h2>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Login;
