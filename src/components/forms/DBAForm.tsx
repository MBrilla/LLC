import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import SoleProprietorshipForm from './business-types/SoleProprietorshipForm';
import LLCForm from './business-types/LLCForm';
import CorporationForm from './business-types/CorporationForm';
import NonprofitForm from './business-types/NonprofitForm';
import GeneralPartnershipForm from './business-types/GeneralPartnershipForm';
import LimitedPartnershipForm from './business-types/LimitedPartnershipForm';
import LLPForm from './business-types/LLPForm';

const { Option } = Select;

const businessPurposeOptions = [
  'Administrative and support services',
  'Agriculture, farming, or aquaculture',
  'Artistic, creative, or design services',
  'Cleaning and janitorial services',
  'Construction and contracting services',
  'Educational or training services',
  'Event planning and coordination',
  'Financial services and bookkeeping',
  'Fitness or personal training services',
  'Food service and catering operations',
  'General business activities permitted under Guam law',
  'Handyman or general maintenance services',
  'Health and wellness services',
  'Importing and exporting of goods',
  'IT services and software development',
  'Legal document preparation (non-legal advice)',
  'Marketing, media, and advertising',
  'Online sales and e-commerce operations',
  'Professional consulting services',
  'Real estate investment and property management',
  'Rental of equipment or vehicles',
  'Retail sales of goods and merchandise',
  'Tourism and hospitality services',
  'Transportation and delivery services',
  'Other (please specify)'
];

const entityTypeOptions = [
  {
    value: 'Individual/Sole Proprietorship',
    label: 'Individual/Sole Proprietorship',
    description: 'Most Common',
    mostCommon: true,
  },
  {
    value: 'Limited Liability Company (LLC)',
    label: 'Limited Liability Company (LLC)',
    description: 'Most Common',
    mostCommon: true,
  },
  {
    value: 'Corporation (for-profit)',
    label: 'Corporation (for-profit)',
  },
  {
    value: 'Nonprofit Corporation',
    label: 'Nonprofit Corporation',
  },
  {
    value: 'General Partnership',
    label: 'General Partnership',
  },
  {
    value: 'Limited Partnership (LP)',
    label: 'Limited Partnership (LP)',
  },
  {
    value: 'Limited Liability Partnership (LLP)',
    label: 'Limited Liability Partnership (LLP)',
  },
];

interface DBAFormProps {
  onValuesChange: (values: any) => void;
  initialValues?: any;
}

const DBAForm: React.FC<DBAFormProps> = ({ onValuesChange, initialValues }) => {
  const [form] = Form.useForm();
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>(initialValues?.underlyingBusinessType || '');
  const [selectedPurpose, setSelectedPurpose] = useState<string>(initialValues?.businessPurpose || '');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleBusinessTypeChange = (value: string) => {
    setSelectedBusinessType(value);
    const currentValues = form.getFieldsValue();
    onValuesChange({ ...currentValues, underlyingBusinessType: value });
  };

  const handlePurposeChange = (value: string) => {
    setSelectedPurpose(value);
    const currentValues = form.getFieldsValue();
    onValuesChange({ ...currentValues, businessPurpose: value });
  };

  const renderBusinessTypeFields = () => {
    switch (selectedBusinessType) {
      case 'Individual/Sole Proprietorship':
        return <SoleProprietorshipForm />;
      case 'Limited Liability Company (LLC)':
        return <LLCForm />;
      case 'Corporation (for-profit)':
        return <CorporationForm />;
      case 'Nonprofit Corporation':
        return <NonprofitForm />;
      case 'General Partnership':
        return <GeneralPartnershipForm />;
      case 'Limited Partnership (LP)':
        return <LimitedPartnershipForm />;
      case 'Limited Liability Partnership (LLP)':
        return <LLPForm />;
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={(_, allValues) => {
        onValuesChange(allValues);
      }}
    >
      <Form.Item 
        label="DBA Name" 
        name="businessName" 
        rules={[{ required: true, message: 'Please enter the DBA name' }]}
        className="full-width"
      >
        <Input size="large" placeholder="Enter your DBA name" />
      </Form.Item>
      <Form.Item 
        label="Business Address" 
        name="businessAddress" 
        rules={[{ required: true, message: 'Please enter the business address' }]}
        className="full-width"
      >
        <Input.TextArea size="large" placeholder="Enter your business address" rows={2} />
      </Form.Item>
      <Form.Item
        label="Business Purpose"
        name="businessPurpose"
        rules={[{ required: true, message: 'Please select a business purpose' }]}
        className="full-width"
      >
        <Select
          size="large"
          showSearch
          placeholder="Select or search business purpose"
          optionFilterProp="children"
          onChange={handlePurposeChange}
          value={selectedPurpose}
          filterOption={(input, option) =>
            String(option?.children).toLowerCase().includes(input.toLowerCase())}
        >
          {businessPurposeOptions.map((purpose) => (
            <Option key={purpose} value={purpose}>
              {purpose}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {selectedPurpose === 'Other (please specify)' && (
        <Form.Item
          label="Please specify business purpose"
          name="businessPurposeOther"
          rules={[{ required: true, message: 'Please specify your business purpose' }]}
          className="full-width"
        >
          <Input size="large" placeholder="Enter your business purpose" />
        </Form.Item>
      )}
      <Form.Item 
        label="Legal Business Name" 
        name="legalBusinessName" 
        rules={[{ required: true, message: 'Please enter the legal business name' }]}
        className="full-width"
      >
        <Input size="large" placeholder="Enter your legal business name" />
      </Form.Item>
      <Form.Item
        label="Underlying Business Type" 
        name="underlyingBusinessType" 
        rules={[{ required: true, message: 'Please select your business type' }]}
        className="full-width"
      >
        <Select
          size="large"
          placeholder="Entity Type"
          optionLabelProp="label"
          onChange={handleBusinessTypeChange}
          value={selectedBusinessType}
        >
          {entityTypeOptions.map(option => (
            <Option key={option.value} value={option.value} label={option.label}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: option.mostCommon ? 600 : 400 }}>
                  {option.label}
                  <InfoCircleOutlined style={{ marginLeft: 8, color: '#bfbfbf' }} />
                </div>
                {option.description && (
                  <span style={{ fontSize: 12, color: '#8c8c8c', marginLeft: 2 }}>{option.description}</span>
                )}
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      {renderBusinessTypeFields()}
      <Form.Item
        label="Business Start Date"
        name="businessStartDate"
        rules={[{ required: true, message: 'Please select a business start date' }]}
        className="full-width"
      >
        <DatePicker
          size="large"
          style={{ width: '100%' }}
          format="MMMM D, YYYY"
          onChange={(date) => {
            if (date) {
              form.setFieldsValue({ businessStartDate: date });
            }
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default DBAForm;