import toast from "react-hot-toast";
import { image_hosting_api } from "../Constant/imagebb";
import { UploadProps } from "antd";

// handle image upload
export const uploadProps: UploadProps = {
  action: image_hosting_api,
  name: "image",
  listType: "picture",
  onChange({ file }) {
    console.log({ file });
    if (file.status === "done") {
      const uploadedImageUrl = file.response.data.url;
      // setImageUrl(uploadedImageUrl);
      // setDisableUploadButton(true);
      console.log(uploadedImageUrl);
      toast.success("Image uploaded successfully!");
    } else if (file.status === "error") {
      toast.error("Image upload failed");
    } else if (file.status === "removed") {
      // setImageUrl("");
      // toast.info("Image removed");
    }
  },
  onRemove(file) {
    console.log({ file });
    //   setImageUrl("");
    //   setDisableUploadButton(false);
  },
};
