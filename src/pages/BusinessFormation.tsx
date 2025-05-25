import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/BusinessFormation.css';

const BusinessFormation = () => {
  const navigate = useNavigate();
  const businessTypes = [
    {
      title: 'Limited Liability Company \n(LLC)',
      description: 'Protect your personal assets while maintaining flexibility in management and taxation.',
      price: '$100 + $250 Guam filing fee',
      type: 'LLC',
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
      price: '$149 + $300 Guam filing fee',
      type: 'Corporation',
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
      price: '$99 + $25 Guam filing fee',
      type: 'DBA',
      features: [
        'Quick and simple process',
        'No new entity required',
        'Operate under a different name',
        'Maintain existing business structure'
      ]
    },
    {
      title: 'Nonprofit \n(501c3)',
      description: 'A structure designed to support a public or social benefit that can be eligible for tax breaks.',
      price: '$149 + $300 Guam filing fee',
      type: 'Nonprofit',
      features: [
        'Tax-exempt status',
        'Eligible for grants',
        'Public benefit focus',
        'Limited liability protection'
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
                <button className="start-button" onClick={() => navigate('/form', { state: { businessType: type.type } })}>
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="why-choose-us">
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
                <h3>Competitive Pricing</h3>
                <p>Affordable rates without compromising quality</p>
              </div>
            </div>
            <div className="why-choose-blurb">
              <p className="intro">Forming a Guam LLC shouldn't require hiring a pricey lawyer or wasting hours at the Guam Department of Revenue and Taxation. LLC 671 makes it simple — no legal jargon, no government lines, no stress.</p>
              <p className="process">You answer a few questions. We prepare and file your documents — fast, accurate, and at a fraction of the cost.</p>
              <p className="skip">Skip the lawyer. Skip the line. Start your business smarter.</p>
              <p className="final">LLC 671 — Guam's local, affordable LLC formation service.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
      <footer className="bf-footer">
        <p>LLC 671 is not a law firm and does not provide legal advice. We prepare and file documents based on information you provide.</p>
      </footer>
    </div>
    </>
  );
};

export default BusinessFormation; 