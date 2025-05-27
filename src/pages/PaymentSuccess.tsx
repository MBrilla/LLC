import React, { useEffect } from 'react';
import { Result, Button, Descriptions, List, Typography, Card, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../assets/Logo2.png';

const { Title, Text } = Typography;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { businessInfo, owners, selectedAddOns, totalAmount, userEmail } = location.state || {};

  const handleDownloadInvoice = async () => {
    const doc = new jsPDF();
    // Add logo with correct size
    const img = new window.Image();
    img.src = logo;
    await new Promise(resolve => { img.onload = resolve; });
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    // 200px ≈ 53mm (jsPDF default units are mm)
    const logoHeight = 53;
    const logoWidth = logoHeight * aspectRatio;
    doc.addImage(img, 'PNG', 10, 8, logoWidth, logoHeight);
    doc.setFontSize(16);
    doc.text('LLC 671 - Invoice', 10 + logoWidth + 5, 20); // Place to the right of the logo
    doc.setFontSize(12);
    let y = 8 + logoHeight + 10;
    doc.text(`Business Type: ${businessInfo?.businessType}`, 10, y);
    y += 10;
    doc.text(`Business Name: ${businessInfo?.businessName}`, 10, y);
    y += 10;
    doc.text(`Business Address: ${businessInfo?.businessAddress}`, 10, y);
    y += 10;
    doc.text(`Contact Email: ${userEmail}`, 10, y);
    y += 10;
    doc.text('Owners:', 10, y);
    (owners || []).forEach((owner: any, idx: number) => {
      y += 10;
      doc.text(`Owner ${idx + 1}: ${owner.name} (${owner.email}, ${owner.phone})`, 15, y);
    });
    y += 15;
    doc.text('Add-Ons:', 10, y);
    (selectedAddOns || []).forEach((addonKey: string) => {
      y += 10;
      doc.text(`- ${addonKey}`, 15, y);
    });
    y += 15;
    doc.text(`Total Paid: $${totalAmount?.toFixed(2)}`, 10, y);
    doc.save('LLC671-Invoice.pdf');
  };

  useEffect(() => {
    const generateAndDownload = async () => {
      await handleDownloadInvoice();
    };
    generateAndDownload();
    // eslint-disable-next-line
  }, []);

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
      <Button type="primary" onClick={async () => await handleDownloadInvoice()} style={{ marginTop: 16 }}>
        Download Invoice
      </Button>
      <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
        You can download your invoice above. If you need another copy, please contact us.
      </Text>
    </Card>
  );
};

export default PaymentSuccess; 