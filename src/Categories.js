import { Row, Col, Card, Typography, ConfigProvider, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function () {
  const { Text } = Typography;

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
        <Col lg={5} xs={24} s={22}>
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
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
