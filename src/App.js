// App.js
import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Button23 from "./Button23";
import DashboardModal from "./DashboardModal";
import { EntriesContext } from "./EntriesContext";

const { Header, Content } = Layout;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("incomeEntries");
    return saved ? JSON.parse(saved) : [];
  });

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
    <EntriesContext.Provider value={{ entries, setEntries }}>
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
            <div className="logo" />
            <Button23 onClick={handleButtonClick} />
          </Header>

          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
              <Outlet />
            </div>
          </Content>
        </Layout>

        <DashboardModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </Layout>
    </EntriesContext.Provider>
  );
}
