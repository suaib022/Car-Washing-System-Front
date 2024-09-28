import React, { useState } from "react";
import UseForm from "../form/Form";
import { FieldValues } from "react-hook-form";
import FormInput from "../form/Input";
import UseSelect from "../form/Select";
import moment from "moment";
import { Button, Input } from "antd";

const vehicleTypesOptions = [
  { value: "car", label: "Car" },
  { value: "truck", label: "Truck" },
  { value: "SUV", label: "SUV" },
  { value: "van", label: "Van" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "bus", label: "Bus" },
  { value: "electricVehicle", label: "Electric Vehicle" },
  { value: "hybridVehicle", label: "Hybrid Vehicle" },
  { value: "bicycle", label: "Bicycle" },
  { value: "tractor", label: "Tractor" },
];

const OrderForm = ({ selectedSlot }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  console.log({ selectedSlot });

  const selectedTimeSlot = selectedSlot?.data
    ? `${moment(selectedSlot.data.date).format("DD MMM YYYY")}, From ${moment(
        selectedSlot.data.startTime,
        "HH:mm"
      ).format("h:mm A")} To ${moment(
        selectedSlot.data.endTime,
        "HH:mm"
      ).format("h:mm A")}`
    : "No slot selected";

  const onSubmit = async (data: FieldValues) => {
    console.log({ data });
  };
  return (
    <div className="w-full md:w-1/2">
      <UseForm onSubmit={onSubmit}>
        <h2 className="font-semibold text-2xl text-center mb-8 text-white ">
          Vehicle Details
        </h2>
        <div className="w-3/4 mx-auto">
          <UseSelect
            setSelectedOption={setSelectedVehicleType}
            options={vehicleTypesOptions}
            name="vehicle"
            label="Vehicle Type"
          />

          <FormInput
            required={true}
            type="text"
            name="vehicleBrand"
            label="Vehicle Brand :"
            className=""
          ></FormInput>

          <FormInput
            required={true}
            type="text"
            name="vehicleModel"
            label="Vehicle Model :"
            className=""
          ></FormInput>

          <FormInput
            required={true}
            type="number"
            name="manufacturingYear"
            label="Manufacturing Year :"
            className=""
          ></FormInput>

          <FormInput
            required={true}
            type="text"
            name="registrationPlate"
            label="Registration Plate :"
            className=""
          ></FormInput>
        </div>
        <div className="divider"></div>
        <h2 className="font-semibold text-2xl text-center mb-8 text-white ">
          User Details
        </h2>
        <div className="w-3/4 mx-auto">
          <FormInput
            required={true}
            type="text"
            name="name"
            label="Name :"
            className=""
          ></FormInput>

          <FormInput
            required={true}
            type="email"
            name="email"
            label="Email :"
            className=""
          ></FormInput>

          <h2 className="text-sm font-semibold text-white">
            Selected Time Slot :
          </h2>
          <Input
            defaultValue={selectedTimeSlot}
            disabled={true}
            type="text"
            name="selectedSlot"
            className="text-white bg-white"
            style={{ color: "black", backgroundColor: "white" }}
          ></Input>
        </div>
        <div className="w-1/4 mx-auto mb-8">
          <Button
            style={{
              backgroundColor: "#f43f5e",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "0",
              font: "inherit",
              width: "100%",
              marginTop: "30px",
            }}
            htmlType="submit"
            className=""
          >
            Pay Now
          </Button>
        </div>
      </UseForm>
    </div>
  );
};

export default OrderForm;
