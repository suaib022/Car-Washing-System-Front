import { Button, Flex, Row, Spin, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { UploadProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../../redux/features/service/serviceApi";
import { image_hosting_api } from "../../../Constant/imagebb";
import UseForm from "../../form/Form";
import FormInput from "../../form/Input";
import UseSelect from "../../form/Select";
import { FieldValues } from "react-hook-form";

const categoryOptions = [
  { value: "ExteriorWash", label: "Exterior Wash" },
  { value: "InteriorCleaning", label: "Interior Cleaning" },
  { value: "FullDetailing", label: "Full Detailing" },
  { value: "ExpressWash", label: "Express Wash" },
  { value: "EngineCleaning", label: "Engine Cleaning" },
  { value: "WaxingPolishing", label: "Waxing & Polishing" },
  { value: "Vacuuming", label: "Vacuuming" },
  { value: "CeramicCoating", label: "Ceramic Coating" },
  { value: "PaintProtection", label: "Paint Protection" },
  { value: "WindowCleaning", label: "Window Cleaning" },
  { value: "SUVTruckWash", label: "SUV/Truck Wash" },
  { value: "LuxuryVehicleDetailing", label: "Luxury Vehicle Detailing" },
];

const UpdateService = ({ serviceId }: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disableUploadButton, setDisableUploadButton] = useState(false);

  const { data: singleService, isFetching } =
    useGetSingleServiceQuery(serviceId);
  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating new service...");

    try {
      const { name, description, price, duration } = data;

      const updatedData = {
        name: name || singleService?.data?.name,
        category: selectedOption || singleService?.data?.category,
        description: description || singleService?.data?.description,
        price: Number(price) || Number(singleService?.data?.price),
        duration: Number(duration) || Number(singleService?.data?.duration),
        image: imageUrl || singleService?.data?.image,
      };

      updateService({ serviceId, updatedData });
      toast.success("Service updated successfully !", {
        id: toastId,
        duration: 2000,
      });

      console.log({ updatedData });
    } catch (err) {
      toast.error("Something went wrong !", { duration: 2000 });
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
      } else if (file.status === "error") {
        toast.error("Image upload failed");
      } else if (file.status === "removed") {
        setImageUrl("");
        setDisableUploadButton(false);
        toast.success("Image removed");
      }
    },
    onRemove(_file) {
      setImageUrl("");
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
      <div className=" py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline text-white">
          Update Service{" "}
        </h2>
        <Row
          className="flex flex-col h-4/5"
          justify="center"
          align="middle"
          style={{}}
        >
          <UseForm onSubmit={onSubmit}>
            <div className="space-y-8 text-white flex flex-col font-semibold">
              <FormInput
                required={true}
                type="text"
                name="name"
                label="Service Name :"
                defaultValue={singleService?.data?.name}
              ></FormInput>
              <UseSelect
                setSelectedOption={setSelectedOption}
                options={categoryOptions}
                name="category"
                label="Category"
                defaultValue={singleService?.data?.category}
              />
              <FormInput
                required={true}
                type="textarea"
                name="description"
                label="Description :"
                defaultValue={singleService?.data?.description}
              ></FormInput>
              <FormInput
                required={true}
                type="number"
                name="price"
                label="Price :"
                defaultValue={singleService?.data?.price}
              ></FormInput>
              <FormInput
                required={true}
                type="number"
                name="duration"
                label="Duration :"
                defaultValue={singleService?.data?.duration}
              ></FormInput>

              <Upload className="text-white" {...uploadProps}>
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
                  backgroundColor: "#0ea5e9",
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
        </Row>
      </div>
    </div>
  );
};

export default UpdateService;
