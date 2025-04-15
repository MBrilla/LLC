import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/ScheduleCall.css";

const ScheduleCall = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    legalTopic: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Schedule a Call - LegalZoom Clone</title>
        <meta name="description" content="Schedule a consultation call with our legal experts. Get personalized legal advice for your needs." />
      </Helmet>

      <div className="schedule-call">
        <div className="sc-container">
          <div className="sc-header">
            <h1>Schedule a Consultation</h1>
            <p>Book a call with our legal experts to discuss your needs</p>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Time</label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="legalTopic">Legal Topic</label>
              <select
                id="legalTopic"
                name="legalTopic"
                value={formData.legalTopic}
                onChange={handleChange}
                required
              >
                <option value="">Select a topic</option>
                <option value="business">Business Formation</option>
                <option value="estate">Estate Planning</option>
                <option value="ip">Intellectual Property</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit" className="submit-button">Schedule Call</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ScheduleCall; 