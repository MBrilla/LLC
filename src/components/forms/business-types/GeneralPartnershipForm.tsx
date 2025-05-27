import React from 'react';
import { Form, Input } from 'antd';

const GeneralPartnershipForm: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Partner 1 Name (General Partnership)"
        name="gpPartner1Name"
        rules={[{ required: true, message: "Please enter the first general partner's name" }]}>
        <Input size="large" placeholder="Enter first general partner's name" />
      </Form.Item>
      <Form.Item
        label="Partner 2 Name (General Partnership)"
        name="gpPartner2Name"
        rules={[{ required: true, message: "Please enter the second general partner's name" }]}>
        <Input size="large" placeholder="Enter second general partner's name" />
      </Form.Item>
    </>
  );
};

export default GeneralPartnershipForm; 