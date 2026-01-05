document.querySelectorAll('.practice-btn').forEach(button => {
  button.addEventListener('click', () => {
    const mode = button.getAttribute('data-mode');
    const title = document.getElementById('practiceTitle');
    const content = document.getElementById('practiceContent');

    // QUIZ MODE
    if (mode === 'quiz') {
      title.textContent = "🧠 SAP Basics Quiz";
      content.innerHTML = `
        <div class="quiz-question">
          <p><strong>Q1:</strong> What does SAP stand for?</p>
          <button onclick="checkAnswer(this, true)">Systems, Applications & Products</button>
          <button onclick="checkAnswer(this, false)">Software Access Platform</button>
          <button onclick="checkAnswer(this, false)">Systematic Application Portal</button>
        </div>
        <div class="quiz-question">
          <p><strong>Q2:</strong> Which module deals with Finance & Controlling?</p>
          <button onclick="checkAnswer(this, true)">SAP FICO</button>
          <button onclick="checkAnswer(this, false)">SAP SD</button>
          <button onclick="checkAnswer(this, false)">SAP HR</button>
        </div>
        <p id="quizResult"></p>
      `;
    }

    // CODING CHALLENGE
    else if (mode === 'coding') {
      title.textContent = "💻 Coding Challenge";
      content.innerHTML = `
        <p>Write a simple JavaScript program that calculates the sum of two numbers.</p>
        <div class="coding-area">
          <textarea id="codeInput" placeholder="Write your code here..."></textarea>
          <button id="runCodeBtn">Run Code</button>
          <p id="outputArea"></p>
        </div>
      `;

      document.getElementById('runCodeBtn').addEventListener('click', () => {
        const code = document.getElementById('codeInput').value;
        try {
          const result = eval(code);
          document.getElementById('outputArea').innerHTML = `<strong>Output:</strong> ${result}`;
        } catch {
          document.getElementById('outputArea').innerHTML = `<span style="color:red;">⚠️ Error in your code</span>`;
        }
      });
    }

    // CASE STUDY
    else if (mode === 'case') {
      title.textContent = "📈 Business Case Scenario";
      content.innerHTML = `
        <p><strong>Scenario:</strong> A company wants to track its inventory across multiple locations using SAP MM. 
        Suggest a workflow using Purchase Orders, Goods Receipts, and Stock Transfers.</p>
        <textarea placeholder="Write your workflow steps here..." style="width:100%; height:120px; margin-top:10px;"></textarea>
        <button style="margin-top:10px;">Submit Case</button>
      `;
    }
  });
});

// Simple answer checker for quiz mode
function checkAnswer(button, isCorrect) {
  const result = document.getElementById('quizResult');
  if (isCorrect) {
    result.textContent = "✅ Correct! Well done!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Incorrect, try again!";
    result.style.color = "red";
  }
}

// Start Practicing button
document.getElementById('startPracticeBtn').addEventListener('click', () => {
  window.scrollTo({ top: 600, behavior: 'smooth' });
});
