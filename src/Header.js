import React, { useState } from "react";
import { Button, Row, Col ,ConfigProvider,theme} from "antd";
import DashboardModal from "./DashboardModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Row justify="end" style={{ padding: "10px" }}>
        <Col>   

          <Button  color="default" type="default"  variant="solid" onClick={() => setIsModalOpen(true)}>
            Add Transaction
          </Button>
          
        </Col>
      </Row>

      <DashboardModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
