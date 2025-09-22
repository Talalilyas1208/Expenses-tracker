import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Select,
  Space,
  message,
} from "antd";
import { DollarCircleOutlined, SaveOutlined } from "@ant-design/icons";
import useFetch from "./Hooks/hookfetchdata";
import { useEntries } from "./EntriesContext"; 

const { Text } = Typography;

export default function Income() {
  const { addEntry } = useEntries(); 
  const [inputAmount, setInputAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);

  const { data, loading } = useFetch("http://localhost:8080/income");
  const categoryOptions = data ?? [];

  const handleAmountChange = (e) => {
    const val = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setInputAmount(val);
  };

  const handleSaving = () => {
    const value = parseFloat(inputAmount);
    if (isNaN(value) || value <= 0) {
      message.error("Enter a valid amount > 0");
      return;
    }

    const newEntry = {
      id: Date.now(),
      amount: Math.abs(value), // ✅ always positive for income
      description: description || "No description",
      category: selectedCat || "Uncategorized",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      type: "income", // ✅ label it
    };

    addEntry(newEntry); // ✅ push into global entries
    message.success("Income entry saved");

    // reset fields
    setInputAmount("");
    setDescription("");
    setSelectedCat(null);
  };

  return (
    <Card title="Add New Income Entry">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row gutter={16}>
          <Col lg={12} xs={24}>
            <Text strong>Amount *</Text>
            <Input
              size="large"
              type="text"
              placeholder="Enter amount"
              value={inputAmount}
              onChange={handleAmountChange}
              prefix={<DollarCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Text strong>Description</Text>
            <Input
              size="large"
              placeholder="e.g., Salary, Freelance"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={12} xs={24}>
            <Text strong>Category</Text>
            <Select
              size="large"
              options={categoryOptions}
              value={selectedCat}
              onChange={(val) => setSelectedCat(val)}
              placeholder="Select income category"
              style={{ width: "100%" }}
              allowClear
              loading={loading}
            />
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: 16 }}>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={handleSaving}
            disabled={!inputAmount}
          >
            Save Entry
          </Button>
        </Row>
      </Space>
    </Card>
  );
}
