import { useState } from "react";
import UseForm from "../form/Form";
import { FieldValues } from "react-hook-form";
import FormInput from "../form/Input";
import UseSelect from "../form/Select";
import moment from "moment";
import { Button, Input } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import {
  useAddBookingMutation,
  usePayBookingMutation,
} from "../../redux/features/booking/bookingApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const OrderForm = ({ selectedSlot }: any) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const navigate = useNavigate();
  const user = useAppSelector(getCurrentUser);
  const { data: singleUser, isFetching } = useGetSingleUserQuery(
    user?.userEmail,
    {
      skip: !user?.userEmail,
    }
  );

  const [addBooking] = useAddBookingMutation();
  const [payBooking] = usePayBookingMutation();

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
    const toastId = toast.loading("Booking in process");
    const { vehicleModel, vehicleBrand, manufacturingYear, registrationPlate } =
      data;

    const bookingData = {
      serviceId: selectedSlot?.data?.service?._id,
      slotId: selectedSlot?.data?._id,
      vehicleType: selectedVehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear: Number(manufacturingYear),
      registrationPlate,
      due: Number(selectedSlot?.data?.service?.price),
    };

    try {
      await addBooking(bookingData);
      toast.success("Booking Successful", { duration: 2500, id: toastId });

      const toastId2 = toast.loading("Redirecting to the payment page");

      const res2 = await payBooking(bookingData.slotId);

      const paymentWindow = window.open(res2.data.data.payment_url, "_blank");

      if (paymentWindow) {
        toast.dismiss(toastId2);
        navigate("/dashboard/my-bookings");
      } else {
        toast.error("Failed to open the payment page.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.log({ err });
    }
  };

  if (isFetching) {
    return;
  }

  return (
    <div className="w-full md:w-1/2 pt-8 md:pt-0">
      <UseForm onSubmit={onSubmit}>
        <h2 className="font-semibold text-2xl text-center mb-8 text-white ">
          Vehicle Details
        </h2>
        <div className="w-3/4 mx-auto">
          <UseSelect
            setSelectedOption={setSelectedVehicleType}
            options={vehicleTypesOptions}
            name="vehicleType"
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
          <h2 className="text-sm mt-3 font-semibold text-white">
            Receiver Name :
          </h2>
          <Input
            defaultValue={singleUser?.data?.name}
            style={{ color: "black", backgroundColor: "white" }}
            disabled={true}
            type="email"
            name="email"
            className=""
          ></Input>
          <h2 className="text-sm mt-3 font-semibold text-white">Email :</h2>
          <Input
            defaultValue={user?.userEmail}
            style={{ color: "black", backgroundColor: "white" }}
            disabled={true}
            type="email"
            name="email"
            className=""
          ></Input>

          <h2 className="text-sm mt-3 font-semibold text-white">
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
