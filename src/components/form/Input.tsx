import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  value?: string | number;
  className?: string;
  required?: boolean;
};

const FormInput = ({
  type,
  name,
  label,
  value,
  className,
  required,
}: TInputProps) => {
  return (
    <div>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) =>
          type === "textarea" ? (
            <Input.TextArea
              required={required}
              className={className}
              id={name}
              {...field}
            />
          ) : (
            <Input
              className={className}
              {...field}
              type={type}
              value={value}
              id={name}
              required={required}
            ></Input>
          )
        }
      ></Controller>
    </div>
  );
};

export default FormInput;
