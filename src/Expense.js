
import { Row, Col, Typography, Spin, Modal, notification } from "antd";
import { useState } from "react";
import InputField from "./Compenets/Input";
import Selected from "./Compenets/Select";
import useFetch from "./Hooks/hookfetchdata";
import Calendar123 from "./Compenets/Calendar123";
import { useNavigate } from "react-router-dom";
import Buttons from "./Compenets/Buttons";
import { CalendarOutlined } from '@ant-design/icons';
const { Text } = Typography;

export default function Expense() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [day, setday] = useState(null);

  const { data: catData, loading: catLoading } = useFetch(
    "http://localhost:8080/catg"
  );
  const { data: dayData, loading: dayLoading } = useFetch(
    "http://localhost:8080/day"
  );
  const navigate = useNavigate();

  const categoryOptions =
    catData?.map((cat) => ({
      value: cat.catg,
    })) || [];
  const dayOption =
    dayData?.map((d) => ({
      value: d.day,
      label: d.day,
    })) || [];

  const handleCalendarClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (date) => {
    setday(date.format("YYYY-MM-DD"));
    setIsCalendarOpen(false);
  };

  const handleSave = async () => {
    if (!amount || !description || !selectedCat || !day) {
      notification.error({
        message: "Validation Error",
        description: "Please fill in all the required fields.",
      });
      return;
    }

    const expenseData = {
      amount,
      description,
      category: selectedCat,
      date: day,
    };

    try {
 
      const response = await fetch("http://localhost:8080/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Failed to save expense");
      }
      notification.success({
        message: "Success!",
        description: "Expense has been successfully saved.",
      });
      setAmount("");
      setDescription("");
      setSelectedCat(null);
      setday(null);
      
    } catch (error) { 
   
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <h3>Expense Form</h3>

      <Row gutter={16}>
        <Col lg={12} xs={24}>
          <Text strong>Amount</Text>
          <InputField
            type="number"
            placeholder="0.00 USD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Col>
        <Col lg={12} xs={24}>
          <Text strong>Description</Text>
          <InputField
            placeholder="Bought a new iPhone"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Row>

      <Text strong>Category</Text>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col lg={24} xs={24}>
          {catLoading ? (
            <Spin />
          ) : (
            <Selected
              options={categoryOptions}
              value={selectedCat}
              onChange={(val) => setSelectedCat(val)}
              placeholder="Select category"
            />
          )}
        </Col>
      </Row>

      <Row justify="space-between" align="middle">
        <Col lg={18} xs={24}>
          <Text strong>Day</Text>
          {dayLoading ? (
            <Spin />
          ) : (
            <Selected
              options={dayOption}
              value={day}
              onChange={(val) => setday(val)}
              placeholder="Select a day"
            />
          )}
        </Col>
        <Col lg={6} xs={24} style={{ marginTop: "20px" }}>
          <Buttons onClick={handleCalendarClick}>    <CalendarOutlined /></Buttons>
        </Col>
      </Row>

      {isCalendarOpen && (
        <Modal
          title="Select a Date"
          open={isCalendarOpen}
          onCancel={() => setIsCalendarOpen(false)}
          footer={null}
        >
          <Calendar123 onSelect={handleDateSelect} />
        </Modal>
      )}

      <Row justify="end" style={{ marginTop: "20px" }}>
        <Col>
          <Buttons type="primary" onClick={handleSave}>
            Save
          </Buttons>
        </Col>
      </Row>
    </>
  );
}