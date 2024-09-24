import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import toast from "react-hot-toast";
import { Button, Row } from "antd";
import UseForm from "../../components/form/Form";
import UseSelectWithWatch from "../../components/form/SelectWithWatch";
import UseDatePicker from "../../components/form/DatePicker";
import UseTimePicker from "../../components/form/TimePicker";
import { useState } from "react";
import moment from "moment";
import { useAddSlotMutation } from "../../redux/features/slots/slotApi";
import { useNavigate } from "react-router-dom";

const AddSlot = () => {
  const [serviceId, setServiceId] = useState("");
  const { data: allServices } = useGetAllServicesQuery(undefined);

  const navigate = useNavigate();

  const [addSlot] = useAddSlotMutation();

  const serviceOptions = allServices?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating new slot...");
    try {
      const { date, startTime, endTime } = data;

      const slotData = {
        service: serviceId,
        date: moment(new Date(date)).format("YYYY-MM-DD"),
        startTime: moment(new Date(startTime)).format("HH:mm"),
        endTime: moment(new Date(endTime)).format("HH:mm"),
      };

      const res = await addSlot(slotData);
      if (res?.error) {
        return toast.error(res.error.data.message, {
          id: toastId,
          duration: 3400,
        });
      }
      console.log({ res });
      toast.success(
        `${res.data.data.length} ${
          res.data.data.length > 1 ? "slots" : "slot"
        } created successfully !`,
        {
          id: toastId,
          duration: 2000,
        }
      );

      navigate("/dashboard/slotManagement/manageSlots");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <div className=" rounded-3xl">
        <h2 className="text-3xl text-start font-semibold ml-8 mb-6 underline text-teal-950">
          Add New Slot{" "}
        </h2>
        <Row
          className="flex flex-col h-4/5 "
          justify="center"
          align="middle"
          style={{}}
        >
          <div className="w-11/12 md:w-4/5 lg:w-3/5 bg-teal-950 rounded-lg">
            <UseForm onSubmit={onSubmit}>
              <div className="text-white w-11/12 mx-auto my-8 flex flex-col font-semibold">
                <UseSelectWithWatch
                  onValueChange={setServiceId}
                  options={serviceOptions}
                  name="service"
                  label="Service Name :"
                />

                <UseDatePicker name="date" label="Date :" />

                <div className="flex justify-between items-center">
                  <div className="w-5/12">
                    <UseTimePicker name="startTime" label="Start Time :" />
                  </div>
                  <div className="w-5/12">
                    <UseTimePicker name="endTime" label="End Time :" />
                  </div>
                </div>

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
          </div>
        </Row>
      </div>
    </div>
  );
};

export default AddSlot;
