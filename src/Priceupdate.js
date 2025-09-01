import { useState } from "react";
import { Table, Button, Typography } from "antd";
import InputField from "./Compenets/Input";

let idCounter = 0;
export default function Priceupdate() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, key: ++idCounter }]);
  };

  const deleteProduct = (key) => {
    setProducts(products.filter((del) => del.key !== key));
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger type="text" onClick={() => deleteProduct(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>ADD the expense</h2>

      <InputField onAdd={addProduct} />

      <Table
        columns={columns}
        dataSource={products}
        pagination={false}
        bordered
      />
    </div>
  );
}
