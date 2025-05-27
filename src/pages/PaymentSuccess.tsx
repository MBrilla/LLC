import React from 'react';
import { Result, Button, Descriptions, List, Typography, Card, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { businessInfo, owners, selectedAddOns, totalAmount, userEmail } = location.state || {};

  return (
    <Card style={{ maxWidth: 600, margin: '40px auto' }}>
      <Result
        status="success"
        title="Payment Successful!"
        subTitle="Thank you for your order. We have received your payment and your business formation request is being processed."
        extra={[
          <Button type="primary" key="home" onClick={() => navigate('/business-formation')}>
            Back to Home
          </Button>,
          <Button key="contact" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>,
        ]}
      />
      <Divider />
      <Title level={4}>Order Details</Title>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Business Type">{businessInfo?.businessType}</Descriptions.Item>
        <Descriptions.Item label="Business Name">{businessInfo?.businessName}</Descriptions.Item>
        <Descriptions.Item label="Business Address">{businessInfo?.businessAddress}</Descriptions.Item>
        <Descriptions.Item label="Contact Email">{userEmail}</Descriptions.Item>
        <Descriptions.Item label="Owners">
          <List
            size="small"
            dataSource={owners || []}
            renderItem={(owner: any, idx) => (
              <List.Item>
                <Text strong>Owner {idx + 1}:</Text> {owner.name} ({owner.email}, {owner.phone})
              </List.Item>
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Add-Ons">
          <List
            size="small"
            dataSource={selectedAddOns || []}
            renderItem={(addonKey: string) => <List.Item>{addonKey}</List.Item>}
          />
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Total Paid</Text>}>
          <Text strong>${totalAmount?.toFixed(2)}</Text>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Text type="secondary">A confirmation and invoice will be sent to your email: <b>{userEmail}</b></Text>
    </Card>
  );
};

export default PaymentSuccess; 