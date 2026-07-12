import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Songs from "./pages/Songs";
import Videos from "./pages/Videos";
import Admin from "./pages/Admin";
import History from "./pages/History";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<History />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;