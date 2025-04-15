import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/IntellectualProperty.css';

const IntellectualProperty = () => {
  const ipOptions = [
    {
      title: 'Trademark Registration',
      description: 'Protect your brand name, logo, or slogan',
      price: '$199 + filing fees',
      icon: '™️',
      path: '/ip/trademarks'
    },
    {
      title: 'Copyright Registration',
      description: 'Protect your creative works',
      price: '$114 + filing fees',
      icon: '©️',
      path: '/ip/copyrights'
    },
    {
      title: 'Patent Services',
      description: 'Protect your inventions and innovations',
      price: 'Starting at $699',
      icon: '🔬',
      path: '/ip/patents'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Intellectual Property - LegalZoom Clone</title>
        <meta name="description" content="Protect your intellectual property with LegalZoom. Register trademarks, copyrights, and patents." />
      </Helmet>
      <div className="intellectual-property">
        <div className="container">
          <h1>Protect Your Intellectual Property</h1>
          <p className="subtitle">Safeguard your brand, creative works, and inventions with our IP protection services</p>
          <div className="ip-options">
            {ipOptions.map((option, index) => (
              <div key={index} className="ip-card">
                <div className="card-icon">{option.icon}</div>
                <h2>{option.title}</h2>
                <p className="price">{option.price}</p>
                <p className="description">{option.description}</p>
                <Link to={option.path} className="cta-button">Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntellectualProperty; 