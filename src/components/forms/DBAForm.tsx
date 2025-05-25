import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Card } from 'antd';

const { Option } = Select;

const businessPurposeOptions = [
  'Administrative and support services',
  'Agriculture, farming, or aquaculture',
  'Artistic, creative, or design services',
  'Cleaning and janitorial services',
  'Construction and contracting services',
  'Educational or training services',
  'Event planning and coordination',
  'Financial services and bookkeeping',
  'Fitness or personal training services',
  'Food service and catering operations',
  'General business activities permitted under Guam law',
  'Handyman or general maintenance services',
  'Health and wellness services',
  'Importing and exporting of goods',
  'IT services and software development',
  'Legal document preparation (non-legal advice)',
  'Marketing, media, and advertising',
  'Online sales and e-commerce operations',
  'Professional consulting services',
  'Real estate investment and property management',
  'Rental of equipment or vehicles',
  'Retail sales of goods and merchandise',
  'Tourism and hospitality services',
  'Transportation and delivery services',
  'Other (please specify)'
];

interface DBAFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const DBAForm: React.FC<DBAFormProps> = ({ onValuesChange, initialValues }) => {
  const [selectedPurpose, setSelectedPurpose] = useState(initialValues?.businessPurpose || '');

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={(_, allValues) => {
        onValuesChange(allValues);
        setSelectedPurpose(allValues.businessPurpose);
      }}
    >
      <Form.Item 
        label="DBA Name" 
        name="businessName" 
        rules={[{ required: true, message: 'Please enter the DBA name' }]}
      > 
        <Input size="large" placeholder="Enter your DBA name" />
      </Form.Item>
      
      <Form.Item 
        label="Business Address" 
        name="businessAddress" 
        rules={[{ required: true, message: 'Please enter the business address' }]}
      > 
        <Input.TextArea size="large" placeholder="Enter your business address" rows={3} />
      </Form.Item>

      <Form.Item
        label="Business Purpose"
        name="businessPurpose"
        rules={[{ required: true, message: 'Please select a business purpose' }]}
      >
        <Select
          size="large"
          showSearch
          placeholder="Select or search business purpose"
          optionFilterProp="children"
          filterOption={(input, option) =>
            String(option?.children).toLowerCase().includes(input.toLowerCase())
          }
        >
          {businessPurposeOptions.map((purpose) => (
            <Option key={purpose} value={purpose}>
              {purpose}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {selectedPurpose === 'Other (please specify)' && (
        <Form.Item
          label="Please specify business purpose"
          name="businessPurposeOther"
          rules={[{ required: true, message: 'Please specify your business purpose' }]}
        >
          <Input size="large" placeholder="Enter your business purpose" />
        </Form.Item>
      )}

      <Form.Item 
        label="Legal Business Name" 
        name="legalBusinessName" 
        rules={[{ required: true, message: 'Please enter the legal business name' }]}
      >
        <Input size="large" placeholder="Enter your legal business name" />
      </Form.Item>

      <Form.Item 
        label="Underlying Business Type" 
        name="businessType" 
        rules={[{ required: true, message: 'Please select your business type' }]}
      >
        <Select size="large">
          <Option value="Sole Proprietorship">Sole Proprietorship</Option>
          <Option value="Partnership">Partnership</Option>
          <Option value="LLC">LLC</Option>
          <Option value="Corporation">Corporation</Option>
        </Select>
      </Form.Item>

      <Form.Item 
        label="Business Start Date" 
        name="businessStartDate" 
        rules={[{ required: true, message: 'Please select business start date' }]}
      >
        <DatePicker 
          size="large" 
          style={{ width: '100%' }}
          placeholder="Select business start date"
        />
      </Form.Item>
    </Form>
  );
};

export default DBAForm; 