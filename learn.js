// ================= MOBILE MENU =================
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ================= USER ID =================
// Login ke time localStorage me set hona chahiye
const userId = localStorage.getItem("userId") || "demoUser";

// ================= GLOBAL PROGRESS =================
let progress = 0;

// ================= UPDATE PROGRESS UI =================
function renderProgress(percent) {
  percent = Math.max(0, Math.min(100, percent));

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText =
    percent + "% Completed";
}

// ================= FETCH PROGRESS FROM BACKEND =================
function loadProgress() {
  fetch(`http://localhost:5000/api/progress/${userId}`)
    .then(res => res.json())
    .then(data => {
      progress = data.progress || 0;
      renderProgress(progress);
    })
    .catch(err => {
      console.error("Backend error, using local progress", err);
      renderProgress(progress);
    });
}

// ================= SAVE PROGRESS TO BACKEND =================
function saveProgress() {
  fetch("http://localhost:5000/api/progress/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, progress })
  });
}

// ================= VIDEO SECTION =================
function showVideos() {
  document.getElementById("videoSection").style.display = "block";

  // video dekhne par +10%
  progress = Math.min(progress + 10, 100);
  renderProgress(progress);
  saveProgress();

  window.scrollTo({
    top: document.getElementById("videoSection").offsetTop,
    behavior: "smooth"
  });
}

function hideVideos() {
  document.getElementById("videoSection").style.display = "none";
}

// ================= ON PAGE LOAD =================
document.addEventListener("DOMContentLoaded", () => {
  loadProgress();
});
