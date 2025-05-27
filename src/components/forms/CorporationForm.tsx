import React, { useState } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';

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

interface CorporationFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const CorporationForm: React.FC<CorporationFormProps> = ({ onValuesChange, initialValues }) => {
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
        label="Business Name" 
        name="businessName" 
        rules={[{ required: true, message: 'Please enter the business name' }]}
      > 
        <Input size="large" placeholder="Enter your corporation name" />
      </Form.Item>
      
      <Form.Item 
        label="Business Address" 
        name="businessAddress" 
        rules={[{ required: true, message: 'Please enter the business address' }]}
      > 
        <Input.TextArea size="large" placeholder="Enter your business address" rows={3} />
      </Form.Item>

      <Form.Item 
        label="Corporate Type" 
        name="corporateType" 
        rules={[{ required: true, message: 'Please select corporate type' }]}
      >
        <Select size="large">
          <Option value="S Corporation">S Corporation</Option>
          <Option value="C Corporation">C Corporation</Option>
        </Select>
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
        label="Registered Agent Name" 
        name="registeredAgent" 
        rules={[{ required: true, message: 'Please enter the registered agent name' }]}
      >
        <Input size="large" placeholder="Enter registered agent name" />
      </Form.Item>

      <Form.Item 
        label="Registered Agent Address" 
        name="registeredAgentAddress" 
        rules={[{ required: true, message: 'Please enter the registered agent address' }]}
      >
        <Input.TextArea size="large" placeholder="Enter registered agent address" rows={3} />
      </Form.Item>

      <Form.Item 
        label="Number of Shares Authorized" 
        name="sharesAuthorized" 
        rules={[{ required: true, message: 'Please enter number of shares' }]}
      >
        <InputNumber 
          size="large" 
          style={{ width: '100%' }}
          min={1}
          placeholder="Enter number of shares"
        />
      </Form.Item>

      <Form.Item 
        label="Par Value per Share" 
        name="parValue" 
        rules={[{ required: true, message: 'Please enter par value' }]}
      >
        <InputNumber 
          size="large" 
          style={{ width: '100%' }}
          min={0}
          step={0.01}
          placeholder="Enter par value per share"
        />
      </Form.Item>
    </Form>
  );
};

export default CorporationForm; 