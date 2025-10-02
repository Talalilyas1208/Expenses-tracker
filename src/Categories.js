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
      <Row>
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
                Limits by categories
              </Text>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={handleAddClick}
                style={{ color: "#52c41a" }}
              />
            </Space>

        
            <div style={{ marginTop: 16 }}>
              {Object.keys(LIMITS).map((cat) => {
                const spent = categoryTotals[cat] || 0;
                const limit = LIMITS[cat];
                const percent = Math.min((spent / limit) * 100, 100);

                return (
                  <div key={cat} style={{ marginBottom: 12 }}>
                    <Text style={{ color: "white" }}>
                      {cat}: {spent}/{limit}
                    </Text>
                    <Progress
                      percent={percent}
                      status={spent >= limit ? "exception" : "active"}
                      strokeColor={spent >= limit ? "red" : "#52c41a"}
                      trailColor="#434343"
                      showInfo={false}
                    />
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
