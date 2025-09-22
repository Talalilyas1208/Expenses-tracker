import { Row, Col, Typography, Spin, Select } from "antd";
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
      </Row>
    </>
  );
};

export default Transfer;
