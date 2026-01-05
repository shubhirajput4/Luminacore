// Redirect to page when button clicked
function goTo(page) {
  window.location.href = page;
}

// "Get Started" button on hero section
document.getElementById("getStartedBtn").addEventListener("click", function() {
  window.location.href = "learn.html";
});

renderCourses();