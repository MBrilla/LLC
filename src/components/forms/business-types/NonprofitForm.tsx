import React from 'react';
import { Form, Input } from 'antd';

const NonprofitForm: React.FC = () => {
  return (
    <>
      <Form.Item 
        label="Registered Agent Name (Nonprofit)" 
        name="nonprofitRegisteredAgentName"
        rules={[{ required: true, message: 'Please enter the nonprofit registered agent name' }]}>
        <Input size="large" placeholder="Enter nonprofit registered agent name" />
      </Form.Item>
      <Form.Item 
        label="Registered Agent Address (Nonprofit)" 
        name="nonprofitRegisteredAgentAddress"
        rules={[{ required: true, message: 'Please enter the nonprofit registered agent address' }]}>
        <Input.TextArea size="large" placeholder="Enter nonprofit registered agent address" rows={2} />
      </Form.Item>
    </>
  );
};

export default NonprofitForm; 