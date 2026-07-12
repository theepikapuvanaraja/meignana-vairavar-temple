import { useEffect, useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/contact")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div>
      <h2>Contact Messages</h2>

      {messages.map((msg) => (
        <div key={msg._id}>
          <h4>{msg.name}</h4>
          <p>{msg.email}</p>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Messages;