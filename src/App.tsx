import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BusinessFormation from './pages/BusinessFormation';
import Form from './pages/Form';
import AttorneyDirectory from './pages/AttorneyDirectory';
import LegalPlan from './pages/LegalPlan';
import LegalHelp from './pages/LegalHelp';
import IntellectualProperty from './pages/IntellectualProperty';
import WillsTrusts from './pages/WillsTrusts';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './styles/theme.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const { Content } = Layout;

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
        <Router>
          <ScrollToTop />
          <Layout className="layout">
            <Navigation />
            <Content className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/business-formation" replace />} />
                <Route path="/business-formation" element={<BusinessFormation />} />
                <Route path="/form" element={<Form />} />
                <Route path="/attorney-directory" element={<AttorneyDirectory />} />
                <Route path="/legal-plan" element={<LegalPlan />} />
                <Route path="/legal-help" element={<LegalHelp />} />
                <Route path="/intellectual-property" element={<IntellectualProperty />} />
                <Route path="/wills-trusts" element={<WillsTrusts />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>
            <Footer />
          </Layout>
        </Router>
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
