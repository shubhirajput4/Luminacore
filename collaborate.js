// Interactive functionality for Collaborate page

document.querySelectorAll('.feature-btn').forEach(button => {
  button.addEventListener('click', () => {
    const feature = button.getAttribute('data-feature');
    const title = document.getElementById('featureTitle');
    const content = document.getElementById('featureContent');

    if (feature === 'discussion') {
      title.textContent = "💬 Discussion Boards";
      content.innerHTML = `
        <p>Join topic-wise SAP discussions, ask questions, and share insights with others.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/x1e_eTtO9u4" 
        title="SAP Basics Discussion" frameborder="0" allowfullscreen></iframe>
      `;
    } 
    else if (feature === 'projects') {
      title.textContent = "👥 Project Teams";
      content.innerHTML = `
        <p>Find your teammates and collaborate on SAP projects. Work on real-world case studies!</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/lI1ae4q-jY8"
        title="SAP Project Collaboration" frameborder="0" allowfullscreen></iframe>
      `;
    } 
    else if (feature === 'mentors') {
      title.textContent = "🎓 Mentor Connect";
      content.innerHTML = `
        <p>Connect with mentors from top companies and universities to get guidance.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/7Vae_AkLb4Q"
        title="SAP Mentorship Program" frameborder="0" allowfullscreen></iframe>
      `;
    } 
    else if (feature === 'events') {
      title.textContent = "📅 Events & Webinars";
      content.innerHTML = `
        <p>Attend SAP summits, live coding sessions, and interactive webinars.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/VzY8UZjFDD8"
        title="SAP Event Highlight" frameborder="0" allowfullscreen></iframe>
      `;
    }
  });
});

// Join community button
document.getElementById('joinCommunityBtn').addEventListener('click', () => {
  alert("🎉 Welcome to the LUMINACORE Community! You'll soon be redirected to the discussion forum.");
});
