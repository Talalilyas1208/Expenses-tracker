import { useEffect, useState } from "react";
import { Row, Col, Flex, Spin, Alert, Table } from "antd";
import useLocalStorage from "./Hooks/Uselocalstorage";
import useFetch from "./Hooks/hookfetchdata";

export default function Previous() {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState([]);
  
const {data,loading,error } = useFetch("http://localhost:8080/expense")

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount (PKR)",
      dataIndex: "expense_amount",
      key: "expense_amount",
    },
  ];

  return (
    <Row style={{ padding: 20 }}>
      <Col span={24}>
        {loading ? (
          <Flex align="center" justify="center" style={{ padding: "50px" }}>
            <Spin tip="Loading expenses..." size="large" />
          </Flex>
        ) : error ? (
          <Alert
            message="Failed to Load Data"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
          />
        )}
      </Col>
    </Row>
  );
}
