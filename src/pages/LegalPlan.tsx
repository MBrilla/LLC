import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/LegalPlan.css";

const LegalPlan = () => {
  const planOptions = [
    {
      title: "Basic Plan",
      price: "$9.99/month",
      features: [
        "Unlimited 30-minute attorney consultations",
        "Document review",
        "Annual business evaluation",
        "Tax advice"
      ]
    },
    {
      title: "Premium Plan",
      price: "$19.99/month",
      features: [
        "All Basic Plan features",
        "Unlimited 60-minute attorney consultations",
        "Priority document review",
        "Business formation services",
        "Trademark registration"
      ]
    },
    {
      title: "Business Plan",
      price: "$29.99/month",
      features: [
        "All Premium Plan features",
        "Unlimited consultations",
        "Contract review and drafting",
        "Business compliance monitoring",
        "Priority support"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Legal Plan - LegalZoom Clone</title>
        <meta name="description" content="Choose the right legal plan for your needs. Get access to attorneys, document review, and more." />
      </Helmet>

      <div className="legal-plan">
        <div className="lp-container">
          <div className="lp-header">
            <h1>Choose Your Legal Plan</h1>
            <p>Get the legal help you need with our flexible subscription plans</p>
          </div>

          <div className="plans-grid">
            {planOptions.map((plan, index) => (
              <div key={index} className="plan-card">
                <h3>{plan.title}</h3>
                <div className="price">{plan.price}</div>
                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Link to="/signup" className="select-plan-button">Select Plan</Link>
              </div>
            ))}
          </div>

          <div className="lp-features">
            <h2>Why Choose Our Legal Plans</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Expert Attorneys</h3>
                <p>Access to experienced legal professionals</p>
              </div>
              <div className="feature-item">
                <h3>Flexible Options</h3>
                <p>Choose the plan that fits your needs</p>
              </div>
              <div className="feature-item">
                <h3>24/7 Support</h3>
                <p>Get help whenever you need it</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPlan; 