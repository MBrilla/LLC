import { Link } from 'react-router-dom';

interface BusinessTypeCardProps {
  title: string;
  description: string;
  price: string;
  icon: string;
  path: string;
}

const BusinessTypeCard = ({ title, description, price, icon, path }: BusinessTypeCardProps) => {
  return (
    <div className="business-type">
      <div className="card-icon">{icon}</div>
      <h2>{title}</h2>
      <p className="price">{price}</p>
      <p className="description">{description}</p>
      <Link to={path} className="cta-button">
        Get Started
      </Link>
    </div>
  );
};

export default BusinessTypeCard; 