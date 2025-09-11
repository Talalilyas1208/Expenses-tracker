import React from "react";
import { Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Row, Col, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { Title, Text } = Typography;
  const navigate = useNavigate();

  function handleAddWalletClick() {
    navigate("/priceupdate");
  }

  function handlePreviousTransactionClick() {
    navigate("/previoustransaction");
  }

  return (
    <Row align="middle" justify="space-between">

      

    
      <Col flex="auto">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "black",
            },
          }}
        >
          <Row justify="end">
            <Button
              type="primary"
              onClick={handleAddWalletClick}
              style={{ marginRight: "5px" }}
            >
              Add wallet
            </Button>
            <Button
              type="primary"
              onClick={handlePreviousTransactionClick}
            >
              previous transaction
            </Button>
          </Row>
        </ConfigProvider>
      </Col>
    </Row>
  );
}