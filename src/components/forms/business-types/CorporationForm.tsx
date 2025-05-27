import React from 'react';
import { Form, Input } from 'antd';

const CorporationForm: React.FC = () => {
  return (
    <>
      <Form.Item 
        label="Registered Agent Name (Corporation)" 
        name="corpRegisteredAgentName"
        rules={[{ required: true, message: 'Please enter the corporation registered agent name' }]}>
        <Input size="large" placeholder="Enter corporation registered agent name" />
      </Form.Item>
      <Form.Item 
        label="Registered Agent Address (Corporation)" 
        name="corpRegisteredAgentAddress"
        rules={[{ required: true, message: 'Please enter the corporation registered agent address' }]}>
        <Input.TextArea size="large" placeholder="Enter corporation registered agent address" rows={2} />
      </Form.Item>
    </>
  );
};

export default CorporationForm; 