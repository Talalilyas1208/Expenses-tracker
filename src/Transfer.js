import { Input, Row, Col, Typography, Spin, Button, Select } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import useFetch from "./Hooks/hookfetchdata";

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

  const amountOptions =
    amountData?.map((d) => ({
      value: d.select,
      label: d.select,
    })) || [];

  return (
    <>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col lg={11} xs={24}>
          <Text strong>Bank</Text>
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
        <Col lg={12} xs={24} offset={1}>
          <Text strong>Amount</Text>
          {amountLoading ? (
            <Spin />
          ) : (
            <Select
              options={amountOptions}
              placeholder="Select amount"
              style={{ width: "100%" }}
            />
          )}
        </Col>
      </Row>
      
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col lg={6} xs={24}>
          <Text strong>Bank</Text>
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
    
    </>
  );
};

export default Transfer;