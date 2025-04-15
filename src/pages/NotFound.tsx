import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - LegalZoom Clone</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="not-found">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="home-link">Return to Home</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound; 