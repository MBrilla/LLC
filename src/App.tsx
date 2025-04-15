import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BusinessFormation from "./pages/BusinessFormation";
import LegalPlan from "./pages/LegalPlan";
import ScheduleCall from "./pages/ScheduleCall";
import AttorneyDirectory from "./pages/AttorneyDirectory";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/business" element={<BusinessFormation />} />
                <Route path="/business/llc" element={<Navigate to="/business" />} />
                <Route path="/business/corporation" element={<Navigate to="/business" />} />
                <Route path="/business/dba" element={<Navigate to="/business" />} />
                <Route path="/legal-plan" element={<LegalPlan />} />
                <Route path="/schedule-call" element={<ScheduleCall />} />
                <Route path="/attorney-directory" element={<AttorneyDirectory />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
