import { Button } from "antd";
export default function Buttons({ ...props }) {
  const { size, text, icon, handlesave } = { ...props };

  return (
    <Button
      size={size}
      style={{ width: "100%" }}
      icon={icon}
      onClick={handlesave}
    >
      {text}
    </Button>
  );
}
