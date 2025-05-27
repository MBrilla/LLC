import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme, Spin, App as AntdApp } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './styles/theme.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PaymentSuccess from './pages/PaymentSuccess';

// Lazy load pages
const BusinessFormation = lazy(() => import('./pages/BusinessFormation'));
const Form = lazy(() => import('./pages/Form'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const { Content } = Layout;

// Loading component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '400px' 
  }}>
    <Spin size="large" />
  </div>
);

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#002D62',
            colorSuccess: '#52C41A',
            colorWarning: '#FAAD14',
            colorError: '#F5222D',
            colorInfo: '#002D62',
            borderRadius: 6,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <AntdApp>
          <Router>
            <ScrollToTop />
            <Layout className="layout">
              <Navigation />
              <Content className="main-content">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/business-formation" replace />} />
                    <Route path="/business-formation" element={<BusinessFormation />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Content>
              <Footer />
            </Layout>
          </Router>
        </AntdApp>
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
