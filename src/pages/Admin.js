import { useEffect, useState } from "react";
import "./Admin.css";
import AdminLogin from "../components/AdminLogin";

const API = "https://meignana-vairavar-temple-production.up.railway.app";


function Admin() {

  // ================= MEDIA =================
  const [auth,setAuth]=useState(false);
  const [media, setMedia] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "image",
    url: ""
  });

  // ================= EVENT =================
  const [events, setEvents] = useState([]);
  

const [eventForm, setEventForm] = useState({
  title: "",
  description: "",
  date: "",
  time: ""
});
const deleteContact = async (id) => {
  try {
    await fetch(`https://meignana-vairavar-temple-production.up.railway.app/contact/${id}`, {
      method: "DELETE"
    });

    fetchContacts();
  } catch (err) {
    console.log(err);
  }
};
const markAsRead = async (id) => {
  await fetch(`https://meignana-vairavar-temple-production.up.railway.app/contact/read/${id}`, {
    method: "PUT"
  });

  fetchContacts();
};
  // ================= MEDIA FETCH =================
  const fetchMedia = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/media`);
      const data = await res.json();

      setMedia(data);

    } catch (err) {
      console.log(err);
      setMessage("❌ Media Fetch Failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= EVENTS FETCH =================
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}/api/events`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchContacts = async () => {
  try {
    const res = await fetch("https://meignana-vairavar-temple-production.up.railway.app/contact");
    const data = await res.json();
    setContacts(data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchMedia();
    fetchEvents();
    fetchContacts();  
  }, []);

  // ================= MEDIA UPLOAD =================
  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      console.log("UPLOAD URL:", data.url);

 setForm(prev => ({
      ...prev,
      url: data.url
    }));

    } catch (err) {
      setMessage("❌ Upload Failed");
    }
  };

  // ================= ADD MEDIA =================
 const addMedia = async () => {
  console.log("BEFORE SAVE:", form);
  try {

    const res = await fetch(`${API}/api/media`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    console.log("SAVE RESPONSE:", data);

    setMessage("✅ Media Added");

    fetchMedia();

    setTimeout(() => {
      setMessage("");
    }, 3000);

  } catch (err) {
    console.log(err);
    setMessage("❌ Media Add Failed");
  }
};
  // ================= DELETE MEDIA =================
  const deleteMedia = async (id) => {
    await fetch(`${API}/api/media/${id}`, {
      method: "DELETE"
    });

    fetchMedia();
  };
  

 
  // ================= ADD EVENT =================
  const addEvent = async () => {
  try {
    const res = await fetch(`${API}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventForm),
    });

    const data = await res.json();

    console.log("RESULT:", data);

    if (!res.ok) {
      throw new Error(data.error || "Event Save Failed");
    }

    setMessage("🎉 Event Added");
    fetchEvents();

  } catch (err) {
    console.log(err);
    setMessage("❌ Event Save Failed");
  }
};
  // ================= DELETE EVENT =================
 const deleteEvent = async (id) => {

  try {

    const res = await fetch(`${API}/api/events/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    console.log("DELETE RESULT:", data);

    if(!res.ok){
      throw new Error("Delete failed");
    }

    setMessage("✅ Event Deleted");

    fetchEvents();

  } catch(err){

    console.log(err);
    setMessage("❌ Event Delete Failed");

  }

};

  // ================= UI =================

  if(!auth){

return <AdminLogin setAuth={setAuth}/>

}
  return (
    
    <div className="admin-container">

      {/* MESSAGE */}
      {message && (
        <div className="message-box">
          {message}
        </div>
      )}
      <div className="stats-grid">

  <div className="stat-card">
    <h2>📂</h2>
    <h3>{media.length}</h3>
    <p>Total Media</p>
  </div>

  <div className="stat-card">
    <h2>📅</h2>
    <h3>{events.length}</h3>
    <p>Total Events</p>
  </div>

  <div className="stat-card">
    <h2>❤️</h2>
    <h3>
      {media.reduce(
        (total, item) => total + (item.likes || 0),
        0
      )}
    </h3>
    <p>Total Likes</p>
  </div>

</div>

      {/* ================= MEDIA SECTION ================= */}
      <div className="admin-card">

        <h1>🔥 Media Admin Panel</h1>

        <div className="form-group">

          <input
            type="text"
            placeholder="Enter Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Enter Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="history">History PDF</option>
          </select>

          <input type="file" onChange={handleUpload} />

          <button onClick={addMedia}>
            ADD MEDIA
          </button>

        </div>
      </div>

      {/* MEDIA LIST */}
      <div className="media-list">

        <h2>📂 Uploaded Media</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          media.map((item) => (
            <div className="media-card" key={item._id}>

                 {item.type === "image" && item.url && (
                      <img 
                        src={item.url} 
                        alt={item.title}
                      />
                    )}
                {item.type === "video" && (
                <video controls>
                  <source src={item.url} />
                </video>
              )}

              {item.type === "audio" && (
                <audio controls>
                  <source src={item.url} />
                </audio>
              )}

              <div className="media-content">

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <button
                  className="delete-btn"
                  onClick={() => deleteMedia(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* ================= EVENT SECTION ================= */}
      <div className="admin-card">

        <h1>🎉 Event Admin Panel</h1>

        <div className="form-group">
      <input
        type="text"
        placeholder="Event Title"
        value={eventForm.title}
        onChange={(e) =>
          setEventForm({ ...eventForm, title: e.target.value })
        }
      />

      <textarea
        placeholder="Event Description"
        value={eventForm.description}
        onChange={(e) =>
          setEventForm({ ...eventForm, description: e.target.value })
        }
      />

      <input
        type="date"
        value={eventForm.date}
        onChange={(e) =>
          setEventForm({ ...eventForm, date: e.target.value })
        }
      />

      <input
        type="time"
        value={eventForm.time}
        onChange={(e) =>
          setEventForm({ ...eventForm, time: e.target.value })
        }
      />

      <button onClick={addEvent}>
        ADD EVENT
      </button>

        </div>
      </div>

      {/* EVENT LIST */}
      <div className="media-list">

        <h2>📅 Temple Events</h2>

        {events.map((event) => (
          <div className="media-card" key={event._id}>

            <img src={event.image} alt="" />

            <div className="media-content">

              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.date}</p>

              <button
                className="delete-btn"
                onClick={() => deleteEvent(event._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
      {/* ================= CONTACT MESSAGES ================= */}
<div className="admin-card">

  <h1>📩 Contact Messages</h1>

  {contacts.map((msg) => (
    <div className="media-card" key={msg._id}>

      <div className="media-content">

        <h3>{msg.name}</h3>
        <p>📧 {msg.email}</p>
        <p>💬 {msg.message}</p>

        <button onClick={() => markAsRead(msg._id)}>
  ✔  Read
</button>

        <button onClick={() => deleteContact(msg._id)}>
          🗑 Delete
        </button>
        

      </div>

    </div>
  ))}
  

</div>

    </div>
    
  );
}

export default Admin;