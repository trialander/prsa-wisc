import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MyNavbar from "./components/MyNavbar.jsx";
import Footer from "./components/Footer.jsx";
import Banner from "./components/Banner.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import Contact from "./pages/Contact.jsx";
import Donate from "./pages/Donate.jsx";

function App() {
  return (
    <Router basename="/prsa-wisc/">
      <header>
        <Banner/>
        <MyNavbar />
      </header>
      <main>
        <Container className="mt-4 mb-5 px-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/donate" element={<Donate/>} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
