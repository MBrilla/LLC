import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/AttorneyDirectory.css";

const AttorneyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const specialties = [
    "Business Law",
    "Estate Planning",
    "Intellectual Property",
    "Family Law",
    "Real Estate",
    "Tax Law"
  ];

  const attorneys = [
    {
      name: "John Smith",
      specialty: "Business Law",
      location: "New York, NY",
      rating: 4.8,
      experience: "15 years",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Sarah Johnson",
      specialty: "Estate Planning",
      location: "Los Angeles, CA",
      rating: 4.9,
      experience: "12 years",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Michael Brown",
      specialty: "Intellectual Property",
      location: "Chicago, IL",
      rating: 4.7,
      experience: "10 years",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Emily Davis",
      specialty: "Family Law",
      location: "Houston, TX",
      rating: 4.9,
      experience: "8 years",
      image: "https://via.placeholder.com/150"
    }
  ];

  const filteredAttorneys = attorneys.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attorney.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || attorney.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <>
      <Helmet>
        <title>Attorney Directory - LegalZoom Clone</title>
        <meta name="description" content="Find experienced attorneys in various legal specialties. Connect with legal experts for your needs." />
      </Helmet>

      <div className="attorney-directory">
        <div className="ad-container">
          <div className="ad-header">
            <h1>Find an Attorney</h1>
            <p>Connect with experienced legal professionals in your area</p>
          </div>

          <div className="search-filters">
            <input
              type="text"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="specialty-select"
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          <div className="attorneys-grid">
            {filteredAttorneys.map((attorney, index) => (
              <div key={index} className="attorney-card">
                <img src={attorney.image} alt={attorney.name} className="attorney-image" />
                <div className="attorney-info">
                  <h3>{attorney.name}</h3>
                  <p className="specialty">{attorney.specialty}</p>
                  <p className="location">{attorney.location}</p>
                  <div className="rating">
                    <span>⭐ {attorney.rating}</span>
                    <span>{attorney.experience} experience</span>
                  </div>
                  <button className="contact-button">Contact Attorney</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AttorneyDirectory; 