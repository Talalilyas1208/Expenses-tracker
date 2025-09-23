import { Row, Col, Typography, Spin, Select,Input, Button } from "antd";
import useFetch from "./Hooks/hookfetchdata";
import { useMemo, useState } from "react";
import Buttons from "./Compenets/Buttons";
import { SaveOutlined,DollarCircleOutlined ,ArrowRightOutlined} from "@ant-design/icons";
const { Text } = Typography;

const Transfer = () => {
  const { data: transferData, loading: transferLoading } = useFetch(
    "http://localhost:8080/transfer"
  );
  const { data: amountData, loading: amountLoading } = useFetch(
    "http://localhost:8080/amount"
  );
const [inputAmount,setInputAmount] =useState()
const [sendamount , setsendamount] =useState()
  const transferOptions =
    transferData?.map((cat) => ({
      value: cat.Bank,
      label: cat.Bank,
    })) || [];
  const handleAmountChange = (e) => {
    const val = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setInputAmount(val);
  }; const handleAmountChanges = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setsendamount(value);
  };
  const amountOptions = useMemo(
    () =>
      (amountData ?? []).map((cat) => ({
        label: cat.catg,
        value: cat.catg,
      })),
    [amountData]
  );

  return (
    <>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col lg={11} xs={24}>
          <Text strong>From</Text>
          {transferLoading ? (
            <Spin />
          ) : (
            <Select
              options={transferOptions}
              placeholder="Select bank"
              style={{ width: "100%" }}
            />
          )}
        </Col>
        <Row>
        <Col lg={1} xs={4} >
          <ArrowRightOutlined />
        
        </Col>
    </Row>
       <Col lg={11} xs={24} >
          <Text strong>to</Text>
          {transferLoading ? (
            <Spin />
          ) : (
            <Select
              options={transferOptions}
              placeholder="Select bank"
              style={{ width: "100%" }}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
       
         <Col lg={11} xs={24} >
      
            <Text strong>Amount</Text>
             <Input
              size="large"
              type="text"
              placeholder="Enter amount"
              value={inputAmount}
              onChange={handleAmountChange}
              prefix={<DollarCircleOutlined style={{ color: "#52c41a" }} />}
            />
         
        </Col>
         <Col lg={11} xs={24} offset={1}>
      
            <Text strong>Amount</Text>
            <Input
              size="large"
              type="text"
              placeholder="Enter amount"
              value={sendamount}
              onChange={handleAmountChanges}
              prefix={<DollarCircleOutlined style={{ color: "#52c41a" }} />}
            />
        </Col>
      </Row>
      <Row>


         <Col lg={23} xs={24} >
      
            <Text strong>Amount</Text>
            <Input
              size="large"
              placeholder="Just saved some money"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
            />
         
        </Col>
  
      </Row>
      <Row justify={"center"} style={{margin:"10px"}}>
       <Col>
      <Buttons
        icon={<SaveOutlined />}
        text= {"Save"}
      size= "large"
        />
      </Col>
      </Row>
    </>
  );
};

export default Transfer;
