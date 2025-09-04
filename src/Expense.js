import { Input, Row, Col, Typography, Spin, Button, Modal } from "antd";
import { useState } from "react";
import InputField from "./Compenets/Input";
import Selected from "./Compenets/Select";
import useFetch from "./Hooks/hookfetchdata";
import Calendar123 from "./Compenets/Calendar123";
import { useNavigate } from "react-router-dom";
import Buttons from "./Compenets/Buttons";
const { Text } = Typography;

export default function Expense() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
 const [state ,setstate]  =useState ()
  // API call for categories
  const { data: catData, loading: catLoading } = useFetch(
    "http://localhost:8080/catg"
  );

  const [day, setday] = useState(null);
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
function handleClick (){

  setstate("this is save")
}

  const handleDateSelect = (date) => {
    setday(date.format("YYYY-MM-DD"));
    setIsCalendarOpen(false);
  };

  return (
    <>
      <h3>Expense Form</h3>

      <Row gutter={16}>
        <Col lg={12} xs={24}>
          <Text strong>Amount</Text>
          <InputField type="number" placeholder="0.00 USD" />
        </Col>
        <Col lg={12} xs={24}>
          <Text strong>Description</Text>
          <InputField placeholder="Bought a new iPhone" />
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

      <Row justify={"space-between"} align="middle">
        <Col lg={18} xs={24}>
          <Text strong>Day</Text>
          {dayLoading ? (
            <Spin />
          ) : (
            <Selected
              options={dayOption}
              value={day}
              onChange={(val) => setday(val)}
              placeholder={"Today"}
            />
          )}
        </Col>
        <Col lg={6} xs={24} style={{ marginTop: "20px" }}>
          <Buttons onClick={handleCalendarClick}>Open Calendar</Buttons>
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




      <Row>

        <Col>
         
          
          <Buttons type="primary" onClick={handleClick}    justify="end"style={{marginTop:"4px" ,marginRight:"5px"}}>
    save
    </Buttons>
        </Col>
      </Row>
    </>
  );
}
