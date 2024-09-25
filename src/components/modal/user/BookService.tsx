import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetAllSlotsQuery } from "../../../redux/features/slots/slotApi";
import UseForm from "../../form/Form";
import UseSelect from "../../form/Select";
import moment from "moment";
import FormInput from "../../form/Input";
import { useAppSelector } from "../../../redux/hooks";
import { getCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../../redux/features/auth/authApi";
import { Button } from "antd";
import { useAddBookingMutation } from "../../../redux/features/booking/bookingApi";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";

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

const BookService = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  const navigate = useNavigate();

  if (serviceId === undefined) {
    return <div>Error: ID is missing</div>;
  }

  console.log({ selectedSlot, selectedVehicleType });

  const { data: availableSlots, refetch } = useGetAllSlotsQuery({
    service: serviceId,
    isBooked: "available",
    limit: 50000,
  });

  const user = useAppSelector(getCurrentUser);
  const { data: customer } = useGetSingleUserQuery(user?.userEmail, {
    skip: !user,
  });

  const [createBooking] = useAddBookingMutation();

  const slotOptions = availableSlots?.data?.map((item) => ({
    value: item._id,
    label: `${moment(item?.date).format("DD MMM YYYY")} From ${moment(
      item?.startTime,
      "HH:mm"
    ).format("h:mm A")} To ${moment(item?.endTime, "HH:mm").format("h:mm A")}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Booking in process");
    try {
      const {
        vehicleModel,
        vehicleBrand,
        manufacturingYear,
        registrationPlate,
      } = data;
      const bookingData = {
        customerId: customer?.data?._id,
        serviceId,
        slotId: selectedSlot,
        vehicleType: selectedVehicleType,
        vehicleBrand,
        vehicleModel,
        manufacturingYear: Number(manufacturingYear),
        registrationPlate,
      };

      const res = await createBooking(bookingData);

      refetch();

      if (res.error) {
        return toast.error(res.error.data.errorMessages[0].message, {
          id: toastId,
          duration: 2300,
        });
      }
      navigate("/dashboard/my-bookings");
      toast.success("Booking successful !", { id: toastId, duration: 2300 });

      console.log({ res });

      console.log({ bookingData });
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <div className="  ">
      <UseForm onSubmit={onSubmit}>
        <div className="w-4/5 mx-auto">
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

          <UseSelect
            setSelectedOption={setSelectedSlot}
            options={slotOptions}
            name="category"
            label="Slot"
          />

          <Button
            style={{
              backgroundColor: "#0ea5e9",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "0",
              font: "inherit",
              width: "25%",
            }}
            htmlType="submit"
            className=""
          >
            Book
          </Button>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm bg-red-600 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </UseForm>
    </div>
  );
};

export default BookService;
