import { Select } from "antd";

export default function Selected({
  options = [],
  value,
  onChange,
  placeholder = "Select",
}) {
  return (
    <Select
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%" }}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}></Select.Option>
      ))}
    </Select>
  );
}
