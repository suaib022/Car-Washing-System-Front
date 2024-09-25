import { useNavigate } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useSignUpMutation,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Flex, Spin, Upload, UploadProps } from "antd";
import { image_hosting_api } from "../../../Constant/imagebb";
import UseForm from "../../form/Form";
import FormInput from "../../form/Input";
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../redux/hooks";
import { getCurrentUser } from "../../../redux/features/auth/authSlice";
import { LoadingOutlined } from "@ant-design/icons";

const EditProfile = ({ userId }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [disableUploadButton, setDisableUploadButton] = useState(false);

  const { userEmail } = useAppSelector(getCurrentUser);

  const { data: user, isFetching } = useGetSingleUserQuery(userEmail, {
    skip: !userEmail,
  });
  const [updateProfile] = useUpdateUserMutation();

  console.log({ user });

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Profile...");
    try {
      const { name, phone, address } = data;

      const updatedData = {
        name: name || user?.data?.name,
        phone: phone || user?.data?.phone,
        address: address || user?.data?.address,
        image: imageUrl || user?.data?.image,
      };

      console.log({ updatedData });

      const res = await updateProfile({ userId, updatedData }).unwrap();
      console.log({ res });
      toast.success(res.message, { duration: 2500, id: toastId });
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

    navigate("/dashboard/my-profile");
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
      } else if (file.status === "error") {
        toast.error("Image upload failed");
      } else if (file.status === "removed") {
        setImageUrl(null);
        setDisableUploadButton(false);
        toast.success("Image removed");
      }
    },
    onRemove(file) {
      setImageUrl(null);
      setDisableUploadButton(false);
    },
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
      <div className=" w-2/3 mx-auto py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold mb-6 underline text-orange-700">
          Update Profile{" "}
        </h2>
        <div className="flex flex-col h-4/5 mx-auto">
          <UseForm onSubmit={onSubmit}>
            <div className="space-y-4 flex flex-col font-semibold">
              <FormInput
                className=""
                required={true}
                type="text"
                name="name"
                label="Name :"
                defaultValue={user?.data?.name}
              ></FormInput>
              <FormInput
                required={true}
                type="number"
                name="phone"
                label="Contact Number :"
                defaultValue={user?.data?.phone}
              ></FormInput>
              <FormInput
                required={true}
                type="textarea"
                name="address"
                label="Address :"
                defaultValue={user?.data?.address}
              ></FormInput>
              <Upload className="text-white" {...uploadProps}>
                <h2 className="text-white">Profile Image :</h2>
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
                Update
              </Button>
            </div>
          </UseForm>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
