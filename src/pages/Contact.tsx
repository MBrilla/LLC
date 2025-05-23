import { Helmet } from 'react-helmet-async';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Contact.css';

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const mailtoLink = `mailto:support@llc671.com?subject=Contact Form: ${values.name}&body=Name: ${values.name}%0D%0AEmail: ${values.email}%0D%0A%0D%0AMessage:%0D%0A${values.message}`;
    window.location.href = mailtoLink;
    message.success('Thank you for your message. We will get back to you soon!');
    form.resetFields();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - LLC 671</title>
        <meta name="description" content="Get in touch with our team for any questions about starting your business." />
      </Helmet>

      <div className="contact-page">
        <div className="contact-container">
          <h1>Get in Touch</h1>
          <p className="email-address">
            <MailOutlined style={{ marginRight: '8px' }} />
            Email us at: support@llc671.com
          </p>
          
          <Form
            form={form}
            name="contact"
            onFinish={onFinish}
            layout="vertical"
            className="contact-form"
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
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Your email" 
                size="large"
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
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
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