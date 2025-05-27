import React from 'react';
import { Form, Input } from 'antd';

const LLCForm: React.FC = () => {
  return (
    <div className="business-type-fields">
      <Form.Item 
        label="Registered Agent Name (LLC)" 
        name="llcRegisteredAgentName" 
        rules={[{ required: true, message: 'Please enter the LLC registered agent name' }]}>
        <Input size="large" placeholder="Enter LLC registered agent name" />
      </Form.Item>
      <Form.Item 
        label="Registered Agent Address (LLC)" 
        name="llcRegisteredAgentAddress" 
        rules={[{ required: true, message: 'Please enter the LLC registered agent address' }]}>
        <Input.TextArea size="large" placeholder="Enter LLC registered agent address" rows={2} />
      </Form.Item>
    </div>
  );
};

export default LLCForm; 