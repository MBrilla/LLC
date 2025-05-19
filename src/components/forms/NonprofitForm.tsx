import React from 'react';
import { Form, Input, InputNumber, Card } from 'antd';

interface NonprofitFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const NonprofitForm: React.FC<NonprofitFormProps> = ({ onValuesChange, initialValues }) => {
  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={(_, allValues) => onValuesChange(allValues)}
    >
      <Form.Item 
        label="Organization Name" 
        name="businessName" 
        rules={[{ required: true, message: 'Please enter the organization name' }]}
      > 
        <Input size="large" placeholder="Enter your nonprofit organization name" />
      </Form.Item>
      
      <Form.Item 
        label="Business Address" 
        name="businessAddress" 
        rules={[{ required: true, message: 'Please enter the business address' }]}
      > 
        <Input.TextArea size="large" placeholder="Enter your business address" rows={3} />
      </Form.Item>

      <Form.Item 
        label="Mission Statement" 
        name="missionStatement" 
        rules={[{ required: true, message: 'Please enter your mission statement' }]}
      >
        <Input.TextArea 
          size="large" 
          rows={4} 
          placeholder="Describe your organization's mission and purpose"
        />
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
        label="Number of Board Members" 
        name="boardMembers" 
        rules={[{ required: true, message: 'Please enter number of board members' }]}
      >
        <InputNumber 
          size="large" 
          style={{ width: '100%' }}
          min={1}
          placeholder="Enter number of board members"
        />
      </Form.Item>

      <Form.Item 
        label="Tax-Exempt Purpose" 
        name="taxExemptPurpose" 
        rules={[{ required: true, message: 'Please describe your tax-exempt purpose' }]}
      >
        <Input.TextArea 
          size="large" 
          rows={4} 
          placeholder="Describe how your organization will qualify for tax-exempt status"
        />
      </Form.Item>
    </Form>
  );
};

export default NonprofitForm; 