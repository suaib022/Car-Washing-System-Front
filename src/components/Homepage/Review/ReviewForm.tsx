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
import { useAppSelector } from "../../../redux/hooks";
import { getCurrentUser } from "../../../redux/features/auth/authSlice";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingRequiredError, setRatingRequiredError] = useState(false);

  const navigate = useNavigate();

  const user = useAppSelector(getCurrentUser);

  const { data: allServices, isFetching } = useGetAllServicesQuery({
    limit: 50000,
  });

  const [addReview] = useAddReviewMutation();

  const serviceOptions = allServices?.data?.map((item: any) => ({
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
    const toastId = toast.loading("Posting review...");

    const reviewData = {
      feedback: data.feedback,
      rating: Number(rating),
      service: selectedService,
    };

    try {
      const res = (await addReview(reviewData)) as any;
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
    } catch (err) {
      toast.error("Error posting review");
    }
  };

  if (isFetching) {
    return (
      <span className="loading loading-dots flex my-32 mx-auto loading-lg"></span>
    );
  }

  return (
    <div className="relative w-full h-full">
      <h2 className="text-4xl text-white text-center font-bold mb-8 mx-auto flex pt-6 justify-center">
        Share Your Experience With Us
      </h2>

      <Row className="flex flex-col h-4/5 w-3/5 mx-auto review-form-container">
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
            />
            <FormRate
              className="bg-slate-100 py-4 px-2 rounded-md"
              name="rating"
              label="Rate :"
              onChange={onChange}
            />
            {ratingRequiredError && (
              <h2 className="text-red-600 font-semibold text-lg">
                Please provide a rating
              </h2>
            )}
            <div className="w-1/6 pt-6">
              <Button
                style={{
                  backgroundColor: "#f43f5e",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "4px",
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

        {/* Login Overlay */}
        {!user && (
          <div className="absolute inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center rounded-lg">
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "#f43f5e", color: "white" }}
              onClick={() => navigate("/login", { state: { from: "/review" } })}
            >
              Login to Post Review
            </Button>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ReviewForm;
