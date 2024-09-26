import { Rate } from "antd";
import { Controller } from "react-hook-form";

type TRateProps = {
  name: string;
  label?: string;
  className?: string;
  onChange?: (value: number) => void;
};

const FormRate = ({ name, label, className, onChange }: TRateProps) => {
  return (
    <div className="mb-4 w-full">
      <h2 className="text-sm text-white">{label ? label : null}</h2>
      <Controller
        name={name}
        render={({ field }) => (
          <Rate
            className={className}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }}
          />
        )}
        defaultValue={0}
      />
    </div>
  );
};

export default FormRate;
