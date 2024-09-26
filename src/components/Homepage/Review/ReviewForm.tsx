import { Button, Row } from "antd";
import { useState } from "react";
import FormInput from "../../form/Input";
import UseForm from "../../form/Form";
import FormRate from "../../form/Rate";
import { FieldValues } from "react-hook-form";
import UseSelect from "../../form/Select";
import { useGetAllServicesQuery } from "../../../redux/features/service/serviceApi";
import { useAddReviewMutation } from "../../../redux/features/review/reviewApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingRequiredError, setRatingRequiredError] = useState(false);

  const navigate = useNavigate();

  const { data: allServices, isFetching } = useGetAllServicesQuery({
    limit: 50000,
  });

  const [addReview] = useAddReviewMutation();

  const serviceOptions = allServices?.data?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));

  const onChange = (value: number) => {
    setRating(value);
    setRatingRequiredError(false);
  };

  const onSubmit = async (data: FieldValues) => {
    setRatingRequiredError(false);
    if (rating === 0) {
      setRatingRequiredError(true);
      return;
    }
    const toastId = toast.loading("Review posting...");

    const reviewData = {
      feedback: data.feedback,
      rating: Number(rating),
      service: selectedService,
    };

    try {
      const res = await addReview(reviewData);
      if (res?.error) {
        return toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 3000,
        });
      }
      toast.success("Review posted", { id: toastId, duration: 2 });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review Posted",
        text: "Thanks for your feedback",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/");
    } catch (err) {}
  };
  return (
    <>
      <div className="">
        <Row className="flex flex-col h-4/5 w-3/5 mx-auto" style={{}}>
          <UseForm onSubmit={onSubmit}>
            <div className="space-y-0 text-white flex flex-col font-semibold">
              <UseSelect
                className=""
                options={serviceOptions}
                name="service"
                label="Service You Took"
                setSelectedOption={setSelectedService}
              />
              <FormInput
                className="mb-5"
                required={true}
                type="textarea"
                rows={4}
                name="feedback"
                label="Feedback :"
              ></FormInput>

              <FormRate
                className="bg-slate-100 py-4 px-2 rounded-md"
                name="rating"
                label="Rate :"
                onChange={onChange}
              />
              {ratingRequiredError && (
                <h2 className="text-red-600 font-semibold text-lg">
                  Please provide rating
                </h2>
              )}
              <div className="w-1/2 mx-auto pt-6">
                <Button
                  style={{
                    backgroundColor: "#f43f5e",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "0",
                    font: "inherit",
                    marginBottom: "44px",
                    width: "100%",
                  }}
                  htmlType="submit"
                >
                  Post
                </Button>
              </div>
            </div>
          </UseForm>
        </Row>
      </div>
    </>
  );
};

export default ReviewForm;
