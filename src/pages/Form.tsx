import { useState } from 'react';
import { Steps, Button, Typography, Form, Input, Descriptions, List, Card, Divider, Row, Col, Progress, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ArrowLeftOutlined, CheckCircleOutlined, UserOutlined, BankOutlined, FileTextOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import '../styles/Form.css';

// Import form components
import LLCForm from '../components/forms/LLCForm';
import CorporationForm from '../components/forms/CorporationForm';
import NonprofitForm from '../components/forms/NonprofitForm';
import DBAForm from '../components/forms/DBAForm';

const { Title, Text } = Typography;

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

  // Handlers for dynamic owner fields
  const addOwner = () => setOwners([...owners, { name: '', email: '', phone: '' }]);
  const removeOwner = (idx: number) => setOwners(owners.filter((_, i) => i !== idx));
  const updateOwner = (idx: number, field: string, value: string) => {
    setOwners(owners.map((owner, i) => i === idx ? { ...owner, [field]: value } : owner));
  };

  // Form submission handler
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Prepare the data for Formspree
      let formData: Record<string, any> = { ...businessInfo };
      // If businessPurposeOther is present, use it as businessPurpose and keep the dropdown value as businessPurposeDropdown
      if ((businessInfo as any)['businessPurposeOther']) {
        formData.businessPurposeDropdown = (businessInfo as any)['businessPurpose'];
        formData.businessPurpose = (businessInfo as any)['businessPurposeOther'];
      }
      // Flatten owners array for Formspree
      const ownerData: Record<string, string> = {};
      owners.forEach((owner, idx) => {
        ownerData[`owner${idx + 1}_name`] = owner.name;
        ownerData[`owner${idx + 1}_email`] = owner.email;
        ownerData[`owner${idx + 1}_phone`] = owner.phone;
      });
      formData = { ...formData, ...ownerData };

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

      message.success('Form submitted successfully! We will contact you shortly.');
      navigate('/business-formation');
    } catch (err) {
      message.error('Failed to submit form. Please try again.');
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
    }
  ];

  const next = () => {
    if (current === steps.length - 1) {
      handleSubmit();
    } else {
      setCurrent(current + 1);
    }
  };

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
          <Button 
            type="primary" 
            onClick={next}
            icon={current === steps.length - 1 ? <CheckCircleOutlined /> : <ArrowRightOutlined />}
            loading={loading}
          >
            {current === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FormPage;
