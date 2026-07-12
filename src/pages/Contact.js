import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        alert("🙏 Message Sent Successfully!");
        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
        alert("❌ Failed to send message");
      }
    } catch (error) {
      alert("❌ Error sending message");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="💬 Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;