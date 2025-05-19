import React from 'react';
import { Form, Input, Select, DatePicker, Card } from 'antd';

const { Option } = Select;

interface DBAFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const DBAForm: React.FC<DBAFormProps> = ({ onValuesChange, initialValues }) => {
  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={(_, allValues) => onValuesChange(allValues)}
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