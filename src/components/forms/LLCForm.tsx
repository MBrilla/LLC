import React from 'react';
import { Form, Input, Select, Card } from 'antd';

const { Option } = Select;

interface LLCFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const LLCForm: React.FC<LLCFormProps> = ({ onValuesChange, initialValues }) => {
  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={(_, allValues) => onValuesChange(allValues)}
    >
      <Form.Item 
        label="Business Name" 
        name="businessName" 
        rules={[{ required: true, message: 'Please enter the business name' }]}
      > 
        <Input size="large" placeholder="Enter your LLC name" />
      </Form.Item>
      
      <Form.Item 
        label="Business Address" 
        name="businessAddress" 
        rules={[{ required: true, message: 'Please enter the business address' }]}
      > 
        <Input.TextArea size="large" placeholder="Enter your business address" rows={3} />
      </Form.Item>

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
        label="Management Type" 
        name="managementType" 
        rules={[{ required: true, message: 'Please select management type' }]}
      >
        <Select size="large">
          <Option value="Member-Managed">Member-Managed</Option>
          <Option value="Manager-Managed">Manager-Managed</Option>
        </Select>
      </Form.Item>

      <Form.Item 
        label="Tax Classification" 
        name="taxClassification" 
        rules={[{ required: true, message: 'Please select tax classification' }]}
      >
        <Select size="large">
          <Option value="Single-Member LLC">Single-Member LLC</Option>
          <Option value="Multi-Member LLC">Multi-Member LLC</Option>
          <Option value="S Corporation">S Corporation</Option>
          <Option value="C Corporation">C Corporation</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default LLCForm; 