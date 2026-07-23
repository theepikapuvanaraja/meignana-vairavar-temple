
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("./config/cloudinary");

const eventRoutes = require("./routes/eventRoutes");
const upload = multer({
  storage: multer.memoryStorage(),
   limits: {
    fileSize: 50 * 1024 * 1024
  }
});

const app = express();
const Contact = require("./models/contact");
const mediaRoutes = require("./routes/mediaRoutes");
const Media = require("./models/Media");

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= MODEL =================
app.post("/upload", upload.single("file"), async (req, res) => {

  try {

    if(!req.file){
      return res.status(400).json({
        error:"No file"
      });
    }

   const result = await cloudinary.uploader.upload(
  `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
  {
    resource_type:
  req.file.mimetype === "application/pdf"
    ? "raw"
    : "auto"
  }
);

console.log(result);

res.json({
  url: result.secure_url
});
  


  } catch(err){

    console.log(err);

    res.status(500).json({
      error:err.message
    });

  }

});
// ================= MONGODB =================
mongoose
  .connect("mongodb://meygnanavairavartemple_db_user:xAgbZDaaSDYX86wf@ac-umb24wy-shard-00-00.mgsnos1.mongodb.net:27017,ac-umb24wy-shard-00-01.mgsnos1.mongodb.net:27017,ac-umb24wy-shard-00-02.mgsnos1.mongodb.net:27017/?ssl=true&replicaSet=atlas-4zwc1o-shard-0&authSource=admin&appName=templeCluster0")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

// ================= ROUTES =================
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);


// ================= MEDIA =================

// ================= LIKE / UNLIKE TOGGLE =================
app.put("/api/media/like/:id", async (req, res) => {
  const userId = req.body.userId;

  const item = await Media.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  const alreadyLiked = item.likedBy.includes(userId);

  if (alreadyLiked) {
    // UNLIKE
    item.likedBy = item.likedBy.filter(id => id !== userId);
  } else {
    // LIKE
    item.likedBy.push(userId);
  }

  item.likes = item.likedBy.length;

  await item.save();

  res.json(item);
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on ${PORT}`);
});
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Message Saved",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

app.get("/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});
app.put("/contact/read/:id", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, {
      read: true
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});