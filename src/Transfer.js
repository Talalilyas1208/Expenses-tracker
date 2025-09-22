import { Row, Col, Typography, Spin, Select,Input } from "antd";
import useFetch from "./Hooks/hookfetchdata";
import { useMemo } from "react";

const { Text } = Typography;

const Transfer = () => {
  const { data: transferData, loading: transferLoading } = useFetch(
    "http://localhost:8080/transfer"
  );
  const { data: amountData, loading: amountLoading } = useFetch(
    "http://localhost:8080/amount"
  );

  const transferOptions =
    transferData?.map((cat) => ({
      value: cat.Bank,
      label: cat.Bank,
    })) || [];

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
       <Col lg={11} xs={24} offset={1}>
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
                 placeholder="0.00"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
            />
         
        </Col>
         <Col lg={11} xs={24} offset={1}>
      
            <Text strong>Amount</Text>
            <Input
              size="large"
              placeholder="0.00"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
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
    </>
  );
};

export default Transfer;
