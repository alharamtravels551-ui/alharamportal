const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// --- MongoDB Setup ---
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Alharam123:<db_password>@alharam1234.vyt2iu9.mongodb.net/?appName=Alharam123";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

const candidateSchema = new mongoose.Schema({
  fileNumber: String,
  passport: { type: String, required: true, unique: true },
  visa: String,
  dob: String,
  photo: String,
  createdAt: { type: Date, default: Date.now }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

// --- Middleware & Storage Setup ---
const UPLOAD_DIR = path.join(__dirname, "upload");
const PUBLIC_DIR = path.join(__dirname, "public");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));
app.use("/upload", express.static(UPLOAD_DIR));

// --- ROUTES ---

// Public Search Landing
app.get("/", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "search.html")));

// Stats
app.get("/count", async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Panel API
app.get("/admin-page", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "admin.html")));
app.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Registration
app.get("/add-page", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "add.html")));
app.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { fileNumber, passport, visa, dob } = req.body;
    const photo = req.file ? req.file.filename : "";

    const newCandidate = new Candidate({ fileNumber, passport, visa, dob, photo });
    await newCandidate.save();

    console.log("Candidate saved successfully to MongoDB");
    res.redirect("/admin-page");
  } catch (err) {
    console.error("Error saving candidate:", err);
    res.status(400).send("Error adding candidate. Possibly duplicate Passport Number.");
  }
});

// Deletion
app.post("/delete", async (req, res) => {
  try {
    const { passport } = req.body;
    await Candidate.findOneAndDelete({ passport });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Search API
app.get("/search-page", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "search.html")));
app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const searchStr = query.toLowerCase().trim();

    // Logic: Find by passport, fileNumber, or visa
    const candidate = await Candidate.findOne({
      $or: [
        { passport: new RegExp(`^${searchStr}$`, "i") },
        { fileNumber: new RegExp(`^${searchStr}$`, "i") },
        { visa: new RegExp(`^${searchStr}$`, "i") }
      ]
    });

    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

