import { Controller, useFormContext } from "react-hook-form";
import { Form, TimePicker } from "antd";

type TUniDatePicker = {
  name: string;
  label: string;
};

const UseTimePicker = ({ name, label }: TUniDatePicker) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item>
              <h2 className="text-white">{label}</h2>
              <TimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      ></Controller>
    </div>
  );
};

export default UseTimePicker;
