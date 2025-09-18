import { useState } from "react";
import { Card, Segmented, ConfigProvider, theme, Row, Col } from "antd";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";

const SegmentedCard = () => {
  const [currentView, setCurrentView] = useState("Expense");

  const contentMap = {
    Expense: <Expense />,
    Income: <Income />,
    transfer: <Transfer />,
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Row justify={"center"}>
        <Col lg={5} xl={7}>
          <Card
            title={
              <Segmented
                options={["Expense", "Income", "transfer"]}
                value={currentView}
                onChange={(value) => setCurrentView(value)}
              />
            }
            style={{ width: "100%", maxWidth: 600, margin: "20px auto" }}
          >
            <div style={{ marginTop: 16 }}>{contentMap[currentView]}</div>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default SegmentedCard;
