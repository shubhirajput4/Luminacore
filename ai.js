// Switch between tools
function openTool(toolId) {
  document.querySelectorAll('.ai-tool').forEach(div => div.style.display = 'none');
  document.getElementById(toolId).style.display = 'block';
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});

// Copy Output
function copyOutput(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Copied to clipboard!");
  });
}

// Typing Animation
function typeText(element, text) {
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 50);
}

// Simulated AI
async function askAI(type) {
  let input = '';
  let outputDiv;

  if (type === 'chat') {
    input = document.getElementById('chatInput').value;
    outputDiv = document.getElementById('chatOutput');
    outputDiv.innerHTML = `<p><b>You:</b> ${input}</p><p><b>AI:</b> Thinking...</p>`;
  } else if (type === 'summary') {
    input = document.getElementById('summaryInput').value;
    outputDiv = document.getElementById('summaryOutput');
    outputDiv.innerHTML = `<p>Summarizing your text...</p>`;
  } else if (type === 'quiz') {
    input = document.getElementById('quizInput').value;
    outputDiv = document.getElementById('quizOutput');
    outputDiv.innerHTML = `<p>Generating quiz on <b>${input}</b>...</p>`;
  }

  setTimeout(() => {
    if (type === 'chat') {
      typeText(outputDiv, `AI: That’s an interesting question about "${input}".`);
    } else if (type === 'summary') {
      const markdown = `**Summary:** The main idea of your text is simplified here.`;
      outputDiv.innerHTML = marked.parse(markdown);
    } else if (type === 'quiz') {
      typeText(outputDiv, `Quiz:\n1. What is ${input}?\n2. Explain one key feature of ${input}.\n3. Why is ${input} important?`);
    }
  }, 1500);
}
async function askAI(type) {
  let input = '';
  let outputDiv;

  if (type === 'chat') {
    input = document.getElementById('chatInput').value;
    outputDiv = document.getElementById('chatOutput');
    outputDiv.innerHTML = `<p><b>You:</b> ${input}</p><p><b>AI:</b> Thinking...</p>`;
  } else if (type === 'summary') {
    input = document.getElementById('summaryInput').value;
    outputDiv = document.getElementById('summaryOutput');
    outputDiv.innerHTML = `<p>Summarizing your text...</p>`;
  } else if (type === 'quiz') {
    input = document.getElementById('quizInput').value;
    outputDiv = document.getElementById('quizOutput');
    outputDiv.innerHTML = `<p>Generating quiz on <b>${input}</b>...</p>`;

    // Show and animate progress bar
    const progressContainer = document.getElementById('quizProgress');
    const progressBar = document.getElementById('progressBar');
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) clearInterval(interval);
    }, 150);
  }

  setTimeout(() => {
    if (type === 'chat') {
      typeText(outputDiv, `AI: That’s an interesting question about "${input}".`);
    } else if (type === 'summary') {
      const markdown = `**Summary:** The main idea of your text is simplified here.`;
      outputDiv.innerHTML = marked.parse(markdown);
    } else if (type === 'quiz') {
      typeText(outputDiv, `Quiz:\n1. What is ${input}?\n2. Explain one key feature of ${input}.\n3. Why is ${input} important?`);
      document.getElementById('quizProgress').style.display = 'none';
    }
  }, 1500);
}