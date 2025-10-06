import {
  Row,
  Col,
  Card,
  Typography,
  ConfigProvider,
  Button,
  Space,
  Progress,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEntries } from "./EntriesContext";

export default function Categories() {
  const { Text } = Typography;
  const { entries } = useEntries();

  const LIMITS = {
    Food: 1000,
    Rent: 2000,
    Transport: 800,
    Entertainment: 1200,
    Apartment: 3000,
  };

  let categoryTotals = {};

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.type === "expense") {
      const cat = entry.category || "Uncategorized";
      const amount = Math.abs(Number(entry.amount) || 0);

      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += amount;
    }
  }

  for (let cat in LIMITS) {
    if (categoryTotals[cat] >= LIMITS[cat]) {
      console.log(`⚠️ Limit reached for ${cat} (total = ${categoryTotals[cat]})`);
    }
  }

  const handleAddClick = () => {
    console.log("Plus button clicked!");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "black",
          colorText: "white",
          colorTextSecondary: "#bfbfbf",
          colorPrimary: "#52c41a",
        },
        components: {
          Card: {
            colorBorderSecondary: "#434343",
            colorBorder: "#434343",
          },
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col lg={8} xs={24}>
          <Card>
            <Space
              align="center"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "rgba(255,255,255,0.6)" }}>
                Limits by Categories
              </Text>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={handleAddClick}
                style={{ color: "#52c41a" }}
              />
            </Space>

            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "20px",
                justifyItems: "center",
              }}
            >
              {Object.keys(LIMITS).map((cat) => {
                const spent = categoryTotals[cat] || 0;
                const limit = LIMITS[cat];
                const percent = Math.min((spent / limit) * 100, 100);

                return (
                  <div
                    key={cat}
                    style={{
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <Progress
                      type="circle"
                      percent={percent}
                      width={90}
                      format={() => (
                        <div style={{ color: "white", fontSize: 12 }}>
                          <div>{cat}</div>
                          <div style={{ fontWeight: "bold" }}>
                            {Math.round(percent)}%
                          </div>
                        </div>
                      )}
                      status={spent >= limit ? "exception" : "active"}
                      strokeColor={spent >= limit ? "red" : "#52c41a"}
                      trailColor="#434343"
                    />
                    <Text
                      style={{
                        display: "block",
                        marginTop: 8,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {spent}/{limit}
                    </Text>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
