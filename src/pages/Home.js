import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react";

import temple1 from "../assets/temple1.jpeg";
import temple2 from "../assets/temple2.jpeg";
import temple3 from "../assets/temple3.jpeg";
import temple4 from "../assets/temple4.jpeg";
const images = [temple1, temple2, temple3, temple4];

function Home() {
  const nav = useNavigate();
        const [currentImage, setCurrentImage] = useState(0);

       useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="home">

      {/* HERO */}
        <div
          className="hero"
          style={{
            background: `url(${images[currentImage]}) center/cover no-repeat`
          }}
        >
        <div className="overlay">
          <h1> மெய்ஞான வைரவர் கோவில்
          <br></br> Meygnana Vairavar Temple</h1>
          <p>Divine Blessings • Peace • Devotion</p>

          <div className="social-icons">

          <a
            href="https://youtube.com/@sridiya7306?si=7ubBQCgmzMN-XykG"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i> 
          </a>

          <a
            href="https://www.tiktok.com/@meivacvh859?_r=1&_t=ZS-97FeZg375ld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-tiktok"></i> 
          </a>
  
          </div>
        </div>
      </div>

      {/* ABOUT SECTION (IMPROVED) */}
      <div className="about-box">

        <h2>About Temple</h2>

        <p>
         மெய்ஞான வைரவர் கோயில், வைரவர் பெருமானுக்கு அர்ப்பணிக்கப்பட்ட ஒரு புனிதமான ஆன்மீகத் தலமாகும்.
          இக்கோயில் அமைதி, பக்தி மற்றும் தெய்வீக ஆசீர்வாதங்களுக்காகப் பெயர் பெற்றது.
           பக்தர்கள் பாதுகாப்பு, ஆரோக்கியம் மற்றும் செழிப்புக்காகப் பிரார்த்தனை செய்ய இங்கு வருகிறார்கள்.</p><p>
          Meygnana Vairavar Temple is a sacred spiritual place
          dedicated to Lord Vairavar. This temple is known for
          peace, devotion, and divine blessings. Devotees visit
          here to pray for protection, health, and prosperity.
        </p>

        <div className="about-grid">

                    
            {/* 1 */}
            <div className="about-card">
              <h3>நம்பிக்கை</h3>
              <p>பக்தர்களை பாதுகாக்கும் தெய்வமாக வைரவர் பெருமான் நம்பப்படுகிறார்.</p>
            </div>

            {/* 2 */}
            <div className="about-card">
              <h3> பூஜைகள்</h3>
              <p>தினசரி பூஜைகள், விளக்கு ஏற்றுதல் மற்றும் சிறப்பு வழிபாடுகள் நடைபெறுகின்றன.</p>
            </div>

            {/* 3 */}
            <div className="about-card">
              <h3> கோவில் நேரம்</h3>
              <p>
                காலை: 5:00 AM – 6:00 AM<br />
                மாலை: 4:30 PM – 6:30 PM
              </p>
            </div>

            {/* 4 */}
            <div className="about-card">
              <h3> விழாக்கள்</h3>
              <p>ஆடி மாத பூஜை, தை பூசம் மற்றும் மாதந்தோறும் சிறப்பு பூஜைகள் நடைபெறுகின்றன.</p>
            </div>

            {/* 5 */}
            <div className="about-card">
              <h3> தெய்வ சக்தி</h3>
              <p>பக்தர்களின் பயம், தடைகள் மற்றும் தீய சக்திகளை நீக்கும் சக்தி கொண்ட தெய்வம்.</p>
            </div>

            {/* 6 */}
            <div className="about-card">
              <h3> ஆசீர்வாதம்</h3>
              <p>வைரவர் பெருமான் பக்தர்களுக்கு அமைதி, ஆரோக்கியம் மற்றும் செழிப்பு அருள்கிறார்.</p>
            </div>

         
        </div>

      </div>

      {/* SECTION TITLE */}
      {/* EXPLORE TEMPLE CONTENT */}
<h2 className="section-title">
  Explore Temple Content
</h2>

<div className="grid">

  {/* MEDIA */}
  <div className="card" onClick={() => nav("/gallery")}>
    <div className="card-icon">
      <i className="fas fa-camera"></i>
    </div>

    <div className="card-content">
      <h3>Media</h3>
      <p>Temple photos, videos & audios</p>
    </div>
  </div>

  {/* EVENTS */}
  <div className="card" onClick={() => nav("/events")}>
    <div className="card-icon">
      <i className="fas fa-calendar-alt"></i>
    </div>

    <div className="card-content">
      <h3>Events</h3>
      <p>Temple festivals & functions</p>
    </div>
  </div>

  {/* PDF */}
  <div className="card" onClick={() => nav("/history")}>
    <div className="card-icon">
      <i className="fas fa-file-pdf"></i>
    </div>

    <div className="card-content">
      <h3>PDF</h3>
      <p>Temple documents & history</p>
    </div>
  </div>

</div>

    </div>
  );
}

export default Home;