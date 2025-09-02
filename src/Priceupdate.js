// src/Priceupdate.jsx
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";

const { Text } = Typography;

export default function Priceupdate() {
  const [transactionType, setTransactionType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(null);

  const [incomeSource, setIncomeSource] = useState("");
  const [transferTo, setTransferTo] = useState("");

  const handleSave = () => {
    let data = {
      transactionType,
      amount,
      description,
      category,
      date,
    };

    if (transactionType === "income") {
      data.source = incomeSource;
    } else if (transactionType === "transfer") {
      data.toAccount = transferTo;
    }

    console.log("Saved:", data);
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Card
        title="Add Transaction"
        bordered={false}
        style={{
          width: 300,
          background: "#111",
          color: "#fff",
        }}
        headStyle={{ color: "#fff" }}
      >
        {/* Toggle between Expense, Income, Transfer */}
        <Radio.Group
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          buttonStyle="solid"
          style={{
            marginBottom: "16px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Radio.Button value="expense">Expense</Radio.Button>
          <Radio.Button value="income">Income</Radio.Button>
          <Radio.Button value="transfer">Transfer</Radio.Button>
        </Radio.Group>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {/* Amount */}
          <Input
            prefix="$"
            placeholder="0.00 USD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Description (only for expense & income) */}
          {(transactionType === "expense" || transactionType === "income") && (
            <Input
              placeholder="Description (e.g. Bought iPhone / Salary)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}

          {/* Extra Income field */}
          {transactionType === "income" && (
            <Input
              placeholder="Source of income (e.g. Job, Freelance)"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
            />
          )}

          {/* Extra Transfer field */}
          {transactionType === "transfer" && (
            <Input
              placeholder="Transfer to (e.g. Savings Account)"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
            />
          )}

          {/* Category (only for expense) */}
          {transactionType === "expense" && (
            <>
              <Select
                placeholder="Select category"
                value={category}
                onChange={(val) => setCategory(val)}
                style={{ width: "100%" }}
              >
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
                <Select.Option value="travel">Travel</Select.Option>
              </Select>
              <Text style={{ color: "#aaa", fontSize: "12px" }}>
                Don’t see a category you need?{" "}
                <a style={{ color: "#1677ff" }}>+ Add category</a>
              </Text>
            </>
          )}

          {/* Date */}
          <DatePicker
            style={{ width: "100%" }}
            value={date}
            onChange={(val) => setDate(val)}
          />

          {/* Save Button */}
          <Button type="primary" block onClick={handleSave}>
            Save
          </Button>
        </Space>
      </Card>
    </Row>
  );
}
