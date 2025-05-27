import React, { useEffect, useState } from 'react';
import { Result, Button, Descriptions, List, Typography, Card, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../assets/Logo2.png';
import dayjs from 'dayjs';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_CLIENT_ID, PAYPAL_CURRENCY, PAYPAL_STYLE, BUSINESS_PRICING } from '../config/paypal';
import '../styles/Form.css';

// Import form components
import LLCForm from '../components/forms/LLCForm';
import CorporationForm from '../components/forms/CorporationForm';
import NonprofitForm from '../components/forms/NonprofitForm';
import DBAForm from '../components/forms/DBAForm.tsx';

const { Title, Text } = Typography;

interface BusinessInfo {
  businessName: string;
  businessAddress: string;
  businessType: string;
  businessPurpose: string;
  legalBusinessName: string;
  businessStartDate: Date | null;
  [key: string]: any;
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
  businessTypes?: string[]; // Optional: specify if add-on is only for certain business types
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

  // Helper function to format date values
  const formatDate = (date: any) => {
    if (!date) return '';
    try {
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
        doc.text(`${label}: ${displayValue}`, 15, y);
        y += 7; // Reduced spacing for lines within a section
      }
    };
    
    // Use addInfoLine for all business info fields
    addInfoLine('Business Type', businessInfo?.businessType);
    addInfoLine('Underlying Business Type', businessInfo?.underlyingBusinessType);
    addInfoLine('DBA Name', businessInfo?.businessName);
    addInfoLine('Legal Business Name', businessInfo?.legalBusinessName);
    addInfoLine('Business Address', businessInfo?.businessAddress);
    addInfoLine('Registered Agent Name', businessInfo?.registeredAgentName);
    addInfoLine('Registered Agent Address', businessInfo?.registeredAgentAddress);
    addInfoLine('Business Purpose', businessInfo?.businessPurpose);
    addInfoLine('Business Start Date', businessInfo?.businessStartDate);
    addInfoLine('Sole Proprietor Name', businessInfo?.soleProprietorName);
    addInfoLine('Contact Email', userEmail);
    
    y += 10; // Space after Business Info section

    // Owner(s) Information Section
    if (owners && owners.length > 0 && owners.some(owner => owner.name)) {
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
    if (businessInfo?.businessType) {
      // Ensure BUSINESS_PRICING is accessible
      const base = BUSINESS_PRICING[businessInfo.businessType] || { service: 0, gov: 0 };
      doc.text('Service Fee', itemColX, y);
      doc.text(`$${base.service.toFixed(2)}`, priceColX, y);
      y += lineHeight;
      doc.text('Gov\'t Filing Fee', itemColX, y);
      doc.text(`$${base.gov.toFixed(2)}`, priceColX, y);
      y += lineHeight;
    }

    // Add-Ons
    if (selectedAddOns && selectedAddOns.length > 0) {
      y += lineHeight; // Space before add-ons list
      selectedAddOns.forEach((addonKey: string) => {
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

export default PaymentSuccess; 