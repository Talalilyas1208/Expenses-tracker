import React, { useState } from "react";
import {
  AppstoreOutlined,
  ShopOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import useFetch from "./Hooks/hookfetchdata";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data, loading } = useFetch("http://localhost:8080/sidebar");
  const navigate = useNavigate();

    // const siderStyle = {
    //   overflow: "auto",
    //   height: "100vh",
    //   position: "fixed",
    //   left: 0,
    //   top: 0,
    //   bottom: 0,
    // };

  const iconMap = {
    UserOutlined: <UserOutlined />,
    VideoCameraOutlined: <VideoCameraOutlined />,
    UploadOutlined: <UploadOutlined />,
    ShopOutlined: <ShopOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    WalletOutlined: <WalletOutlined />,
    SettingOutlined: <SettingOutlined />,
  };

  const items =
    data?.map((item) => ({
      key: item.key,
      icon: iconMap[item.icon] || <AppstoreOutlined />,
      label: item.label,
      onClick: () => navigate(item.path), 
    })) || [];

  return (

    <Sider
      // Use this style instead for a dark theme and default behavior
      style={{ background: "#000000" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
    >
      {/* ... rest of your sidebar code ... */}

      {!collapsed && (
        <div
          className="flex items-center justify-center h-16 text-white text-2xl font-semibold"
          style={{ height: "64px", margin: "16px" }}
        >
          <Typography.Title level={5} style={{ color: "white" }}>
            Expense-Tracker
          </Typography.Title>
        </div>
      )}

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ background: "#000000" }}
      />
    </Sider>
  );
};

export default Sidebar;
