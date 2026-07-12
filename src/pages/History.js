import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF worker fix
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function History() {
  const [data, setData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    fetch("http://localhost:5000/api/media")
      .then((res) => res.json())
      .then((res) => {
        setData(
          res.filter(
            (i) =>
              i.type === "history" ||
              i.type === "event" ||
              i.type === "pdf"
          )
        );
      });
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const downloadPdf = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename.endsWith(".pdf")
  ? filename
  : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
};

  return (
    <div style={{ padding: "20px", background: "#f5efe6", minHeight: "100vh" }}>

      {/* HEADER */}
      <h1 style={{ textAlign: "center", color: "#5a3e1b" }}>
       Temple History 
      </h1>

      {/* LIST VIEW */}
      {!selectedPdf && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {data.map((item) => (
            <div key={item._id} style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
            }}>

              {/* TYPE BADGE */}
              <span style={{
                background:
                  item.type === "history"
                    ? "green"
                    : item.type === "event"
                    ? "blue"
                    : "orange",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {item.type}
              </span>

              <h3>{item.title}</h3>
              <p style={{ color: "#555" }}>{item.description}</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

                <button
                  onClick={() => setSelectedPdf(item)}
                  style={{
                    padding: "6px 12px",
                    background: "#5a3e1b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px"
                  }}
                >
                  📖 Open
                </button>

                {/* DOWNLOAD */}
               <button
  onClick={() => downloadPdf(item.url, item.title)}
  style={{
    padding: "6px 12px",
    background: "#1565c0",
    color: "#fff",
    border: "none",
    borderRadius: "6px"
  }}
>
  ⬇ Download
</button>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* PDF VIEWER */}
      {selectedPdf && (
        <div style={{ marginTop: "20px" }}>

          {/* TOP BAR */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px"
          }}>
            <button onClick={() => setSelectedPdf(null)}>
              ⬅ Back
            </button>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setScale(s => s + 0.2)}>➕ Zoom</button>
              <button onClick={() => setScale(s => s - 0.2)}>➖ Zoom</button>

             <button
  onClick={() => downloadPdf(selectedPdf.url, selectedPdf.title)}
>
  ⬇ Download
</button>
            </div>
          </div>

          {/* PDF BOX */}
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center"
          }}>
            <div style={{ maxWidth: "900px" }}>

              <Document
                file={selectedPdf.url}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    scale={scale}
                  />
                ))}
              </Document>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default History;