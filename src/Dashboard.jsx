import { ConfigProvider } from "antd";
import DashboardContent from "./Content/Dashboardconten";
export default function Dashboard() {
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
      }} >
      <DashboardContent />

    </ConfigProvider>
  );
}