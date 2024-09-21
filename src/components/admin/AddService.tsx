import { Button, Row, Upload } from "antd";
import UseForm from "../form/Form";
import UseSelect from "../form/Select";
import FormInput from "../form/Input";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { UploadProps } from "antd";
import { image_hosting_api } from "../../Constant/imagebb";
import { useAddServiceMutation } from "../../redux/features/service/serviceApi";

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

const AddService = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disableUploadButton, setDisableUploadButton] = useState(false);
  const [imageRequiredError, setImageRequiredError] = useState(false);
  const [categoryRequiredError, setCategoryRequiredError] = useState(false);

  const [addService] = useAddServiceMutation();

  useEffect(() => {
    if (selectedOption === "") {
      setCategoryRequiredError(true);
    } else {
      setCategoryRequiredError(false);
    }
  }, []);

  useEffect(() => {
    if (!imageUrl) {
      setImageRequiredError(true);
    } else {
      setImageRequiredError(false);
    }
  }, []);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating new service...");
    try {
      if (!imageUrl || selectedOption === "") {
        return;
      }

      const { name, description, price, duration } = data;

      const serviceData = {
        name,
        category: selectedOption,
        description,
        price: Number(price),
        duration: Number(duration),
        image: imageUrl,
        isDeleted: false,
      };

      await addService(serviceData);
      toast.success("Service created successfully !", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error("Something went wrong !", { id: toastId, duration: 2000 });
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
    <div>
      <div className=" py-8 rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline text-white">
          Add New Service{" "}
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
                className=""
              ></FormInput>
              <UseSelect
                setCategoryRequiredError={setCategoryRequiredError}
                requiredError={categoryRequiredError}
                setSelectedOption={setSelectedOption}
                options={categoryOptions}
                name="category"
                label="Category"
              />
              <FormInput
                required={true}
                type="textarea"
                name="description"
                label="Description :"
              ></FormInput>
              <FormInput
                required={true}
                type="number"
                name="price"
                label="Price :"
              ></FormInput>
              <FormInput
                required={true}
                type="number"
                name="duration"
                label="Duration :"
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
              {imageRequiredError && (
                <small style={{ color: "red" }}>Image is required !</small>
              )}
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
                Create
              </Button>
            </div>
          </UseForm>
        </Row>
      </div>
    </div>
  );
};

export default AddService;
