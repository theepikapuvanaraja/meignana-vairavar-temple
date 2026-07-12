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
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1966.3657770441175!2d79.95231319129527!3d9.703937327714586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAraly%20Hindu%20Temple!5e0!3m2!1sen!2slk!4v1782891243420!5m2!1sen!2slk"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Temple Location"
          ></iframe>
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