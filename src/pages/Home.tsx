import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>LLC - Legal Services Made Simple</title>
        <meta name="description" content="Get legal help for your business, estate planning, and more. Simple, affordable, and reliable legal services." />
      </Helmet>

      <div className="home">
        <section className="hero">
          <div className="hero-content">
            <h1>Legal Services Made Simple</h1>
            <p>Get the legal help you need, when you need it. From business formation to estate planning, we've got you covered.</p>
            <div className="hero-buttons">
              <Link to="/business" className="primary-button">Start Your Business</Link>
              <Link to="/legal-plan" className="secondary-button">View Legal Plans</Link>
            </div>
          </div>
        </section>

        <section className="popular-services">
          <div className="container">
            <h2>Popular Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3>Business Formation</h3>
                <p>Start your business with confidence. Choose from LLC, Corporation, or DBA.</p>
                <Link to="/business" className="learn-more">Learn More</Link>
              </div>
              <div className="service-card">
                <h3>Estate Planning</h3>
                <p>Protect your assets and loved ones with wills, trusts, and more.</p>
                <Link to="/estate-planning" className="learn-more">Learn More</Link>
              </div>
              <div className="service-card">
                <h3>Intellectual Property</h3>
                <p>Protect your ideas with trademarks, copyrights, and patents.</p>
                <Link to="/ip" className="learn-more">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="why-choose">
          <div className="container">
            <h2>Why Choose Us</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Expert Legal Help</h3>
                <p>Access to experienced attorneys and legal professionals</p>
              </div>
              <div className="feature-item">
                <h3>Affordable Pricing</h3>
                <p>Transparent pricing with no hidden fees</p>
              </div>
              <div className="feature-item">
                <h3>Simple Process</h3>
                <p>Easy-to-use platform with step-by-step guidance</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;