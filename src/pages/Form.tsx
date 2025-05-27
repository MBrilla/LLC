import { useState, useEffect } from 'react';
import { Button, Typography, Form, Input, Descriptions, List, Card, Divider, Row, Col, Progress, message, Spin, Alert, Checkbox } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ArrowLeftOutlined, UserOutlined, BankOutlined, FileTextOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_CLIENT_ID, PAYPAL_CURRENCY, PAYPAL_STYLE, BUSINESS_PRICING } from '../config/paypal';
import '../styles/Form.css';

// Import form components
import LLCForm from '../components/forms/LLCForm';
import CorporationForm from '../components/forms/CorporationForm';
import NonprofitForm from '../components/forms/NonprofitForm';
import DBAForm from '../components/forms/DBAForm';

const { Title, Text } = Typography;

interface BusinessInfo {
  businessName: string;
  businessAddress: string;
  businessType: string;
  [key: string]: any;
}

interface Owner {
  name: string;
  email: string;
  phone: string;
}

interface AddOn {
  key: string;
  name: string;
  price: number;
  details: string;
  businessTypes?: string[]; // Optional: specify if add-on is only for certain business types
}

const ADD_ONS: AddOn[] = [
  {
    key: 'operatingAgreement',
    name: 'Operating Agreement (LLC)',
    price: 50,
    details: 'Custom auto-generated document',
    businessTypes: ['LLC'],
  },
  {
    key: 'einApplication',
    name: 'EIN Application (IRS)',
    price: 50,
    details: 'IRS Form SS-4 filing',
  },
  {
    key: 'rushProcessing',
    name: 'Internal Rush Processing',
    price: 50,
    details: 'Next-business-day handling',
  },
  {
    key: 'printedCopies',
    name: 'Printed & Mailed Copies',
    price: 15,
    details: 'Hard copy with postage',
  },
];

