const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const btn = document.getElementById("markBtn");

// 🔹 Camera ON
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(() => alert("Camera access denied"));

// 🔹 CLICK PHOTO → ATTENDANCE
btn.onclick = async () => {

  const ctx = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 220;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const image = canvas.toDataURL("image/png");

  btn.innerText = "⏳ Verifying...";
  btn.disabled = true;

  try {
    const res = await fetch("/api/attendance/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image })
    });

    const data = await res.json();
    alert(data.message);

  } catch (err) {
    alert("❌ Server error");
  }

  btn.innerText = "📸 Click Photo & Mark Attendance";
  btn.disabled = false;
};
