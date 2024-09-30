import { Button, Upload, UploadProps } from "antd";
import signUpImg from "../../assets/images/form/signUp.png";
import UseForm from "../../components/form/Form";
import FormInput from "../../components/form/Input";
import { FieldValues } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { image_hosting_api } from "../../Constant/imagebb";
import { UploadOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [disableUploadButton, setDisableUploadButton] = useState(false);
  const [imageRequiredError, setImageRequiredError] = useState(false);
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  useEffect(() => {
    if (!imageUrl) {
      setImageRequiredError(true);
    } else {
      setImageRequiredError(false);
    }
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Signing Up...");
    try {
      const { name, email, password, phone, address } = data;

      const userInfo = {
        name,
        email,
        password,
        phone,
        address,
        role: "user",
        image: imageUrl,
      };

      const res = await signUp(userInfo).unwrap();
      if (res?.error?.status === 400) {
        const match = res.error?.data?.message.match(/index: (.*?) dup key/);
        if (match[1] === "phone_1") {
          toast.error(
            `An account is already created with the number  ${phone}`,
            {
              id: toastId,
              duration: 3500,
            }
          );
        } else if (match[1] === "email_1") {
          toast.error(
            `An account is already created with the email  ${email}`,
            {
              id: toastId,
              duration: 3500,
            }
          );
        }
      }
      toast.success(res.message, { duration: 2500, id: toastId });
      navigate("/login");
    } catch (err) {
      if (err.status === 400) {
        return toast.error("Duplicate email or phone number", {
          id: toastId,
          duration: 2500,
        });
      }
      toast.error("Something went wrong!", { id: toastId, duration: 2500 });
      console.log({ err });
    }
  };

  const uploadProps: UploadProps = {
    action: image_hosting_api,
    name: "image",
    listType: "picture",
    onChange({ file }) {
      if (file.status === "done") {
        const uploadedImageUrl = file.response.data.url;
        setImageUrl(uploadedImageUrl);
        setDisableUploadButton(true);

        toast.success("Image uploaded successfully!");
        setImageRequiredError(false);
      } else if (file.status === "error") {
        toast.error("Image upload failed");
        setImageRequiredError(true);
      } else if (file.status === "removed") {
        setImageUrl("");
        setDisableUploadButton(false);
        toast.success("Image removed");
        setImageRequiredError(true);
      }
    },
    onRemove(file) {
      setImageUrl("");
      setDisableUploadButton(false);
      setImageRequiredError(true);
    },
  };

  return (
    <div className="md:flex">
      <img className="hidden md:block md:w-1/2" src={signUpImg} alt="" />
      <div className="md:w-1/2 shadow-xl py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline text-orange-700">
          SignUp Now{" "}
        </h2>
        <div className="flex flex-col  h-4/5 w-2/3 mx-auto">
          <UseForm onSubmit={onSubmit}>
            <div className=" flex flex-col font-semibold">
              <FormInput
                className=""
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
              <Upload className="text-white" {...uploadProps}>
                <h2 className="text-sm text-start text-white">Image :</h2>
                <Button
                  style={{
                    backgroundColor: "#e11d48",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "0",
                    font: "inherit",
                  }}
                  disabled={disableUploadButton}
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
              {imageRequiredError && (
                <small style={{ color: "red" }}>Image is required !</small>
              )}
              <div className="mb-4"></div>
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

          <div className="mt-6 flex justify-evenly w-full ">
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