const FormPage = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const initialBusinessType = location.state?.businessType || 'LLC';

  // Form state
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessAddress: '',
    businessType: initialBusinessType,
  });
  const [owners, setOwners] = useState<Owner[]>([
    { name: '', email: '', phone: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Load saved progress when component mounts
  useEffect(() => {
    loadProgress();
  }, []);

  // Calculate total amount including base price and add-ons
  useEffect(() => {
    const base = BUSINESS_PRICING[businessInfo.businessType] || { service: 0, gov: 0, total: 0 };
    const addOnsTotal = selectedAddOns.reduce((sum, addonKey) => {
      const addOn = ADD_ONS.find(a => a.key === addonKey);
      return sum + (addOn ? addOn.price : 0);
    }, 0);
    setTotalAmount(base.total + addOnsTotal);
  }, [selectedAddOns, businessInfo.businessType]);

  // Save progress to localStorage
  const saveProgress = () => {
    setSaving(true);
    try {
      localStorage.setItem('businessFormProgress', JSON.stringify({
        businessInfo,
        owners,
        currentStep: current
      }));
      message.success('Progress saved successfully');
    } catch (error) {
      message.error('Failed to save progress');
    } finally {
      setSaving(false);
    }
  };

  // Load progress from localStorage
  const loadProgress = () => {
    const savedProgress = localStorage.getItem('businessFormProgress');
    if (savedProgress) {
      try {
        const { businessInfo: savedBusinessInfo, owners: savedOwners, currentStep } = JSON.parse(savedProgress);
        setBusinessInfo(savedBusinessInfo);
        setOwners(savedOwners);
        setCurrent(currentStep);
        message.info('Previous progress loaded');
      } catch (error) {
        message.error('Failed to load saved progress');
      }
    }
  };

  // Validate business name
  const validateBusinessName = async (name: string) => {
    if (!name) return 'Business name is required';
    if (name.length < 3) return 'Business name must be at least 3 characters';
    // TODO: Add API call to check name availability
    return '';
  };

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  // Validate phone
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  // Handlers for dynamic owner fields
  const addOwner = () => setOwners([...owners, { name: '', email: '', phone: '' }]);
  const removeOwner = (idx: number) => setOwners(owners.filter((_, i) => i !== idx));
  const updateOwner = (idx: number, field: string, value: string) => {
    setOwners(owners.map((owner, i) => i === idx ? { ...owner, [field]: value } : owner));
  };

  // Handle add-on selection change
  const handleAddOnChange = (checkedValues: string[]) => {
    setSelectedAddOns(checkedValues);
  };

  // PayPal create order handler
  const createOrder = (_: any, actions: any) => {
    const addOnNames = selectedAddOns
      .map(addonKey => ADD_ONS.find(a => a.key === addonKey)?.name)
      .filter(Boolean)
      .join(', ');

    // Short, user-friendly description
    const description = `${businessInfo.businessType} Formation${selectedAddOns.length ? ' + Add-Ons' : ''}`;

    // Add-ons in custom_id for your records (optional, max 127 chars)
    const custom_id = addOnNames ? addOnNames.slice(0, 127) : undefined;

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: PAYPAL_CURRENCY,
            value: totalAmount.toFixed(2),
          },
          description,
          ...(custom_id && { custom_id }),
        },
      ],
    });
  };

  // PayPal onApprove handler
  const onApprove = async (_: any, actions: any) => {
    try {
      await actions.order.capture();
      message.success('Payment successful!');
      // Now submit the form data
      await submitFormData();
    } catch (error) {
      message.error('Payment failed. Please try again.');
    }
  };

  // PayPal onError handler
  const onError = (err: any) => {
    message.error('Payment failed. Please try again.');
    console.error('PayPal Error:', err);
  };

  // Add a new function to submit form data
  const submitFormData = async () => {
    setLoading(true);
    setValidationErrors({});
    try {
      // Validate all fields (optional, since payment already succeeded)
      const errors: Record<string, string> = {};
      const nameError = await validateBusinessName(businessInfo.businessName);
      if (nameError) errors.businessName = nameError;
      owners.forEach((owner, idx) => {
        if (!owner.name) errors[`owner${idx}_name`] = 'Name is required';
        const emailError = validateEmail(owner.email);
        if (emailError) errors[`owner${idx}_email`] = emailError;
        const phoneError = validatePhone(owner.phone);
        if (phoneError) errors[`owner${idx}_phone`] = phoneError;
      });
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        throw new Error('Validation failed');
      }
      // Prepare the data for Formspree including selected add-ons
      let formData: Record<string, any> = { ...businessInfo };
      if ((businessInfo as any)['businessPurposeOther']) {
        formData.businessPurposeDropdown = (businessInfo as any)['businessPurpose'];
        formData.businessPurpose = (businessInfo as any)['businessPurposeOther'];
      }
      const ownerData: Record<string, string> = {};
      owners.forEach((owner, idx) => {
        ownerData[`owner${idx + 1}_name`] = owner.name;
        ownerData[`owner${idx + 1}_email`] = owner.email;
        ownerData[`owner${idx + 1}_phone`] = owner.phone;
      });
      formData = { ...formData, ...ownerData, selectedAddOns };
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xanogobz', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to send form');
      }
      // Clear saved progress
      localStorage.removeItem('businessFormProgress');
      message.success('Form submitted successfully! We will contact you shortly.');
      navigate('/payment-success', {
        state: {
          businessInfo,
          owners,
          selectedAddOns,
          totalAmount,
          userEmail: owners[0]?.email || '',
        },
      });
    } catch (err) {
      if (err instanceof Error && err.message === 'Validation failed') {
        message.error('Please fix the validation errors before submitting');
      } else {
        message.error('Failed to submit form. Please contact support.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render the appropriate form based on business type
  const renderBusinessForm = () => {
    switch (businessInfo.businessType) {
      case 'LLC':
        return <LLCForm onValuesChange={values => setBusinessInfo(prev => ({ ...prev, ...values }))} initialValues={businessInfo} />;
      case 'Corporation':
        return <CorporationForm onValuesChange={values => setBusinessInfo(prev => ({ ...prev, ...values }))} initialValues={businessInfo} />;
      case 'Nonprofit':
        return <NonprofitForm onValuesChange={values => setBusinessInfo(prev => ({ ...prev, ...values }))} initialValues={businessInfo} />;
      case 'DBA':
        return <DBAForm onValuesChange={values => setBusinessInfo(prev => ({ ...prev, ...values }))} initialValues={businessInfo} />;
      default:
        return null;
    }
  };

  // Steps definition
  const steps = [
    {
      title: 'Business Info',
      icon: <BankOutlined />,
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="form-card">
            {renderBusinessForm()}
          </Card>
        </motion.div>
      ),
    },
    {
      title: 'Owner Info',
      icon: <UserOutlined />,
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="form-card">
            <Form layout="vertical">
              {owners.map((owner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className="owner-card"
                    style={{ marginBottom: 16 }}
                    title={`Owner ${idx + 1}`}
                    extra={owners.length > 1 && (
                      <Button 
                        danger 
                        onClick={() => removeOwner(idx)} 
                        size="small"
                        icon={<DeleteOutlined />}
                      >
                        Remove
                      </Button>
                    )}
                  >
                    <Form.Item label="Full Name" required>
                      <Input 
                        size="large"
                        value={owner.name} 
                        onChange={e => updateOwner(idx, 'name', e.target.value)}
                        placeholder="Enter owner's full name"
                      />
                    </Form.Item>
                    <Form.Item label="Email" required>
                      <Input 
                        size="large"
                        type="email"
                        value={owner.email} 
                        onChange={e => updateOwner(idx, 'email', e.target.value)}
                        placeholder="Enter owner's email"
                      />
                    </Form.Item>
                    <Form.Item label="Phone" required>
                      <Input 
                        size="large"
                        value={owner.phone} 
                        onChange={e => updateOwner(idx, 'phone', e.target.value)}
                        placeholder="Enter owner's phone number"
                      />
                    </Form.Item>
                  </Card>
                </motion.div>
              ))}
              {(businessInfo.businessType === 'LLC' || businessInfo.businessType === 'Corporation') && (
                <Button 
                  onClick={addOwner} 
                  type="dashed" 
                  style={{ width: '100%' }}
                  icon={<PlusOutlined />}
                >
                  Add Another Owner
                </Button>
              )}
            </Form>
          </Card>
        </motion.div>
      ),
    },
    {
      title: 'Add-Ons',
      icon: <FileTextOutlined />,
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="form-card">
            <Title level={4}>Select Additional Services</Title>
            <Checkbox.Group style={{ width: '100%' }} onChange={handleAddOnChange} value={selectedAddOns}>
              <Row gutter={[16, 16]}>
                {ADD_ONS.filter(addon => !addon.businessTypes || addon.businessTypes.includes(businessInfo.businessType)).map(addon => (
                  <Col span={24} key={addon.key}>
                    <Card size="small">
                      <Checkbox value={addon.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>{addon.name}</Text>
                          <Text>${addon.price.toFixed(2)}</Text>
                        </div>
                        <Text type="secondary">{addon.details}</Text>
                      </Checkbox>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Card>
        </motion.div>
      ),
    },
    {
      title: 'Review & Payment',
      icon: <FileTextOutlined />,
      content: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="form-card">
            <Descriptions 
              title="Business Information" 
              bordered 
              column={1} 
              size="middle" 
              style={{ marginBottom: 24 }}
              className="review-descriptions"
            >
              {Object.entries(businessInfo).map(([key, value]) => (
                <Descriptions.Item key={key} label={key.replace(/([A-Z])/g, ' $1').trim()}>
                  {value}
                </Descriptions.Item>
              ))}
            </Descriptions>
            <Divider />
            <List
              header={<Title level={4}>Owner(s) Information</Title>}
              bordered
              dataSource={owners}
              renderItem={(owner, idx) => (
                <List.Item>
                  <Card className="owner-review-card">
                    <Title level={5}>Owner {idx + 1}</Title>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Text strong>Name:</Text> {owner.name}
                      </Col>
                      <Col span={24}>
                        <Text strong>Email:</Text> {owner.email}
                      </Col>
                      <Col span={24}>
                        <Text strong>Phone:</Text> {owner.phone}
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
              style={{ marginBottom: 24 }}
            />
            <Divider />
            <div className="payment-section">
              <Title level={4}>Order Summary</Title>
              <Descriptions column={1} size="small" bordered className="order-summary-descriptions">
                <Descriptions.Item label="Business Type">{businessInfo.businessType}</Descriptions.Item>
                <Descriptions.Item label="Service Fee">${BUSINESS_PRICING[businessInfo.businessType]?.service.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Gov't Filing Fee">${BUSINESS_PRICING[businessInfo.businessType]?.gov.toFixed(2)}</Descriptions.Item>
                {selectedAddOns.length > 0 && (
                  <Descriptions.Item label="Add-Ons">
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {selectedAddOns.map(addonKey => {
                        const addOn = ADD_ONS.find(a => a.key === addonKey);
                        return addOn ? (
                          <li key={addonKey}>
                            {addOn.name} <span style={{ float: 'right' }}>${addOn.price.toFixed(2)}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label={<Text strong>Total Amount</Text>}>
                  <Text strong>${totalAmount.toFixed(2)}</Text>
                </Descriptions.Item>
              </Descriptions>
              <div style={{ marginTop: 24 }}>
                <Title level={4}>Payment</Title>
                <PayPalScriptProvider options={{ 
                  clientId: PAYPAL_CLIENT_ID,
                  currency: PAYPAL_CURRENCY as any,
                }}>
                  <PayPalButtons
                    style={PAYPAL_STYLE as any}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </Card>
        </motion.div>
      ),
    }
  ];

  const next = () => {
    // Add validation for the current step before proceeding
    let isValid = true;
    if (current === 0) {
      // Business Info step validation (already handled by individual forms)
      // We can add more specific validation here if needed
    } else if (current === 1) {
      // Owner Info step validation
      owners.forEach((owner, idx) => {
        const nameError = !owner.name ? 'Name is required' : '';
        const emailError = validateEmail(owner.email);
        const phoneError = validatePhone(owner.phone);
        if (nameError || emailError || phoneError) {
          setValidationErrors(prev => ({ ...prev, [`owner${idx}_name`]: nameError, [`owner${idx}_email`]: emailError, [`owner${idx}_phone`]: phoneError }));
          isValid = false;
        }
      });
    }

    if (isValid) {
      if (current === steps.length - 1) {
        submitFormData();
      } else {
        setCurrent(current + 1);
        setValidationErrors({}); // Clear errors when moving to the next step
      }
    } else {
      message.error('Please fix the validation errors before proceeding');
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    setValidationErrors({}); // Clear errors when moving back
  };

  return (
    <div className="form-container">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/business-formation')}
        style={{ marginBottom: 16 }}
      >
        Back to Business Types
      </Button>
      <Card className="main-card">
        <Title level={2} className="form-title">
          Start Your {businessInfo.businessType}
        </Title>
        <Progress 
          percent={((current + 1) / steps.length) * 100} 
          showInfo={false}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
        <div className="steps-content" style={{ marginTop: 24 }}>
          <Spin spinning={loading}>
            {Object.keys(validationErrors).length > 0 && (
              <Alert
                message="Please fix the following errors:"
                description={
                  <ul>
                    {Object.entries(validationErrors).map(([key, error]) => (
                      <li key={key}>{error}</li>
                    ))}
                  </ul>
                }
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
              />
            )}
            <AnimatePresence mode="wait">
              {steps[current].content}
            </AnimatePresence>
          </Spin>
        </div>
        <div className="steps-action" style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button 
              style={{ marginRight: 8 }} 
              onClick={prev}
              icon={<ArrowLeftOutlined />}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={next}
              loading={loading}
              icon={<ArrowRightOutlined />}
            >
              Next
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={saveProgress}
              loading={saving}
            >
              Save Progress
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FormPage;
