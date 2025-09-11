import React, { useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
  };

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Reports',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Upload Data',
    },
    {
      key: '4',
      icon: <ShopOutlined />,
      label: 'Shop',
    },
  ];

  return (
    <Sider
      style={{ ...siderStyle, background: '#000000' }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
    >
      {!collapsed && (
        <div
          className="flex items-center justify-center h-16 text-white text-2xl font-semibold"
          style={{ height: '64px', margin: '16px' }}
        >
          <Typography.Title level={5} style={{ color: 'white' }}>
            Expense-Tracker
          </Typography.Title>
        </div>
      )}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{ background: '#000000' }}
      />
    </Sider>
  );
};

export default Sidebar;
