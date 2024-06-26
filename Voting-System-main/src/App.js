import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./components/pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import VoterLogin from "./components/VoterLogin";
import SignUp from "./components/SignUp";
import AdminLogin from "./components/AdminLogin";
import VoterDashboard from "./components/pages/VoterDashboard";
import AdminDashboard from "./components/pages/AdminDashboard";
import BallotPage from "./components/pages/BallotPage";
import Activationpage from "./components/pages/ActivationPage";
import PageNotFound from "./components/PageNoteFound";
import Loader from "./components/Loader.jsx";
import UserProtectedRoute from "./components/Routes/UserProtectedRoute.jsx";
import AdminProtectedRoute from "./components/Routes/AdminProtectedRoute.jsx";
import ElectionProtectedRoute from "./components/Routes/ElectionProtectedRoute.jsx";
import SuccessPage from "./components/pages/SuccessPage.jsx";
import Contact from "./components/pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/pages/About.jsx";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/success" exact Component={SuccessPage} />

          <Route path="/admin-login" exact Component={AdminLogin} />
          <Route path="/voter-signup" exact Component={SignUp} />
          <Route path="/voter-login" exact Component={VoterLogin} />
          <Route path="/contact" exact Component={Contact} />
          <Route path="/about" exact Component={About} />
          {/* <Route path="/voter" Component={<UserProtectedRoute />}>
            <Route path="voter-dashboard" exact Component={VoterDashboard} />
          </Route> */}
          <Route path="/voter" element={<UserProtectedRoute />}>
            <Route path="voter-dashboard" element={<VoterDashboard />} />
          </Route>
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route path="admin-dashboard" exact Component={AdminDashboard} />
          </Route>
          <Route path="/ballot" element={<ElectionProtectedRoute />}>
            <Route path="" element={<BallotPage />} />
          </Route>
          <Route path="/loading" exact Component={Loader} />
          <Route
            path="/activation/:activation_token"
            exact
            Component={Activationpage}
          />
          <Route path="*" exact Component={PageNotFound} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
