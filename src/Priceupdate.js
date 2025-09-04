import React, { useState } from "react";
import { Card, Segmented, Typography, List, ConfigProvider, theme } from "antd";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";
const { Title, Paragraph } = Typography;

const SegmentedCard = () => {
  const [currentView, setCurrentView] = useState("Expense");

  const contentMap = {  
    Expense: <Expense />,
    Income: <Income />,
    transfer: <Transfer />,
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
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
    </ConfigProvider>
  );
};

export default SegmentedCard;
