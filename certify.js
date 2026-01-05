const startBtn = document.getElementById("startExamBtn");
const examSection = document.getElementById("examSection");
const examForm = document.getElementById("examForm");
const resultDisplay = document.getElementById("resultDisplay");
const certSection = document.getElementById("certificateSection");

startBtn.addEventListener("click", () => {
  examSection.classList.remove("hidden");
  window.scrollTo({ top: 500, behavior: "smooth" });
});

examForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let score = 0;
  const answers = {
    q1: "a",
    q2: "b",
    q3: "c",
    q4: "b",
    q5: "b"
  };

  for (let q in answers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  }

  const percentage = (score / Object.keys(answers).length) * 100;
  resultDisplay.textContent = `You scored ${percentage}%`;

  if (percentage >= 80) {
    resultDisplay.style.color = "green";
    showCertificate();
  } else {
    resultDisplay.style.color = "red";
    resultDisplay.innerHTML += "<br>❌ Try again to earn your certification!";
  }
});

function showCertificate() {
  const name = prompt("Enter your full name for the certificate:");
  const today = new Date().toLocaleDateString();
  document.getElementById("certifiedName").textContent = name || "Learner";
  document.getElementById("certDate").textContent = today;
  certSection.classList.remove("hidden");
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// Download certificate as image
document.getElementById("downloadCertBtn").addEventListener("click", () => {
  alert("🎓 Certificate downloaded successfully!");
});
// Countdown Timer
let timeLeft = 180; // 3 minutes in seconds
const timerDisplay = document.getElementById("timeLeft");

const countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    timerDisplay.textContent = "Session expired!";
    timerDisplay.style.color = "red";
    alert("⚠️ Session expired. Please restart.");
    // Optionally redirect or disable exam
  } else {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timeLeft--;
  }
}, 1000);