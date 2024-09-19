import { Button, Row } from "antd";
import signUpImg from "../../assets/images/form/signUp.png";
import UseForm from "../../components/form/Form";
import FormInput from "../../components/form/Input";
import { FieldValues } from "react-hook-form";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;

    console.log({ email, password });
  };
  return (
    <div className="md:flex">
      <img className="hidden md:block md:w-1/2" src={signUpImg} alt="" />
      <div className="md:w-1/2 shadow-xl py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline text-orange-700">
          SignUp Now{" "}
        </h2>
        <div className="flex flex-col h-4/5 mx-auto  items-center">
          <UseForm onSubmit={onSubmit}>
            <div className="space-y-8 flex flex-col font-semibold">
              <FormInput
                required={true}
                type="text"
                name="name"
                label="Name :"
              ></FormInput>
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
              <FormInput
                required={true}
                type="number"
                name="phone"
                label="Contact Number :"
              ></FormInput>
              <FormInput
                required={true}
                type="textarea"
                name="address"
                label="Address :"
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
                Sign Up
              </Button>
            </div>
          </UseForm>

          <div className="mt-4 flex justify-evenly  w-3/4 items-center">
            <h2>Already Have An Account?</h2>
            <h2 className="underline hover:text-sky-300">
              <NavLink to={"/login"}>LogIn</NavLink>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
