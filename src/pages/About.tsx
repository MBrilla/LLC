import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card } from 'antd';
import { LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import '../styles/About.css';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'With over 15 years of experience in business law, Sarah leads our mission to make legal services accessible to everyone.',
    linkedin: '#',
    email: 'sarah@example.com'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Michael brings 12 years of operational excellence and has helped thousands of businesses get started.',
    linkedin: '#',
    email: 'michael@example.com'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Lead Attorney',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Emily specializes in business formation and has guided numerous entrepreneurs through their legal journey.',
    linkedin: '#',
    email: 'emily@example.com'
  },
  {
    name: 'David Kim',
    role: 'Customer Success Director',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    bio: 'David ensures every client receives exceptional service and support throughout their business journey.',
    linkedin: '#',
    email: 'david@example.com'
  }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - LegalZoom Clone</title>
        <meta name="description" content="Learn about our team and mission to make legal services accessible to everyone." />
      </Helmet>

      <div className="about-page">
        <div className="about-hero">
          <div className="about-container">
            <h1>Our Story</h1>
            <p className="mission-statement">
              We're on a mission to make legal services accessible, affordable, and simple for everyone.
              Since our founding, we've helped thousands of entrepreneurs start and grow their businesses.
            </p>
          </div>
        </div>

        <div className="about-container">
          <section className="values-section">
            <h2>Our Values</h2>
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} md={8}>
                <div className="value-card">
                  <h3>Accessibility</h3>
                  <p>Making legal services available to everyone, regardless of their background or resources.</p>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="value-card">
                  <h3>Innovation</h3>
                  <p>Continuously improving our services through technology and customer feedback.</p>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="value-card">
                  <h3>Integrity</h3>
                  <p>Building trust through transparency and ethical business practices.</p>
                </div>
              </Col>
            </Row>
          </section>

          <section className="team-section">
            <h2>Meet Our Team</h2>
            <Row gutter={[32, 32]}>
              {teamMembers.map((member, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card
                    hoverable
                    className="team-card"
                    cover={
                      <div className="team-image-container">
                        <img alt={member.name} src={member.image} />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={member.name}
                      description={member.role}
                    />
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-social">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedinOutlined />
                      </a>
                      <a href={`mailto:${member.email}`}>
                        <MailOutlined />
                      </a>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </div>
      </div>
    </>
  );
};

export default About; 