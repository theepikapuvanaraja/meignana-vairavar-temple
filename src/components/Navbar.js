import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import meygnana_vairavar from "../assets/meygnana_vairavar.jpeg";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">

            <div className="logo">
        <img src={meygnana_vairavar} alt="meygnana_vairavar" className="logoImg" />

        <div>
          <h3>மெய்ஞான வைரவர் கோவில்</h3>
          <p>Meygnana Vairavar Temple</p>
        </div>
      </div>

      {/* Hamburger */}
      <div 
className="menuIcon"
onClick={()=>setOpen(!open)}
>

{open ? "✕" : "☰"}

</div>

      {/* Links */}
      <div className={open ? "links active" : "links"}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
        <Link to="/history" onClick={() => setOpen(false)}>History</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>

    </nav>
  );
}

export default Navbar;