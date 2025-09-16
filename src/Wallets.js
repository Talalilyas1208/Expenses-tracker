import useFetch from "./Hooks/hookfetchdata";
import { Row, Col, Table, Spin } from "antd";

export default function Wallets() {
  const { data, loading } = useFetch("http://localhost:8080/wallets");

  const columns = [
    {
      title: "Transaction",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Amount",
      dataIndex: "transaction_amount",
      key: "amount",
      render: (value) => `$${value}`,
    },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!data) {
    return <div>Error loading wallets</div>;
  }

  return (
    <Row>
      <Col lg={10}>
        <Table
          dataSource={data}
          columns={columns}
        
        />
      </Col>
    </Row>
  );
}
