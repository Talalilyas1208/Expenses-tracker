import { Card, Row, Col, Statistic, List, Typography, Space } from "antd";
import {
  CheckOutlined,
  DollarCircleOutlined,
  WalletOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useEntries } from "../EntriesContext";
import useFetch from "../Hooks/hookfetchdata";

const { Text } = Typography;

function Dashboardcontent() {
  const { entries, transfers } = useEntries();
  console.log(entries, "data");

  const totalIncome = entries.reduce((sum, entry) => sum + entry.amount, 0);

  const recentEntries = entries.slice(-5).reverse();
  const recentTransfers = transfers.slice(-5).reverse();

  const { data } = useFetch("http://localhost:8080/Subs");
  const categoryOptions = data ?? [];

  return (
    <div style={{ padding: "20px" }}>
      <Text style={{ fontSize: "24px", marginBottom: "20px" }}>Dashboard</Text>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable>
            <Statistic
              title={<Text>💳 Wallet Transactions</Text>}
              value={totalIncome}
              precision={2}
              valueStyle={{ color: "#52c41a" }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable>
            <Statistic
              title={<Text>Total Transaction</Text>}
              value={entries.length}
              valueStyle={{ color: "#1890ff" }}
              prefix={<WalletOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable>
            <Statistic
              title={<Text>Transfer History</Text>}
              value={transfers.length}
              valueStyle={{ color: "#fa8c16" }}
              prefix={<SwapOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent Transactions */}
        <Col lg={8} sm={24} style={{ marginTop: "12px" }}>
          <Card title={<Text>Recent Transaction</Text>}>
            {entries.length === 0 ? (
              <Text type="secondary">
                No income entries yet. Click "Add Transaction" to start!
              </Text>
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
                            <Text>{item.category}</Text>
                            <Text type="secondary">•</Text>
                            <Text>
                              {item.date} {item.time}
                            </Text>
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

        {/* Recent Transfers */}
        <Col lg={8} sm={24} style={{ marginTop: "12px" }}>
          <Card title={<Text>Recent Transfers</Text>}>
            {transfers.length === 0 ? (
              <Text type="secondary">No transfers yet.</Text>
            ) : (
              <>
                <List
                  dataSource={recentTransfers}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Space>
                            <Text strong style={{ color: "#fa8c16" }}>
                              ${item. inputAmount.toFixed(2)}
                            </Text>
                            <Text>- {item.description}</Text>
                          </Space>
                        }
                        description={
                          <Space>
                            <Text>{item.from} ➝ {item.to}</Text>
                            <Text type="secondary">•</Text>
                            <Text>
                              {item.date} {item.time}
                            </Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />

                {transfers.length > 5 && (
                  <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Text type="secondary">
                      Showing last 5 of {transfers.length} transfers
                    </Text>
                  </div>
                )}
              </>
            )}
          </Card>
        </Col>

        {/* Subscriptions / Your Money */}
        <Col lg={8}>
          <Card title={<Text>Your money</Text>} style={{ marginTop: "10px" }}>
            <List
              dataSource={categoryOptions}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong>
                          <CheckOutlined /> {item.fee}
                        </Text>
                        <Text>{item.value}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboardcontent;
