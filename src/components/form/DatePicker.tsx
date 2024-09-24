import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePicker = {
  name: string;
  label?: string;
};

const UseDatePicker = ({ name, label }: TDatePicker) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item>
            <h2 className="text-white">{label}</h2>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UseDatePicker;
