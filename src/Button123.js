import { Button, Row, Col, ConfigProvider } from "antd";


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
          <Button
            type="primary"
            onClick={handleClick}
            justify="end"
            style={{ marginTop: "4px", marginRight: "5px" }}
          >
            Add wallet
          </Button>
          <Button
            type="primary"
            onClick={click}
            justify="end"
            style={{ marginTop: "4px" }}
          >
            previous transaction
          </Button>
        </Col>
      </Row>
    </ConfigProvider>
  );
}
