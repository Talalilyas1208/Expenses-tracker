import useFetch from "./Hooks/hookfetchdata";
import {
  Row,
  Col,
  Table,
  Spin,
  Card,
  Typography,
  Statistic,
  ConfigProvider,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { ClockCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { useEntries } from "./EntriesContext";

const { Text } = Typography;

export default function Wallets() {
  const { data, loading } = useFetch("http://localhost:8080/wallets");
  const [daysLeft, setDaysLeft] = useState(0);
  const { entries } = useEntries();
  const totalIncome = entries.reduce((sum, entry) => sum + entry.amount, 0);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const currentDay = today.getDate();
    setDaysLeft(lastDay - currentDay);
  }, []);
  const { darkAlgorithm } = theme;
  const columns = [
    {
      title: <Text style={{ color: "#ffffffff" }}>Transaction</Text>,
      dataIndex: "label",
      key: "label",
      render: (value) => <Text style={{ color: "#eee9e9ff" }}>{value}</Text>,
    },
    {
      title: <Text style={{ color: "#bfbfbf" }}>Amount</Text>,
      dataIndex: "transaction_amount",
      key: "amount",
      render: (value) => (
        <Text strong style={{ color: value >= 0 ? "#52c41a" : "#ff4d4f" }}>
          {value >= 0 ? `+$${value}` : `-$${Math.abs(value)}`}
        </Text>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (!data) {
    return <div>Error loading wallets</div>;
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: 24, background: "#0d0d0d" }}>
      <Col lg={14} xs={24}>
        <Card
          title={
            <Text style={{ color: "white", fontSize: 16 }}>
              💳 Wallet Transactions
            </Text>
          }
          bordered={false}
          style={{
            borderRadius: 16,
            background: "#1f1f1f",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          {" "}
          <ConfigProvider
            theme={{
              algorithm: darkAlgorithm,
            }}
          >
            <Table
              dataSource={data.slice(-6)} 
              columns={columns}
              pagination={false}
              rowKey={(record) => record.id}
              style={{ background: "#0f0e0eff" }}
            />

            {data.length > 6 && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Text type="secondary" style={{ color: "#bfbfbf" }}>
                  Showing last 6 of {data.length} transactions
                </Text>
              </div>
            )}
          </ConfigProvider>
        </Card>
      </Col>

      <Col lg={5} xs={24}>
        <Card
          style={{
            borderRadius: 16,
            background: "#1f1f1f",
            color: "white",
            textAlign: "center",
            padding: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
          bordered={false}
        >
          <Statistic
            title={
              <Text style={{ color: "#bfbfbf" }}>Days Left Before Salary</Text>
            }
            value={daysLeft}
            suffix="days"
            valueStyle={{ color: "#40a9ff", fontSize: "2rem" }}
            prefix={<ClockCircleOutlined style={{ color: "#40a9ff" }} />}
          />
        </Card>
      </Col>

      {/* Balance Card */}
      <Col lg={5} xs={24}>
        <Card
          style={{
            borderRadius: 16,
            background: "#1f1f1f",
            color: "white",
            textAlign: "center",
            padding: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
          bordered={false}
        >
          <Statistic
            title={<Text style={{ color: "#bfbfbf" }}>Total Income</Text>}
            value={totalIncome}
            precision={2}
            valueStyle={{ color: "#52c41a", fontSize: "2rem" }}
            prefix={<DollarCircleOutlined style={{ color: "#52c41a" }} />}
          />
        </Card>
      </Col>
    </Row>
  );
}
