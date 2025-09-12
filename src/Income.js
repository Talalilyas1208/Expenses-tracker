import React, { useState, useEffect } from "react";
import { 
  Row, 
  Col, 
  Typography, 
  Button, 
  Input, 
  Select, 
  notification, 
  Card,
  Space,
  Divider,
  Tag,
  List,
  Statistic
} from "antd";
import { 
  DollarCircleOutlined, 
  SaveOutlined, 
  PlusOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';

const { Text, Title } = Typography;

export default function Income() {
  // input and totals
  const [inputAmount, setInputAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState([]);

  // other fields
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [day, setDay] = useState(null);

  // Mock data for testing
  const categoryOptions = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
    { value: "freelance", label: "Freelance" },
    { value: "investment", label: "Investment" },
    { value: "other", label: "Other" }
  ];

  // handle amount change with better debugging
  const handleAmountChange = (e) => {
    const val = e.target.value;
    console.log("Raw input value:", val);
    
    // Regex to allow only numbers and a single decimal point
    const sanitizedVal = val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    console.log("Sanitized value:", sanitizedVal);
    
    setInputAmount(sanitizedVal);
  };

  const handleSaving = () => {
    console.log("Save button clicked!");
    console.log("Current inputAmount:", inputAmount);
    
    // convert to number
    const value = parseFloat(String(inputAmount).trim());
    console.log("Parsed value:", value);
    
    if (isNaN(value) || value <= 0) {
      notification.error({ 
        message: "Invalid amount", 
        description: "Please enter a valid positive number.",
        placement: "topRight"
      });
      return;
    }

    // safely update total and entries
    setTotal((prev) => {
      const updated = prev + value;
      console.log("Updated total (inside updater):", updated);
      return updated;
    });

    setEntries((prev) => {
      const newEntry = {
        id: Date.now(),
        amount: value,
        description: description || "No description",
        category: selectedCat || "Uncategorized",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      console.log("Adding new entry:", newEntry);
      return [...prev, newEntry];
    });
    setInputAmount("");
    setDescription("");
    setSelectedCat(null);
    setDay(null);

    notification.success({ 
      message: "Entry Saved Successfully!", 
      description: `Added ${value.toFixed(2)} to your income`,
      placement: "topRight",
      duration: 3
    });
  };
  useEffect(() => {
    console.log("Total changed (useEffect):", total);
  }, [total]);
  useEffect(() => {
    console.log("Entries changed:", entries);
  }, [entries]);
  return (
    <div>
      <Title level={4} style={{ marginBottom: 24, color: '#1890ff' }}>
        <DollarCircleOutlined /> Income Tracker
      </Title>

      <Card title="Add New Income Entry" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col lg={12} xs={24}>
              <Text strong>Amount *</Text>
              <Input
                size="large"
                type="text"
                placeholder="Enter amount (e.g., 1000.50)"
                value={inputAmount}
                onChange={handleAmountChange}
                prefix={<DollarCircleOutlined style={{ color: '#52c41a' }} />}
                style={{ marginTop: 4 }}
              />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Current: "{inputAmount}"
              </Text>
            </Col>

            <Col lg={12} xs={24}>
              <Text strong>Description</Text>
              <Input
                size="large"
                placeholder="e.g., Monthly Salary, Freelance Project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginTop: 4 }}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12} xs={24}>
              <Text strong>Category</Text>
              <Select
                size="large"
                options={categoryOptions}
                value={selectedCat}
                onChange={(val) => setSelectedCat(val)}
                placeholder="Select income category"
                style={{ width: '100%', marginTop: 4 }}
                allowClear
              />
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: 16 }}>
            <Button 
              type="primary" 
              size="large"
              icon={<SaveOutlined />}
              onClick={handleSaving}
              disabled={!inputAmount || inputAmount === ""}
            >
              Save Entry
            </Button>
          </Row>
        </Space>
      </Card>

      <Card>
        <Row gutter={16}>
          <Col lg={12} xs={24}>
            <Statistic
              title="Total Income"
              value={total}
              precision={2}
              valueStyle={{ color: '#52c41a', fontSize: '32px' }}
              prefix={<DollarCircleOutlined />}
            />
          </Col>
          <Col lg={12} xs={24}>
            <Statistic
              title="Number of Entries"
              value={entries.length}
              valueStyle={{ color: '#1890ff' }}
              prefix={<PlusOutlined />}
            />
          </Col>
        </Row>

        {entries.length > 0 && (
          <>
            <Divider orientation="left">Recent Entries</Divider>
            <List
              size="small"
              dataSource={entries.slice().reverse()}
              renderItem={(entry, index) => (
                <List.Item
                  key={entry.id}
                  actions={[
                    <Tag color="green">${entry.amount.toFixed(2)}</Tag>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong>{entry.description}</Text>
                        <Tag color="blue">{entry.category}</Tag>
                      </Space>
                    }
                    description={`Added on ${entry.date} at ${entry.time}`}
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </Card>

      {/* Debug Panel */}
      <Card 
        size="small" 
        title={<><InfoCircleOutlined /> Debug Information</>} 
        style={{ marginTop: 16 }}
        type="inner"
      >
        <Space direction="vertical" size="small">
          <Text code>Input Amount: "{inputAmount}"</Text>
          <Text code>Entries Count: {entries.length}</Text>
          <Text code>Current Total: ${total.toFixed(2)}</Text>
          <Text code>Selected Category: {selectedCat || 'None'}</Text>
          <Text code>Description: {description || 'Empty'}</Text>
        </Space>
      </Card>
    </div>
  );
}