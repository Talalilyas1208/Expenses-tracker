import { Row, Col, Typography, Spin, Select, Input } from "antd";
import useFetch from "./Hooks/hookfetchdata";
import { useMemo, useState } from "react";
import Buttons from "./Compenets/Buttons";
import { SaveOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEntries } from "./EntriesContext"; // 👈 import context

const { Text } = Typography;

const Transfer = () => {
  const { data: transferData, loading: transferLoading } = useFetch(
    "http://localhost:8080/transfer"
  );
  const { data: amountData } = useFetch("http://localhost:8080/amount");
  const { addTransfer } = useEntries(); // 👈 from context

  const [fromBank, setFromBank] = useState(null);
  const [toBank, setToBank] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [description, setDescription] = useState("");

  // Bank options
  const transferOptions =
    transferData?.map((cat) => ({
      value: cat.Bank,
      label: cat.Bank,
    })) || [];

 
  // Input handlers
  const handleAmountChange = (e) => {
    const val = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setInputAmount(val);
  };

  const handleAmountChanges = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setSendAmount(value);
  };

  // Save handler
  const handleSave = () => {
    const amountVal = parseFloat(inputAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      console.log("Enter a valid amount > 0");
      return;
    }

    const savingData = {
      id: Date.now(),
      from: fromBank || "Unknown",
      to: toBank || "Unknown",
      inputAmount: amountVal,
      sendAmount: parseFloat(sendAmount) || 0,
      description: description || "No description",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      type: "transfer",
    };

    addTransfer(savingData); 
    console.log("Saved transfer:", savingData);

    // Clear form
    setFromBank(null);
    setToBank(null);
    setInputAmount("");
    setSendAmount("");
    setDescription("");
  };

  return (
    <>
      {/* From & To */}
      <Row style={{ marginTop: "10px", marginBottom: "20px" }} align="middle">
        <Col lg={11} xs={24}>
          <Text strong>From</Text>
          {transferLoading ? (
            <Spin />
          ) : (
            <Select
              options={transferOptions}
              placeholder="Select bank"
              style={{ width: "100%" }}
              value={fromBank}
              onChange={setFromBank}
            />
          )}
        </Col>

        <Col lg={1} xs={24}>
          <Row justify="center" align="middle" style={{ height: "100%" }}>
            <ArrowRightOutlined
              style={{ fontSize: "15px", color: "#1890ff", marginTop: "15px" }}
            />
          </Row>
        </Col>

        <Col lg={11} xs={24}>
          <Text strong>To</Text>
          {transferLoading ? (
            <Spin />
          ) : (
            <Select
              options={transferOptions}
              placeholder="Select bank"
              style={{ width: "100%" }}
              value={toBank}
              onChange={setToBank}
            />
          )}
        </Col>
      </Row>

      {/* Amounts */}
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col lg={11} xs={24}>
          <Text strong>Amount</Text>
          <Input
            size="large"
            type="text"
            placeholder="Enter amount"
            value={inputAmount}
            onChange={handleAmountChange}
          />
        </Col>
        <Col lg={11} xs={24} offset={1}>
          <Text strong>Send Amount</Text>
          <Input
            size="large"
            type="text"
            placeholder="Enter amount"
            value={sendAmount}
            onChange={handleAmountChanges}
          />
        </Col>
      </Row>

      {/* Description */}
      <Row>
        <Col lg={23} xs={24}>
          <Text strong>Description</Text>
          <Input
            size="large"
            placeholder="Just saved some money"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Row>

      {/* Save button */}
      <Row justify="center" style={{ margin: "10px" }}>
        <Col>
          <Buttons
            icon={<SaveOutlined />}
            text="Save"
            size="large"
            handlesave={handleSave} 
          />
        </Col>
      </Row>
    </>
  );
};

export default Transfer;
