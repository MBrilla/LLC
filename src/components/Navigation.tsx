import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, Drawer, Space } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import '../styles/Navigation.css';
import logo from '../assets/Logo2.png';

const Navigation: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();

  // Check if we should show the Get Started button
  const shouldShowGetStarted = !['/form', '/payment-success'].includes(location.pathname);

  const menuItems: MenuProps['items'] = [
    {
      key: '/business-formation',
      label: <Link to="/business-formation">Start a Business</Link>,
    },
    {
      key: '/contact',
      label: <Link to="/contact">Contact Us</Link>,
    },
  ];

  const showMobileMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="main-menu"
          />
          <Space className="nav-buttons">
            {shouldShowGetStarted && (
              <Button type="primary" href="/form">
                Get Started
              </Button>
            )}
          </Space>
        </div>

        {/* Mobile Menu Button */}
        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={showMobileMenu}
        />

        {/* Mobile Menu Drawer */}
        <Drawer
          title={
            <div className="drawer-header">
              <img src={logo} alt="LegalZoom Clone" className="drawer-logo" />
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={closeMobileMenu}
                className="close-button"
              />
            </div>
          }
          placement="right"
          onClose={closeMobileMenu}
          open={mobileMenuVisible}
          className="mobile-drawer"
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="mobile-menu"
            onClick={closeMobileMenu}
          />
          <div className="mobile-buttons">
            {shouldShowGetStarted && (
              <Button type="primary" block href="/form">
                Get Started
              </Button>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navigation; 