import React, { useEffect } from 'react';
import { Result, Button, Descriptions, List, Typography, Card, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../assets/Logo2.png';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { businessInfo, owners, selectedAddOns, totalAmount, userEmail } = location.state || {};

  const formatDate = (date: any) => {
    if (!date) return '';
    try {
      console.log('Date value:', date, 'Type:', typeof date);
      
      // If it's already a formatted string, return it
      if (typeof date === 'string') {
        return date;
      }

      // If it's a dayjs object or has dayjs properties
      if (date && (typeof date.format === 'function' || date.$isDayjsObject || date.$d)) {
        // Create a new dayjs instance from the date value
        const dayjsDate = dayjs(date.$d || date);
        return dayjsDate.format('MMMM D, YYYY');
      }

      // If it's a Date object
      if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      // If it's a timestamp
      if (typeof date === 'number') {
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      // If we get here, we don't know how to format this date
      console.warn('Unknown date format:', date);
      return '';
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

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

    // Add fields to PDF based on businessInfo, only if they have a value
    if (businessInfo?.businessType) { doc.text(`Business Type: ${businessInfo.businessType}`, 10, y); y += 10; }
    if (businessInfo?.underlyingBusinessType) { doc.text(`Underlying Business Type: ${businessInfo.underlyingBusinessType}`, 10, y); y += 10; }
    if (businessInfo?.businessName) { doc.text(`DBA Name: ${businessInfo.businessName}`, 10, y); y += 10; }
    if (businessInfo?.businessAddress) { doc.text(`Business Address: ${businessInfo.businessAddress}`, 10, y); y += 10; }
    if (businessInfo?.businessPurpose) { 
      let purposeText = `Business Purpose: ${businessInfo.businessPurpose}`;
      if (businessInfo.businessPurposeOther) {
        purposeText += ` - ${businessInfo.businessPurposeOther}`;
      }
      doc.text(purposeText, 10, y); y += 10; 
    }
    if (businessInfo?.legalBusinessName) { doc.text(`Legal Business Name: ${businessInfo.legalBusinessName}`, 10, y); y += 10; }
    if (businessInfo?.businessStartDate) { doc.text(`Business Start Date: ${formatDate(businessInfo.businessStartDate)}`, 10, y); y += 10; }
    
    // Add business type specific fields for PDF
    if (businessInfo?.underlyingBusinessType === 'Individual/Sole Proprietorship' && businessInfo?.soleProprietorName) {
      doc.text(`Sole Proprietor Name: ${businessInfo.soleProprietorName}`, 10, y); y += 10;
    }
     if (businessInfo?.underlyingBusinessType === 'Limited Liability Company (LLC)' && businessInfo?.registeredAgentName) {
      doc.text(`Registered Agent Name: ${businessInfo.registeredAgentName}`, 10, y); y += 10;
    }
     if (businessInfo?.underlyingBusinessType === 'Limited Liability Company (LLC)' && businessInfo?.registeredAgentAddress) {
      doc.text(`Registered Agent Address: ${businessInfo.registeredAgentAddress}`, 10, y); y += 10;
    }

    if (userEmail) { doc.text(`Contact Email: ${userEmail}`, 10, y); y += 10; }
    
    if (owners && owners.length > 0) {
      doc.text('Owners:', 10, y); y += 5;
      (owners || []).forEach((owner: any, idx: number) => {
        if (owner.name) doc.text(`Owner ${idx + 1} Name: ${owner.name}`, 15, y); else return;
        y += 5;
        if (owner.email) doc.text(`Owner ${idx + 1} Email: ${owner.email}`, 15, y); else return;
        y += 5;
        if (owner.phone) doc.text(`Owner ${idx + 1} Phone: ${owner.phone}`, 15, y); else return;
        y += 5;
      });
    }

    if (selectedAddOns && selectedAddOns.length > 0) {
      y += 10;
      doc.text('Add-Ons:', 10, y); y += 5;
      (selectedAddOns || []).forEach((addonKey: string) => {
         const addOn = ADD_ONS.find(a => a.key === addonKey);
         if(addOn) {
            doc.text(`- ${addOn.name} ($${addOn.price.toFixed(2)})`, 15, y); y += 5;
         }
      });
    }
    
    y += 10; // Add extra space before total
    if (totalAmount !== undefined && totalAmount !== null) {
        doc.text(`Total Paid: $${totalAmount.toFixed(2)}`, 10, y); y += 10;
    }
    
    doc.save('LLC671-Invoice.pdf');
  };

  useEffect(() => {
    // Only auto-download invoice if businessInfo exists
    if (businessInfo) {
       handleDownloadInvoice();
    }
    // eslint-disable-next-line
  }, [businessInfo]); // Depend on businessInfo

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
          // Only show contact button if user email is available
          userEmail && (
            <Button key="contact" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          ),
        ]}
      />
      <Divider />
      <Title level={4}>Order Details</Title>
      <Descriptions bordered column={1}>
        {businessInfo?.businessType && (<Descriptions.Item label="Business Type">{businessInfo.businessType}</Descriptions.Item>)}
        {businessInfo?.underlyingBusinessType && (<Descriptions.Item label="Underlying Business Type">{businessInfo.underlyingBusinessType}</Descriptions.Item>)}
        {businessInfo?.businessName && (<Descriptions.Item label="DBA Name">{businessInfo.businessName}</Descriptions.Item>)}
        {businessInfo?.businessAddress && (<Descriptions.Item label="Business Address">{businessInfo.businessAddress}</Descriptions.Item>)}
        {businessInfo?.businessPurpose && (
          <Descriptions.Item label="Business Purpose">
            {businessInfo.businessPurpose}
            {businessInfo.businessPurposeOther && ` - ${businessInfo.businessPurposeOther}`}
          </Descriptions.Item>
        )}
        {businessInfo?.legalBusinessName && (<Descriptions.Item label="Legal Business Name">{businessInfo.legalBusinessName}</Descriptions.Item>)}
        {businessInfo?.businessStartDate && (<Descriptions.Item label="Business Start Date">{formatDate(businessInfo.businessStartDate)}</Descriptions.Item>)}
        
        {/* Render business type specific fields in summary */}
        {businessInfo?.underlyingBusinessType === 'Individual/Sole Proprietorship' && businessInfo?.soleProprietorName && (
           <Descriptions.Item label="Sole Proprietor Name">{businessInfo.soleProprietorName}</Descriptions.Item>
        )}
        {businessInfo?.underlyingBusinessType === 'Limited Liability Company (LLC)' && businessInfo?.registeredAgentName && (
           <Descriptions.Item label="Registered Agent Name">{businessInfo.registeredAgentName}</Descriptions.Item>
        )}
        {businessInfo?.underlyingBusinessType === 'Limited Liability Company (LLC)' && businessInfo?.registeredAgentAddress && (
           <Descriptions.Item label="Registered Agent Address">{businessInfo.registeredAgentAddress}</Descriptions.Item>
        )}

        {userEmail && (<Descriptions.Item label="Contact Email">{userEmail}</Descriptions.Item>)}

        {(owners || []).length > 0 && (
           <Descriptions.Item label="Owners">
            <List
              size="small"
              dataSource={owners || []}
              renderItem={(owner: any, idx) => (
                // Only render if owner name exists
                owner.name && (
                  <List.Item>
                    <Text strong>Owner {idx + 1}:</Text> {owner.name}
                    {owner.email && ` (${owner.email}`}
                    {owner.phone && `${owner.email ? ', ' : '('}${owner.phone})`}
                  </List.Item>
                )
              )}
            />
          </Descriptions.Item>
        )}
        
        {(selectedAddOns || []).length > 0 && (
           <Descriptions.Item label="Add-Ons">
             <List
               size="small"
               dataSource={selectedAddOns || []}
               renderItem={(addonKey: string) => {
                  const addOn = ADD_ONS.find(a => a.key === addonKey);
                  // Only render if add-on is found
                  return addOn ? <List.Item>{addOn.name} (${addOn.price.toFixed(2)})</List.Item> : null;
               }}
             />
           </Descriptions.Item>
        )}
        
        {totalAmount !== undefined && totalAmount !== null && (
            <Descriptions.Item label={<Text strong>Total Paid</Text>}>
              <Text strong>${totalAmount.toFixed(2)}</Text>
            </Descriptions.Item>
        )}
      </Descriptions>
      <Divider />
      {businessInfo && (
        <Button type="primary" onClick={async () => await handleDownloadInvoice()} style={{ marginTop: 16 }}>
          Download Invoice
        </Button>
      )}
      <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
        You can download your invoice above. If you need another copy, please contact us.
      </Text>
    </Card>
  );
};

// Assume ADD_ONS is defined elsewhere or import it
const ADD_ONS = [
  { key: 'operatingAgreement', name: 'Operating Agreement (LLC)', price: 50, details: 'Custom auto-generated document', businessTypes: ['LLC'] },
  { key: 'einApplication', name: 'EIN Application (IRS)', price: 50, details: 'IRS Form SS-4 filing' },
  { key: 'rushProcessing', name: 'Internal Rush Processing', price: 50, details: 'Next-business-day handling' },
  { key: 'printedCopies', name: 'Printed & Mailed Copies', price: 15, details: 'Hard copy with postage' },
];

export default PaymentSuccess; 