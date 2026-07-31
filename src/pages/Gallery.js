import { useEffect, useState } from "react";
import "./Gallery.css";
const API = "https://meignana-vairavar-temple-production.up.railway.app";

function Gallery() {

  const [media, setMedia] = useState([]);

  // FETCH MEDIA
  const fetchMedia = async () => {
  try {
    const res = await fetch(`${API}/api/media`);
    const data = await res.json();
    setMedia(data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  if (!localStorage.getItem("userId")) {
    localStorage.setItem("userId", Date.now().toString());
  }

  fetchMedia();
}, []);
  // LIKE
 const likeMedia = async (id) => {

try {


await fetch(`${API}/api/media/like/${id}`, {

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId: localStorage.getItem("userId")

})

});


fetchMedia();


}catch(err){

console.log(err);

}

};
const downloadAudio = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename.endsWith(".mp3")
      ? filename
      : `${filename}.mp3`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
};   
const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "download";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
};

  // FILTER
  const images = media.filter(
    (item) => item.type === "image"
  );

  const videos = media.filter(
    (item) => item.type === "video"
  );

  const audios = media.filter(
    (item) => item.type === "audio"
  );

  return (
    <div className="gallery-page">

      <h1 className="main-title">
        Temple Media Gallery
      </h1>

      {/* IMAGE SECTION */}
      <section>

        <h2 className="section-title">
           Temple Images
        </h2>

        <div className="gallery-grid">

          {images.map((item) => (

            <div
              className="gallery-card"
              key={item._id}
            >

             {item.url && (
  <img
    src={item.url}
    alt={item.title}
    className="gallery-image"
  />
)}

              <div className="gallery-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="button-group">

                  <button
                    className="like-btn"
                    onClick={() => likeMedia(item._id)}
                  >
                    ❤️ {item.likes || 0}
                  </button>
<button
  className="download-btn"
  onClick={() => downloadFile(item.url, item.title)}
>
  ⬇ Download
</button>
                  <button
                    className="share-btn"
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${item.title} ${item.url}`
                      )
                    }
                  >
                    📤 Share
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      

      {/* AUDIO SECTION */}
      <section>

        <h2 className="section-title">
           Temple Audios
        </h2>

        <div className="audio-grid">

          {audios.map((item) => (

            <div
              className="audio-card"
              key={item._id}
            >

              <h3>{item.title}</h3>

              <p>{item.description}</p>

             <audio controls className="audio-player">
  <source src={item.url} type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

              <div className="button-group">

                <button
                  className="like-btn"
                  disabled={localStorage.getItem(`liked_${item._id}`)}
                  onClick={() => likeMedia(item._id)}
                >
                  ❤️ {item.likes || 0}
                </button>
<button
  className="download-btn"
  onClick={() => downloadAudio(item.url, item.title)}
>
  ⬇ Download
</button>

                <button
                  className="share-btn"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${item.title} ${item.url}`
                    )
                  }
                >
                  📤 Share
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>
      {/* VIDEO SECTION */}
      <section>

        <h2 className="section-title">
           Temple Videos
        </h2>

        <div className="gallery-grid">

          {videos.map((item) => (

            <div
              className="gallery-card"
              key={item._id}
            >

              <video
                controls
                className="gallery-video"
              >
                <source src={item.url} />
              </video>

              <div className="gallery-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="button-group">

                   <button
                    className="like-btn"
                    disabled={localStorage.getItem(`liked_${item._id}`)}
                    onClick={() => likeMedia(item._id)}
                  >
                    ❤️ {item.likes || 0}
                  </button>

<button
  className="download-btn"
  onClick={() => downloadFile(item.url, item.title)}
>
  Download
</button>

                  <button
                    className="share-btn"
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${item.title} ${item.url}`
                      )
                    }
                  >
                     Share
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Gallery;