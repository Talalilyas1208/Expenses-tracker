// App.js
import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Button23 from "./Button23";
import DashboardModal from "./DashboardModal";
import { EntriesProvider } from "./EntriesContext";

const { Header, Content } = Layout;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <EntriesProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header
            style={{
              background: "#0a0a0aff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="logo" />
            <Button23 onClick={handleButtonClick} />
          </Header>

          <Content>
            <div
              style={{
                padding: 24,
                background: "#0f0f0fff",
                minHeight: "100%",
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>

        <DashboardModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Layout>
    </EntriesProvider>
  );
}
