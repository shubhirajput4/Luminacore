// ===============================
// USER SETUP
// ===============================
if (!localStorage.getItem("username")) {
  localStorage.setItem("username", "demoUser");
}

const username = localStorage.getItem("username");
const msg = document.getElementById("msg");
const btn = document.getElementById("markBtn");

msg.innerText = "";

// ===============================
// BUTTON CLICK
// ===============================
btn.addEventListener("click", verifyBiometricAndMark);

// ===============================
// BIOMETRIC FUNCTION
// ===============================
async function verifyBiometricAndMark() {
  msg.innerText = "🔐 Verifying biometric...";

  try {
    // Browser biometric support check
    if (!window.PublicKeyCredential) {
      msg.innerText = "❌ Biometric not supported";
      return;
    }

    // Dummy challenge (required)
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    // Trigger system biometric popup
    await navigator.credentials.get({
      publicKey: {
        challenge: challenge,
        timeout: 60000,
        userVerification: "required"
      }
    });

    // If biometric success → mark attendance
    markAttendance();

  } catch (err) {
    msg.innerText = "❌ Biometric verification failed";
    console.error(err);
  }
}

// ===============================
// MARK ATTENDANCE (API)
// ===============================
async function markAttendance() {
  const date = new Date().toISOString().split("T")[0];

  const res = await fetch("http://localhost:5000/api/attendance/mark", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      date,
      status: "present"
    })
  });

  const data = await res.json();
  msg.innerText = data.message;

  // Already marked → disable button
  if (data.message.toLowerCase().includes("already")) {
    btn.disabled = true;
  }

  loadStats();
}

// ===============================
// LOAD ATTENDANCE STATS
// ===============================
async function loadStats() {
  const res = await fetch(`http://localhost:5000/api/attendance/${username}`);
  const data = await res.json();

  let present = 0;
  let absent = 0;

  data.attendance.forEach(d => {
    d.status === "present" ? present++ : absent++;
  });

  const total = present + absent;
  const percent = total ? Math.round((present / total) * 100) : 0;

  document.getElementById("present").innerText = present;
  document.getElementById("absent").innerText = absent;
  document.getElementById("percent").innerText = percent + "%";
}

// ===============================
// PAGE LOAD
// ===============================
loadStats();
