import React from 'react';
import { Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Row, Col, ConfigProvider } from "antd";
import { useNavigate } from 'react-router-dom';

export  default function Header(){
 
 const { Title, Text } = Typography; 

 function handleClick() {
    navigate("/priceupdate");
  }
  function click() {
    navigate("/previoustransaction");
  }
    const navigate = useNavigate();
 
 
 

return (


<Row> 
  <Col>
 <Space className="site-page-header" style={{ alignItems: 'center' }}>
    <LeftOutlined onClick={() => null} />
    <Space direction="vertical">
      <Title level={4} style={{ margin: 0 }}>Title</Title>
      <Text style={{ margin: 0 }}>This is a subtitle</Text>
    </Space>
      </Space>
    </Col>
    <Col >
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
)
}