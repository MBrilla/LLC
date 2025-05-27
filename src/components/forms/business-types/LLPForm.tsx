import React from 'react';
import { Form, Input } from 'antd';

const LLPForm: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Partner 1 Name (LLP)"
        name="llpPartner1Name"
        rules={[{ required: true, message: "Please enter the first LLP partner's name" }]}>
        <Input size="large" placeholder="Enter first LLP partner's name" />
      </Form.Item>
      <Form.Item
        label="Partner 2 Name (LLP)"
        name="llpPartner2Name"
        rules={[{ required: true, message: "Please enter the second LLP partner's name" }]}>
        <Input size="large" placeholder="Enter second LLP partner's name" />
      </Form.Item>
    </>
  );
};

export default LLPForm; 