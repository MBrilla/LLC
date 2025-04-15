import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/LegalHelp.css';

const LegalHelp = () => {
  const legalServices = [
    {
      title: 'Legal Plan',
      description: 'Get unlimited legal advice and document review for a low monthly fee',
      price: '$9.99/month',
      icon: '📋',
      path: '/legal-plan'
    },
    {
      title: 'Attorney Directory',
      description: 'Find a qualified attorney in your area',
      price: 'Free',
      icon: '👨‍⚖️',
      path: '/attorney-directory'
    },
    {
      title: 'Schedule a Call',
      description: 'Get personalized legal advice from an attorney',
      price: 'Starting at $39',
      icon: '📞',
      path: '/schedule-call'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Legal Help - LegalZoom Clone</title>
        <meta name="description" content="Get legal help from experienced attorneys. Choose from our legal plan, attorney directory, or schedule a consultation." />
      </Helmet>
      <div className="legal-help">
        <div className="container">
          <h1>Get Legal Help from Experienced Attorneys</h1>
          <p className="subtitle">Access legal advice and support when you need it most</p>
          <div className="legal-services">
            {legalServices.map((service, index) => (
              <div key={index} className="legal-service-card">
                <div className="card-icon">{service.icon}</div>
                <h2>{service.title}</h2>
                <p className="price">{service.price}</p>
                <p className="description">{service.description}</p>
                <Link to={service.path} className="cta-button">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalHelp; 