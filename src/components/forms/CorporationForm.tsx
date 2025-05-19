import React from 'react';
import { Form, Input, Select, InputNumber, Card } from 'antd';

const { Option } = Select;

interface CorporationFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const CorporationForm: React.FC<CorporationFormProps> = ({ onValuesChange, initialValues }) => {
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