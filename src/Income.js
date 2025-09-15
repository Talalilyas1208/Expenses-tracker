// Income.jsx
import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Input, Select, Space, message } from "antd";
import { DollarCircleOutlined, SaveOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function Income({ onSave }) {
  const [inputAmount, setInputAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);

  const categoryOptions = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
    { value: "freelance", label: "Freelance" },
    { value: "investment", label: "Investment" },
    { value: "other", label: "Other" },
  ];

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
      amount: value,
      description: description || "No description",
      category: selectedCat || "Uncategorized",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Guard: only call onSave if provided as a function
    if (typeof onSave === "function") {
      onSave(newEntry);
      message.success("Entry saved");
    } else {
      // fallback: just log (prevents crash when Income rendered standalone)
      console.warn("onSave not provided for Income component, entry:", newEntry);
      message.info("onSave not wired — entry logged to console.");
    }

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
