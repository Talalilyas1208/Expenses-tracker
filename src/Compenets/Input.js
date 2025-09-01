// src/Components/InputField.jsx
import { useState } from "react";
import { Input, Button } from "antd";

export default function InputField({ onAdd }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (productName.trim() === "" || price.trim() === "") return;

    onAdd({ name: productName, price }); // send as object
    setProductName("");
    setPrice("");
  };

  return (
    <Input.Group compact style={{ marginBottom: 16 }}>
      <Input
        style={{ width: "50%" }}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product name..."
        onPressEnter={handleAdd}
      />
      <Input
        style={{ width: "30%" }}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price..."
        onPressEnter={handleAdd}
      />
      <Button type="primary" onClick={handleAdd}>
        Add
      </Button>
    </Input.Group>
  );
}
