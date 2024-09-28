import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  value?: string | number;
  className?: string;
  required?: boolean;
  defaultValue?: string | any;
  rows?: number;
  disabled?: boolean;
};

const FormInput = ({
  type,
  name,
  label,
  value,
  className,
  required,
  defaultValue,
  rows,
  disabled,
}: TInputProps) => {
  return (
    <div className="mb-4 w-full ">
      <h2 className="text-sm text-white">{label ? label : null}</h2>
      <Controller
        name={name}
        render={({ field }) =>
          type === "textarea" ? (
            <Input.TextArea
              required={required}
              className={className}
              id={name}
              defaultValue={defaultValue}
              rows={rows}
              disabled={disabled}
              {...field}
            />
          ) : (
            <Input
              className={className}
              {...field}
              disabled={disabled}
              type={type}
              value={value}
              id={name}
              required={required}
              defaultValue={defaultValue}
            ></Input>
          )
        }
      ></Controller>
    </div>
  );
};

export default FormInput;
