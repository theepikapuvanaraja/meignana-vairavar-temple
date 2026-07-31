import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-center">
          <h2>Meygnana Vairavar Temple</h2>
          <div className="footer-center">
  

                <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.7316937326714!2d79.9523887038231!3d9.703925430471886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe53004506e2b9%3A0xc93d580c85b37e8c!2sAraly%20meygnana%20Vairavar%20kovil!5e0!3m2!1sen!2slk!4v1785470904514!5m2!1sen!2slk"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Meignana Vairavar Temple Location"
        />
        </div>
        </div>

        {/* Right */}
        <div className="footer-right">
          <p>
            <i className="fas fa-envelope"></i> meygnanavairavar@gmail.com
          </p>
          <p>
            <i className="fas fa-phone"></i> +94 77 123 4567
          </p> 
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
      

      <hr />

      <p className="copy">
        © 2026 Meygnana Vairavar Temple | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;