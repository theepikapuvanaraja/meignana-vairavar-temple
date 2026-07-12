import { useEffect, useState } from "react";
import "./Events.css";

const API = "http://localhost:5000";

function Events() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="events-page">

      <h1>Temple Events</h1>

      {events.length === 0 ? (
        <p>No Events Found</p>
      ) : (

        <div className="events-grid">

          {events.map((event) => (

            <div className="event-card" key={event._id}>

              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <p>
                📅 Date: {event.date}
              </p>

              <p>
                ⏰ Time: {event.time}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Events;