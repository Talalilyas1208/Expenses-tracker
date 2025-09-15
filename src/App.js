// App.js
import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Button23 from "./Button23";
import DashboardModal from "./DashboardModal";

const { Header, Content } = Layout;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState(() => {
    // Load saved entries from localStorage on component mount
    const saved = localStorage.getItem("incomeEntries");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("incomeEntries", JSON.stringify(entries));
  }, [entries]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* You can add a logo or title here on the left */}
          <div className="logo" />
          
          {/* The button on the right side of the header */}
          <Button23 onClick={handleButtonClick} />
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
            {/* This is the key part. We pass the entries data down to the Dashboard
              component through the Outlet context.
            */}
            <Outlet context={{ entries }} />
          </div>
        </Content>
      </Layout>

      <DashboardModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </Layout>
  );
}