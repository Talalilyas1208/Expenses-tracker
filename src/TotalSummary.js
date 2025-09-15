import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Input,
  Select,
  notification,
  Card,
  Space,
  Divider,
} from "antd";
import {
  DollarCircleOutlined,
  SaveOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TotalSummary from "./TotalSummary"; // <-- new component

const { Text, Title } = Typography;

export default function Income() {
  const [inputAmount, setInputAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [day, setDay] = useState(null);

  const categoryOptions = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
    { value: "freelance", label: "Freelance" },
    { value: "investment", label: "Investment" },
    { value: "other", label: "Other" },
  ];

  const handleAmountChange = (e) => {
    const val = e.target.value;
    const sanitizedVal = val
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setInputAmount(sanitizedVal);
  };

  const handleSaving = () => {
    const value = parseFloat(String(inputAmount).trim());

    if (isNaN(value) || value <= 0) {
      notification.error({
        message: "Invalid amount",
        description: "Please enter a valid positive number.",
        placement: "topRight",
      });
      return;
    }

    setTotal((prev) => prev + value);

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        amount: value,
        description: description || "No description",
        category: selectedCat || "Uncategorized",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    ]);

    setInputAmount("");
    setDescription("");
    setSelectedCat(null);
    setDay(null);

    notification.success({
      message: "Entry Saved Successfully!",
      description: `Added ${value.toFixed(2)} to your income`,
      placement: "topRight",
      duration: 3,
    });
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24, color: "#1890ff" }}>
        <DollarCircleOutlined /> Income Tracker
      </Title>

      <Card title="Add New Income Entry" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col lg={12} xs={24}>
              <Text strong>Amount *</Text>
              <Input
                size="large"
                type="text"
                placeholder="Enter amount (e.g., 1000.50)"
                value={inputAmount}
                onChange={handleAmountChange}
                prefix={<DollarCircleOutlined style={{ color: "#52c41a" }} />}
                style={{ marginTop: 4 }}
              />
            </Col>

            <Col lg={12} xs={24}>
              <Text strong>Description</Text>
              <Input
                size="large"
                placeholder="e.g., Monthly Salary, Freelance Project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginTop: 4 }}
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
                style={{ width: "100%", marginTop: 4 }}
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
              disabled={!inputAmount || inputAmount === ""}
            >
              Save Entry
            </Button>
          </Row>
        </Space>
      </Card>

      {/* ✅ Reusable Summary Component */}
      <Card>
        <TotalSummary total={total} entries={entries} />
      </Card>

      {/* Debug Panel */}
      <Card
        size="small"
        title={
          <>
            <InfoCircleOutlined /> Debug Information
          </>
        }
        style={{ marginTop: 16 }}
        type="inner"
      >
        <Space direction="vertical" size="small">
          <Text code>Input Amount: "{inputAmount}"</Text>
          <Text code>Entries Count: {entries.length}</Text>
          <Text code>Current Total: ${total.toFixed(2)}</Text>
          <Text code>Selected Category: {selectedCat || "None"}</Text>
          <Text code>Description: {description || "Empty"}</Text>
        </Space>
      </Card>
    </div>
  );
}
