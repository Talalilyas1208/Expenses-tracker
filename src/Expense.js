
import React, { useState, useMemo, useCallback } from "react";
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

export default function Expenses({ onSave }) {
  const [inputAmount, setInputAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const { addEntry, setEntries } = useEntries() ?? {};
  const { data, loading } = useFetch("http://localhost:8080/catg");
  const categoryOptions = useMemo(
    () =>
      (data ?? []).map((cat) => ({
        label: cat.catg,
        value: cat.catg,
      })),
    [data]
  );

  const handleAmountChange = useCallback((e) => {
    setInputAmount(
      e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
    );
  }, []);

  const handleSaving = useCallback(() => {
    const value = Number(inputAmount);
    if (!(value > 0)) {
      message.error("Enter a valid amount > 0");
      return;
    }

    
    const negativeAmount = -Math.abs(value);

    const newEntry = {
      id: Date.now(),
      amount: negativeAmount,
      description: description?.trim() || "No description",
      category: selectedCat ?? "Uncategorized",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      type: "expense",
    };

    console.debug("Saving expense:", newEntry);

  
    if (typeof addEntry === "function") {
      addEntry(newEntry);
      message.success("Expense saved");
    } else if (typeof onSave === "function") {
      onSave(newEntry);
      message.success("Expense saved");
    } else if (typeof setEntries === "function") {
      setEntries((prev = []) => [...prev, newEntry]);
      message.success("Expense saved (fallback)");
    } else {
      message.warning(
        "Expense prepared but not persisted (no handler available)"
      );
      console.warn("No handler to persist expense:", newEntry);
    }

  
    setInputAmount("");
    setDescription("");
    setSelectedCat(null);
  }, [inputAmount, description, selectedCat, addEntry, onSave, setEntries]);

  return (
    <div itle="➖ Add New Expense Entry">
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
              prefix={<DollarCircleOutlined style={{ color: "red" }} />}
            />
          </Col>

          <Col lg={12} xs={24}>
            <Text strong>Description</Text>
            <Input
              size="large"
              placeholder="e.g., Food, Rent"
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
              onChange={setSelectedCat}
              placeholder="Select expense category"
              style={{ width: "100%" }}
              allowClear
              loading={loading}
            />
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: 16 ,width:"100%" }}>
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              onClick={handleSaving}
              danger>
              Save Expense
            </Button>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
