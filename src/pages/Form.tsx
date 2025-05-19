import React, { useState } from 'react';
import { Steps, Button, Typography, Form, Input, Select, Space, Descriptions, List, Spin, Alert, Card, Divider, Row, Col, Progress } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ArrowLeftOutlined, CheckCircleOutlined, UserOutlined, BankOutlined, DollarOutlined, FileTextOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../styles/Form.css';

// Import form components
import LLCForm from '../components/forms/LLCForm';
import CorporationForm from '../components/forms/CorporationForm';
import NonprofitForm from '../components/forms/NonprofitForm';
import DBAForm from '../components/forms/DBAForm';

const { Title, Text } = Typography;
const { Option } = Select;

const businessTypeOptions = [
  { label: 'LLC', value: 'LLC' },
  { label: 'Corporation', value: 'Corporation' },
  { label: 'Nonprofit', value: 'Nonprofit' },
  { label: 'DBA', value: 'DBA' },
];

const FormPage = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const initialBusinessType = location.state?.businessType || 'LLC';

  // Form state
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    businessAddress: '',
    businessType: initialBusinessType,
  });
  const [owners, setOwners] = useState([
    { name: '', email: '', phone: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers for dynamic owner fields
  const addOwner = () => setOwners([...owners, { name: '', email: '', phone: '' }]);
  const removeOwner = (idx: number) => setOwners(owners.filter((_, i) => i !== idx));
  const updateOwner = (idx: number, field: string, value: string) => {
    setOwners(owners.map((owner, i) => i === idx ? { ...owner, [field]: value } : owner));
  };

  // Stripe payment handler
  const handleStripeCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: businessInfo.businessType,
          businessInfo,
          owners
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to create Stripe session.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create Stripe session.');
      setLoading(false);
    }
  };

  // Render the appropriate form based on business type
  const renderBusinessForm = () => {
    switch (businessInfo.businessType) {
      case 'LLC':
        return <LLCForm onValuesChange={setBusinessInfo} initialValues={businessInfo} />;
      case 'Corporation':
        return <CorporationForm onValuesChange={setBusinessInfo} initialValues={businessInfo} />;
      case 'Nonprofit':
        return <NonprofitForm onValuesChange={setBusinessInfo} initialValues={businessInfo} />;
      case 'DBA':
        return <DBAForm onValuesChange={setBusinessInfo} initialValues={businessInfo} />;
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
        <Card className="form-card">
          {renderBusinessForm()}
        </Card>
      ),
    },
    {
      title: 'Owner Info',
      icon: <UserOutlined />,
      content: (
        <Card className="form-card">
          <Form layout="vertical">
            {owners.map((owner, idx) => (
              <Card 
                key={idx} 
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
      ),
    },
    {
      title: 'Review',
      icon: <FileTextOutlined />,
      content: (
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
        </Card>
      ),
    },
    {
      title: 'Payment',
      icon: <DollarOutlined />,
      content: (
        <Card className="form-card">
          <div style={{ textAlign: 'center' }}>
            <Title level={3}>Complete Your Purchase</Title>
            <Descriptions 
              bordered 
              column={1} 
              size="middle" 
              style={{ marginBottom: 24 }}
              className="payment-descriptions"
            >
              <Descriptions.Item label="Business Type">{businessInfo.businessType}</Descriptions.Item>
              <Descriptions.Item label="Total Amount">$299.00</Descriptions.Item>
            </Descriptions>
            {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
            <Button 
              type="primary" 
              size="large" 
              onClick={handleStripeCheckout} 
              disabled={loading}
              icon={<DollarOutlined />}
              style={{ minWidth: 200 }}
            >
              {loading ? <Spin /> : 'Pay with Card'}
            </Button>
          </div>
        </Card>
      ),
    },
  ];

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

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
          style={{ marginBottom: 32 }}
        />
        <Steps 
          current={current} 
          style={{ marginBottom: 32 }}
          items={steps.map(item => ({
            title: item.title,
            icon: item.icon
          }))}
        />
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          <Button 
            disabled={current === 0} 
            onClick={prev}
            icon={<ArrowLeftOutlined />}
          >
            Previous
          </Button>
          {current < steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={next}
              icon={<ArrowRightOutlined />}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={() => navigate('/')}
              icon={<CheckCircleOutlined />}
            >
              Finish
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FormPage;
