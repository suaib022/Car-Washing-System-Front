import { Form } from "antd";
import { Controller } from "react-hook-form";

type TUseSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  mode?: "multiple" | undefined;
  className?: string;
  setSelectedOption: any;
  requiredError?: boolean;
  setCategoryRequiredError?: any;
  defaultValue?: string;
};

const UseSelect = ({
  label,
  name,
  options,
  setSelectedOption,
  requiredError,
  setCategoryRequiredError,
  defaultValue,
}: TUseSelectProps) => {
  const handleChange = (e: any) => {
    e.preventDefault();
    setSelectedOption(e.target.value);
    setCategoryRequiredError && setCategoryRequiredError(false);
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item>
          <h2 className="text-white">{label} :</h2>
          <select
            defaultValue={defaultValue}
            onChange={handleChange}
            className="select bg-white select-bordered w-full max-w-xs"
          >
            <option disabled value="x" selected>
              Select a category
            </option>
            {options?.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
          {requiredError && (
            <small style={{ color: "red" }}>This field is required !</small>
          )}
        </Form.Item>
      )}
    />
  );
};

export default UseSelect;
