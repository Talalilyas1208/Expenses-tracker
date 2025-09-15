// AMount.jsx
import React from "react";
import { Card, List, Typography } from "antd";

const { Text } = Typography;

export default function Amount({ entries = [] }) {
  return (
    <Card title="All Income Entries">
      {entries.length === 0 ? (
        <Text type="secondary">No entries yet</Text>
      ) : (
        <List
          dataSource={entries}
          renderItem={(item) => (
            <List.Item>
              <Text strong>${Number(item.amount).toFixed(2)}</Text> - {item.description} ({item.category})
              <br />
              <Text type="secondary">
                {item.date} {item.time}
              </Text>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}
