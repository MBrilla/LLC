import React from 'react';
import { Form, Input } from 'antd';

const SoleProprietorshipForm: React.FC = () => {
  return (
    <div className="business-type-fields">
      <Form.Item
        label="Owner's Full Name"
        name="soleProprietorName"
        rules={[{ required: true, message: "Please enter the owner's full name" }]}>
        <Input size="large" placeholder="Enter owner's full name" />
      </Form.Item>
    </div>
  );
};

export default SoleProprietorshipForm; 