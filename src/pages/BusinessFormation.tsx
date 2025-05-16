import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/BusinessFormation.css';

const BusinessFormation = () => {
  const businessTypes = [
    {
      title: 'Limited Liability Company \n(LLC)',
      description: 'Protect your personal assets while maintaining flexibility in management and taxation.',
      path: '/business/llc',
      price: 'Starting at $0 + state filing fees',
      features: [
        'Personal asset protection',
        'Flexible management structure',
        'Pass-through taxation',
        'Less paperwork than corporations'
      ]
    },
    {
      title: 'Corporation \n(S corp or C corp)',
      description: 'Establish a separate legal entity with potential tax advantages and growth opportunities.',
      path: '/business/corporation',
      price: 'Starting at $0 + state fees',
      features: [
        'Strongest liability protection',
        'Ability to raise capital',
        'Potential tax advantages',
        'Professional image'
      ]
    },
    {
      title: 'DBA \n(Doing Business As)',
      description: 'Operate under a different name without forming a new business entity.',
      path: '/business/dba',
      price: 'Starting at $0 + state fees',
      features: [
        'Quick and simple process',
        'No new entity required',
        'Operate under a different name',
        'Maintain existing business structure'
      ]
    },
    {
      title: 'Nonprofit \n(501c3)',
      description: 'Operate under a different name without forming a new business entity.',
      path: '/business/nonprofit',
      price: 'Starting at $0 + state fees',
      features: [
        'lorem ipsum lorem ipsum',
        'lorem ipsum lorem ipsum lorem ipsum',
        'lorem ipsum lorem ipsum',
        'lorem ipsum lorem ipsum'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Formation</title>
        <meta name="description" content="Start your business with confidence. Choose the right business structure for your needs." />
      </Helmet>

      <div className="business-formation">
        <div className="bf-container">
          <div className="bf-header">
            <h1>Start Your Business in Minutes</h1>
          </div>

          <div className="business-types-grid">
            {businessTypes.map((type, index) => (
              <div key={index} className="business-type-card">
                <h3>{type.title}</h3>
                <div className="price">{type.price}</div>
                <p className="description">{type.description}</p>
                <ul className="features-list">
                  {type.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Link to={type.path} className="start-button">Get Started</Link>
              </div>
            ))}
          </div>

          <div className="bf-features">
            <h2>Why Form Your Business With Us</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Expert Guidance</h3>
                <p>Get help choosing the right business structure</p>
              </div>
              <div className="feature-item">
                <h3>Fast Processing</h3>
                <p>Quick and efficient business formation</p>
              </div>
              <div className="feature-item">
                <h3>Ongoing Support</h3>
                <p>Access to legal and business resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessFormation; 