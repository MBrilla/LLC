import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, Drawer, Space } from 'antd';
import type { MenuProps } from 'antd';
import '../styles/Navigation.css';
import logo from '../assets/Logo2.png';
import { FaBars } from 'react-icons/fa';
import { CloseOutlined } from '@ant-design/icons';

const Navigation: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

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
        {isMobile ? (
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        ) : (
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
        )}

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
          icon={
            <div className="mobile-menu-icon-container">
              <FaBars size={24} />
            </div>
          }
          onClick={showMobileMenu}
        />

        {/* Mobile Menu Drawer */}
        <Drawer
          title={
            <div className="drawer-header">
              <img src={logo} alt="LLC-671" className="drawer-logo" />
              <Button
                type="text"
                icon={<CloseOutlined style={{ fontSize: '20px' }} />}
                onClick={closeMobileMenu}
                className="close-button"
              />
            </div>
          }
          placement="right"
          onClose={closeMobileMenu}
          open={mobileMenuVisible}
          className="mobile-drawer"
          width={280}
        >
          <ul className="mobile-menu-list">
            {menuItems.map(item => {
              if (item && 'key' in item && 'label' in item) {
                const menuItem = item as { key: string; label: React.ReactNode };
                return (
                  <li key={menuItem.key} className="mobile-menu-list-item">
                    {React.isValidElement(menuItem.label) ? (
                      React.cloneElement(menuItem.label as React.ReactElement, { onClick: closeMobileMenu })
                    ) : (
                      <Link to={menuItem.key} onClick={closeMobileMenu}>
                        {menuItem.label}
                      </Link>
                    )}
                  </li>
                );
              }
              return null;
            })}
          </ul>

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