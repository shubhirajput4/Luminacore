// ================= PROTECT ROUTE =================
if (!localStorage.getItem("username")) {
  window.location.href = "sign_in.html";
}

const username = localStorage.getItem("username");
if (!username) {
  window.location.href = "sign_in.html";
}

document.getElementById("username").innerText = username;

// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  window.location.href = "sign_in.html";
}

// ================= PAGE NAVIGATION =================
function go(page) {
  window.location.href = page;
}

// ✅ NEW: ATTENDANCE → FACE PAGE
function goAttendance() {
  window.location.href = "face.html";
}

// ================= PROFILE PHOTO UPLOAD =================
const uploadInput = document.getElementById("profileUpload");
const profilePic = document.getElementById("headerProfilePic");

const savedPhoto = localStorage.getItem("profilePhoto");
if (savedPhoto && profilePic) {
  profilePic.src = savedPhoto;
}

if (uploadInput) {
  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
      localStorage.setItem("profilePhoto", reader.result);
    };
    reader.readAsDataURL(file);
  });
}

// ================= ANNOUNCEMENTS =================
function toggleAnnouncements() {
  const panel = document.getElementById("announcementsPanel");
  panel.classList.toggle("hidden");

  if (!panel.dataset.loaded) {
    loadAnnouncements();
    panel.dataset.loaded = "true";
  }
}

function loadAnnouncements() {
  fetch("http://localhost:5000/api/announcements")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("announcementList");
      list.innerHTML = "";

      if (!data || data.length === 0) {
        list.innerHTML = "<li>No announcements yet</li>";
        return;
      }

      data.forEach(a => {
        list.innerHTML += `
          <li>
            <strong>${a.title}</strong><br>
            <small>${a.message}</small>
          </li>
        `;
      });
    })
    .catch(err => console.error(err));
}

// ================= ATTENDANCE SUMMARY =================
async function loadAttendance() {
  try {
    const res = await fetch(
      `http://localhost:5000/api/attendance/${username}`
    );
    const data = await res.json();

    let present = 0, absent = 0;

    (data.attendance || []).forEach(d => {
      d.status === "present" ? present++ : absent++;
    });

    const total = present + absent;
    const percent = total ? Math.round((present / total) * 100) : 0;

    document.getElementById("presentCount").innerText = present;
    document.getElementById("absentCount").innerText = absent;
    document.getElementById("attendancePercent").innerText = percent + "%";
  } catch (err) {
    console.error(err);
  }
}

loadAttendance();

// ================= THEME =================
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.onclick = () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light");
}

// ================= PROGRESS =================
const userId = "USER_ID_HERE";

fetch(`http://localhost:5000/api/progress/${userId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("progressBar").style.width = data.progress + "%";
    document.getElementById("progressText").innerText =
      data.progress + "% Completed";
  });
