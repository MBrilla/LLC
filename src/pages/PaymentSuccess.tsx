import React, { useEffect } from 'react';
import { Result, Button, Descriptions, List, Typography, Card, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../assets/Logo2.png';
import dayjs from 'dayjs';
import { BUSINESS_PRICING } from '../config/paypal';
import '../styles/Form.css';

const { Title, Text } = Typography;

interface BusinessInfo {
  businessName: string;
  businessAddress: string;
  businessType: string;
  businessPurpose: string;
  legalBusinessName: string;
  businessStartDate: Date | null;
  underlyingBusinessType?: string;
  registeredAgentName?: string;
  registeredAgentAddress?: string;
  soleProprietorName?: string;
  businessPurposeOther?: string;
  managementType?: string;
  taxClassification?: string;
  corporateType?: string;
  numberOfShares?: number;
  parValue?: number;
}

interface Owner {
  name: string;
  email: string;
  phone: string;
}

interface AddOn {
  key: string;
  name: string;
  price: number;
  details: string;
  businessTypes?: string[];
}

const ADD_ONS: AddOn[] = [
  {
    key: 'operatingAgreement',
    name: 'Operating Agreement (LLC)',
    price: 50,
    details: 'Custom auto-generated document',
    businessTypes: ['LLC'],
  },
  {
    key: 'einApplication',
    name: 'EIN Application (IRS)',
    price: 50,
    details: 'IRS Form SS-4 filing',
  },
  {
    key: 'rushProcessing',
    name: 'Internal Rush Processing',
    price: 50,
    details: 'Next-business-day handling',
  },
  {
    key: 'printedCopies',
    name: 'Printed & Mailed Copies',
    price: 15,
    details: 'Hard copy with postage',
  },
];

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { businessInfo, owners, selectedAddOns, totalAmount, userEmail } = location.state || {};
  const typedBusinessInfo = businessInfo as BusinessInfo | undefined;
  const typedSelectedAddOns = selectedAddOns as string[] | undefined;

  // Helper function to format date values
  const formatDate = (date: Date | string | number | dayjs.Dayjs | null | undefined) => {
    if (!date) return '';
    try {
      // If it's already a formatted string, return it
      if (typeof date === 'string') {
        return date;
      }

      // If it's a dayjs object or has dayjs properties
      if (date && (typeof (date as dayjs.Dayjs).format === 'function' || (date as any).$isDayjsObject || (date as any).$d)) {
        // Create a new dayjs instance from the date value
        const dayjsDate = dayjs((date as any).$d || date);
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
    
    // Load brand color (assuming primary color is brand color)
    const brandColor = '#002D62'; // Primary color from theme.css

    // Add logo
    const img = new window.Image();
    img.src = logo;
    await new Promise(resolve => { img.onload = resolve; });
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const logoHeight = 20;
    const logoWidth = logoHeight * aspectRatio;
    doc.addImage(img, 'PNG', 15, 15, logoWidth, logoHeight);

    // Add Invoice Title
    doc.setFontSize(24);
    doc.setTextColor(brandColor);
    doc.text('INVOICE', 15 + logoWidth + 10, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);
    let y = 15 + logoHeight + 15; // Start position below logo and title

    // Business Information Section
    doc.setFontSize(14);
    doc.setTextColor(brandColor);
    doc.text('Business Information', 15, y);
    y += 8;
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y); // Underline section title
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(0);

    const addInfoLine = (label: string, value: any) => {
      if (value !== null && value !== undefined && value !== '') {
        let displayValue = value;
        // Handle date values specifically
        if (label.toLowerCase().includes('date')) {
          displayValue = formatDate(value); // Use the formatDate helper
        } else if (typeof value === 'object') {
           // For complex objects, you might want to display a specific property or just indicate presence
           displayValue = JSON.stringify(value); // Simple stringify for now
        }
        // Handle number values with specific formatting if needed (e.g., currency for parValue)
        if (typeof value === 'number' && label.toLowerCase().includes('value')) {
           displayValue = `$${value.toFixed(2)}`;
        }

        doc.text(`${label}: ${displayValue}`, 15, y);
        y += 7; // Reduced spacing for lines within a section
      }
    };
    
    // Use addInfoLine for all business info fields
    addInfoLine('Business Type', typedBusinessInfo?.businessType);
    addInfoLine('Underlying Business Type', typedBusinessInfo?.underlyingBusinessType);
    addInfoLine('Business Name', typedBusinessInfo?.businessName);
    addInfoLine('Legal Business Name', typedBusinessInfo?.legalBusinessName);
    addInfoLine('Business Address', typedBusinessInfo?.businessAddress);
    addInfoLine('Registered Agent Name', typedBusinessInfo?.registeredAgentName);
    addInfoLine('Registered Agent Address', typedBusinessInfo?.registeredAgentAddress);
    addInfoLine('Business Purpose', typedBusinessInfo?.businessPurpose);
    addInfoLine('Business Start Date', typedBusinessInfo?.businessStartDate);
    addInfoLine('Sole Proprietor Name', typedBusinessInfo?.soleProprietorName);
    addInfoLine('Management Type', typedBusinessInfo?.managementType);
    addInfoLine('Tax Classification', typedBusinessInfo?.taxClassification);
    addInfoLine('Corporate Type', typedBusinessInfo?.corporateType);
    addInfoLine('Number of Shares Authorized', typedBusinessInfo?.numberOfShares);
    addInfoLine('Par Value per Share', typedBusinessInfo?.parValue);
    addInfoLine('Contact Email', userEmail);
    
    y += 10; // Space after Business Info section

    // Owner(s) Information Section
    if (owners && owners.length > 0 && owners.some((owner: Owner) => owner.name)) {
      doc.setFontSize(14);
      doc.setTextColor(brandColor);
      doc.text('Owner(s) Information', 15, y);
      y += 8;
      doc.setLineWidth(0.5);
      doc.line(15, y, 195, y); // Underline section title
      y += 8;
      doc.setFontSize(12);
      doc.setTextColor(0);

      (owners || []).forEach((owner: Owner, idx: number) => {
        if (owner.name) {
          doc.text(`Owner ${idx + 1}: ${owner.name}`, 15, y);
          y += 7;
          if (owner.email) { doc.text(`Email: ${owner.email}`, 20, y); y += 7; }
          if (owner.phone) { doc.text(`Phone: ${owner.phone}`, 20, y); y += 7; }
          y += 3; // Small space between owners
        }
      });
      y += 7; // Space after Owners Info section
    }

    // Order Summary Section (using manual table-like structure)
    doc.setFontSize(14);
    doc.setTextColor(brandColor);
    doc.text('Order Summary', 15, y);
    y += 8;
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y); // Underline section title
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(0);

    const tableStartX = 15;
    const itemColX = tableStartX;
    const priceColX = 150;
    const lineHeight = 7;

    // Table Headers
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Item', itemColX, y);
    doc.text('Price', priceColX, y);
    y += lineHeight;
    doc.setLineWidth(0.2);
    doc.line(itemColX, y, 195, y); // Header underline
    y += lineHeight;
    doc.setFont('helvetica', 'normal');

    // Base Fees
    if (typedBusinessInfo?.businessType) {
      // Ensure BUSINESS_PRICING is accessible
      const base = BUSINESS_PRICING[typedBusinessInfo.businessType] || { service: 0, gov: 0 };
      doc.text('Service Fee', itemColX, y);
      doc.text(`$${base.service.toFixed(2)}`, priceColX, y);
      y += lineHeight;
      doc.text('Gov\'t Filing Fee', itemColX, y);
      doc.text(`$${base.gov.toFixed(2)}`, priceColX, y);
      y += lineHeight;
    }

    // Add-Ons
    if (typedSelectedAddOns && typedSelectedAddOns.length > 0) {
      y += lineHeight; // Space before add-ons list
      typedSelectedAddOns.forEach((addonKey: string) => {
        // Ensure ADD_ONS is accessible
        const addOn = ADD_ONS.find(a => a.key === addonKey);
        if(addOn) {
          doc.text(addOn.name, itemColX, y);
          doc.text(`$${addOn.price.toFixed(2)}`, priceColX, y);
          y += lineHeight;
        }
      });
    }

    y += 5; // Space before total line
    doc.setLineWidth(0.5);
    doc.line(itemColX, y, 195, y); // Line before total
    y += lineHeight;

    // Total Amount
    if (totalAmount !== undefined && totalAmount !== null) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Total Paid', itemColX, y);
      doc.text(`$${totalAmount.toFixed(2)}`, priceColX, y);
      y += lineHeight;
    }

    // Footer
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('LLC 671 - Thank you for your business!', 15, y);

    doc.save('LLC671-Invoice.pdf');
  };

  useEffect(() => {
    // Only auto-download invoice if businessInfo exists
    if (typedBusinessInfo) {
       handleDownloadInvoice();
    }
    // eslint-disable-next-line
  }, [typedBusinessInfo]); // Depend on typedBusinessInfo

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
        {typedBusinessInfo?.businessType && (<Descriptions.Item label="Business Type">{typedBusinessInfo.businessType}</Descriptions.Item>)}
        {typedBusinessInfo?.underlyingBusinessType && (<Descriptions.Item label="Underlying Business Type">{typedBusinessInfo.underlyingBusinessType}</Descriptions.Item>)}
        {typedBusinessInfo?.businessName && (<Descriptions.Item label="Business Name">{typedBusinessInfo.businessName}</Descriptions.Item>)}
        {typedBusinessInfo?.businessAddress && (<Descriptions.Item label="Business Address">{typedBusinessInfo.businessAddress}</Descriptions.Item>)}
        {typedBusinessInfo?.businessPurpose && (
          <Descriptions.Item label="Business Purpose">
            {typedBusinessInfo.businessPurpose}
            {typedBusinessInfo.businessPurposeOther && ` - ${typedBusinessInfo.businessPurposeOther}`}
          </Descriptions.Item>
        )}
        {typedBusinessInfo?.legalBusinessName && typedBusinessInfo.legalBusinessName !== '' && (
           <Descriptions.Item label="Legal Business Name">{typedBusinessInfo.legalBusinessName}</Descriptions.Item>
        )}
        {typedBusinessInfo?.businessStartDate && (
           <Descriptions.Item label="Business Start Date">{formatDate(typedBusinessInfo.businessStartDate)}</Descriptions.Item>
        )}
        
        {/* Render business type specific fields in summary */}
        {typedBusinessInfo?.underlyingBusinessType === 'Individual/Sole Proprietorship' && typedBusinessInfo?.soleProprietorName && (
           <Descriptions.Item label="Sole Proprietor Name">{typedBusinessInfo.soleProprietorName}</Descriptions.Item>
        )}
        {(typedBusinessInfo?.businessType === 'LLC' || typedBusinessInfo?.businessType === 'Corporation') && typedBusinessInfo?.registeredAgentName && (
           <Descriptions.Item label="Registered Agent Name">{typedBusinessInfo.registeredAgentName}</Descriptions.Item>
        )}
        {(typedBusinessInfo?.businessType === 'LLC' || typedBusinessInfo?.businessType === 'Corporation') && typedBusinessInfo?.registeredAgentAddress && (
           <Descriptions.Item label="Registered Agent Address">{typedBusinessInfo.registeredAgentAddress}</Descriptions.Item>
        )}
        {typedBusinessInfo?.businessType === 'LLC' && typedBusinessInfo?.managementType && (
           <Descriptions.Item label="Management Type">{typedBusinessInfo.managementType}</Descriptions.Item>
        )}
        {typedBusinessInfo?.businessType === 'LLC' && typedBusinessInfo?.taxClassification && (
           <Descriptions.Item label="Tax Classification">{typedBusinessInfo.taxClassification}</Descriptions.Item>
        )}
        {typedBusinessInfo?.businessType === 'Corporation' && typedBusinessInfo?.corporateType && (
           <Descriptions.Item label="Corporate Type">{typedBusinessInfo.corporateType}</Descriptions.Item>
        )}
        {typedBusinessInfo?.businessType === 'Corporation' && typedBusinessInfo?.numberOfShares && (
           <Descriptions.Item label="Number of Shares Authorized">{typedBusinessInfo.numberOfShares}</Descriptions.Item>
        )}
        {typedBusinessInfo?.businessType === 'Corporation' && typedBusinessInfo?.parValue !== undefined && typedBusinessInfo?.parValue !== null && (
           <Descriptions.Item label="Par Value per Share">${typedBusinessInfo.parValue.toFixed(2)}</Descriptions.Item>
        )}

        {userEmail && (<Descriptions.Item label="Contact Email">{userEmail}</Descriptions.Item>)}

        {(owners || []).length > 0 && (
           <Descriptions.Item label="Owners">
            <List
              size="small"
              dataSource={owners || []}
              renderItem={(owner: Owner, idx) => (
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
        
        {(typedSelectedAddOns || []).length > 0 && (
           <Descriptions.Item label="Add-Ons">
             <List
               size="small"
               dataSource={typedSelectedAddOns || []}
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
      {typedBusinessInfo && (
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

export default PaymentSuccess; 