import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/WillsTrusts.css';

const WillsTrusts = () => {
  const estatePlanningOptions = [
    {
      title: 'Last Will & Testament',
      description: 'Ensure your assets are distributed according to your wishes',
      price: '$89',
      icon: '📜',
      path: '/estate-planning/will'
    },
    {
      title: 'Living Trust',
      description: 'Protect your assets and avoid probate',
      price: '$279',
      icon: '🏦',
      path: '/estate-planning/trust'
    },
    {
      title: 'Power of Attorney',
      description: 'Designate someone to make decisions on your behalf',
      price: '$35',
      icon: '✍️',
      path: '/estate-planning/power-of-attorney'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wills & Trusts - LegalZoom Clone</title>
        <meta name="description" content="Create your will, living trust, or power of attorney with LegalZoom. Protect your loved ones and your assets." />
      </Helmet>
      <div className="wills-trusts">
        <div className="container">
          <h1>Estate Planning Made Simple</h1>
          <p className="subtitle">Protect your loved ones and your assets with our comprehensive estate planning services</p>
          <div className="estate-planning-options">
            {estatePlanningOptions.map((option, index) => (
              <div key={index} className="estate-planning-card">
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

export default WillsTrusts; 