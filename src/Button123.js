import { Button, Row, Col, ConfigProvider } from "antd";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

export default function Button1() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/priceupdate");
  }
  function click() {
    navigate("/previoustransaction");
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
        },
      }}
    >
      <Row justify="end">
        <Col>

        <Header
         
          />
        </Col>
      </Row>
    </ConfigProvider>
  );
}
