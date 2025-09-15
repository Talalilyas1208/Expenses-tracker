// Button23.js
import { Row, Button, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export default function Button23({ onClick }) {
  return (
    <Row style={{ marginTop: 20, marginBottom: 20 }}>
      <Col span={24}>
        <Button
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={onClick}
          style={{ width: "100%" }}
        >
          Add Transaction
        </Button>
      </Col>
    </Row>
  );
}