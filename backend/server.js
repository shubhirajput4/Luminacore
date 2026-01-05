const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const Razorpay = require("razorpay");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: { origin: "*" }
});
app.get("/", (req, res) => {
  res.send("SERVER OK");
});

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));



// models folder expose karo



// ================= MONGODB =================
mongoose.connect("mongodb://127.0.0.1:27017/luminacore", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Error:", err));

// ================= RAZORPAY =================
const razorpay = new Razorpay({
  key_id: "rzp_test_1234567890",
  key_secret: "test_secret_key"
});

// ================= USER SCHEMA =================
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  lastLoginDate: { type: String, default: "" }
});

const User = mongoose.model("User", UserSchema);

// ================= AUTH =================
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) return res.json({ success: false, message: "User exists" });

    await new User({ username, email, password }).save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.json({ success: false });
  res.json({ success: true, username: user.username });
});

// ================= GAMIFICATION =================
app.post("/api/updateGamification", async (req, res) => {
  const { username } = req.body;
  const today = new Date().toDateString();

  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false });

  if (user.lastLoginDate !== today) {
    user.points += 5;
    user.streak += 1;
    user.lastLoginDate = today;

    if (user.streak === 7 && !user.badges.includes("Streak Master")) {
      user.badges.push("Streak Master");
    }

    await user.save();
  }

  res.json({ success: true, user });
});

// ================= LEADERBOARD =================
app.get("/api/leaderboard", async (req, res) => {
  const leaders = await User.find().sort({ points: -1 }).limit(10);
  res.json({ success: true, leaders });
});

// ================= ROUTES =================
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/announcements", require("./routes/announce"));
app.use("/api/course", require("./routes/courseRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
// ================= SOCKET CHAT =================
let students = [];

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });

  socket.on("join-classroom", (user) => {
    students.push({ ...user, socketId: socket.id });
    io.emit("update-students", students);
  });

  socket.on("mark-attendance", (data) => {
    io.emit("attendance-update", data);
  });

  socket.on("disconnect", () => {
    students = students.filter(s => s.socketId !== socket.id);
    io.emit("update-students", students);
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ================= RAZORPAY ORDER =================
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 499 * 100,
      currency: "INR",
      receipt: "course_rcpt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("❌ Razorpay Error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// ================= SERVER =================
server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
