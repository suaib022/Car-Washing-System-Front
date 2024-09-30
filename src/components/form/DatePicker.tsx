import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type TDatePicker = {
  name: string;
  label?: string;
  control: any;
};

const UseDatePicker = ({ name, label, control }: TDatePicker) => {
  const disablePastDates = (current: Dayjs) => {
    return current.isBefore(dayjs().startOf("day"));
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item>
            <h2 className="text-white">{label}</h2>
            <DatePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              disabledDate={disablePastDates}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : null)
              }
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UseDatePicker;
