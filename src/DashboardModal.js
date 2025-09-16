
import React, { useState } from "react";
import { Modal, Segmented, ConfigProvider, theme } from "antd";
import Expense from "./Expense";
import Income from "./Income";
import Transfer from "./Transfer";

export default function DashboardModal({ open, onClose, onSave }) {
  const [currentView, setCurrentView] = useState("Expense");

  const contentMap = {
    Expense: <Expense />,
    Income: <Income onSave={onSave} />,
    Transfer: <Transfer />,
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Modal
        title={
          <Segmented
            size="middle"
            options={["Expense", "Income", "Transfer"]}
            value={currentView}
            onChange={(val) => setCurrentView(val)}
          />
        }
        open={open}
        onCancel={onClose}
        footer={null}
        width={500}
      >
        {contentMap[currentView]}
      </Modal>
    </ConfigProvider>
  );
}
