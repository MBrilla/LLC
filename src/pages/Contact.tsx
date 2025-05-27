import { Helmet } from 'react-helmet-async';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, UserOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';
import '../styles/Contact.css';

const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!FORMSPREE_ENDPOINT) throw new Error('Formspree endpoint is not set in environment variables.');
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setSuccess(true);
      form.resetFields();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - LLC 671</title>
        <meta name="description" content="Get in touch with our team for any questions about starting your business." />
      </Helmet>
      <div className="contact-page">
        <div className="contact-container">
          <h1>Contact Us</h1>
          {success && (
            <Alert
              message={<span><CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />Thank you for your message! We will get back to you soon.</span>}
              type="success"
              showIcon
              style={{ marginBottom: 24, textAlign: 'center' }}
            />
          )}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 24, textAlign: 'center' }}
            />
          )}
          <Form
            form={form}
            name="contact"
            onFinish={onFinish}
            layout="vertical"
            className="contact-form"
            style={{ maxWidth: 500, margin: '0 auto' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Your name"
                size="large"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Your email"
                size="large"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Your message"
                size="large"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                disabled={loading}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Contact; 