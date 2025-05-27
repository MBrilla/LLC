import React from 'react';
import { Form, Input } from 'antd';

const LimitedPartnershipForm: React.FC = () => {
  return (
    <>
      <Form.Item
        label="General Partner Name (LP)"
        name="lpGeneralPartnerName"
        rules={[{ required: true, message: "Please enter the limited partnership's general partner name" }]}>
        <Input size="large" placeholder="Enter general partner name" />
      </Form.Item>
      <Form.Item
        label="Limited Partner Name (LP)"
        name="lpLimitedPartnerName"
        rules={[{ required: true, message: "Please enter the limited partnership's limited partner name" }]}>
        <Input size="large" placeholder="Enter limited partner name" />
      </Form.Item>
    </>
  );
};

export default LimitedPartnershipForm; 