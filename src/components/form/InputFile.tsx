import { Button, Upload } from "antd";
import { Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

type TFileInputProps = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  uploadProps: any;
};

const FormFileInput = ({
  name,
  label,
  className,
  required,
  disabled,
  uploadProps,
}: TFileInputProps) => {
  return (
    <div>
      {label ? label : null}
      <h2 className="mb-0">Image :</h2>
      <Controller
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        render={() => (
          <Upload className={className} {...uploadProps}>
            <Button disabled={disabled} icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        )}
      />
    </div>
  );
};

export default FormFileInput;
