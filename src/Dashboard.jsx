
import { Button, Card, Row, Col, Statistic, List, Typography, Space } from "antd";
import { DollarCircleOutlined, WalletOutlined } from "@ant-design/icons";

import { useOutletContext } from "react-router-dom"; // Import the hook

const { Text, Title } = Typography;

export default function Dashboard() {
  // Use the hook to get the entries from the parent (App) component
  const { entries } = useOutletContext();

  // Calculate total income
  const totalIncome = entries.reduce((sum, entry) => sum + entry.amount, 0);

  // Get recent entries (last 5)
  const recentEntries = entries.slice(-5).reverse();

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Income Statistics Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable>
            <Statistic
              title="Total Income"
              value={totalIncome}
              precision={2}
              valueStyle={{ color: "#52c41a" }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>

        {/* Number of Transactions Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable>
            <Statistic
              title="Total Transactions"
              value={entries.length}
              valueStyle={{ color: "#1890ff" }}
              prefix={<WalletOutlined />}
            />
          </Card>
        </Col>

        {/* Average Income Card */}
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable>
            <Statistic
              title="Average Income"
              value={entries.length > 0 ? totalIncome / entries.length : 0}
              precision={2}
              valueStyle={{ color: "#722ed1" }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Recent Income Entries">
            {entries.length === 0 ? (
              <Text type="secondary">No income entries yet. Click "Add Transaction" to start!</Text>
            ) : (
              <>
                <List
                  dataSource={recentEntries}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Space>
                            <Text strong style={{ color: "#52c41a" }}>
                              ${item.amount.toFixed(2)}
                            </Text>
                            <Text>- {item.description}</Text>
                          </Space>
                        }
                        description={
                          <Space>
                            <Text type="secondary">{item.category}</Text>
                            <Text type="secondary">•</Text>
                            <Text type="secondary">{item.date} {item.time}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
                {entries.length > 5 && (
                  <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Text type="secondary">
                      Showing last 5 of {entries.length} entries
                    </Text>
                  </div>
                )}
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}