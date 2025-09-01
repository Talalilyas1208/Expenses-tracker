import { Button, Flex, Tooltip,Row,Col,ConfigProvider } from "antd";
import Priceupdate from "./Priceupdate";

import { useNavigate } from "react-router-dom";
export default function Button1() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/priceupdate");
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
    <Button type="primary" onClick={handleClick}    justify="end"style={{marginTop:"4px"}}>
     Add wallet
    </Button>
    </Col>
    </Row>
    </ConfigProvider>
  );
}
