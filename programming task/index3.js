const quizData = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      answer: "New Delhi"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Python", "Java", "C++", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      options: ["Central Style Sheet", "Cascading Style Sheets", "Creative Style System", "Computer Style Syntax"],
      answer: "Cascading Style Sheets"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let answered = false;
  
  function loadQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const q = quizData[currentQuestion];
  
    let html = `<h5>${currentQuestion + 1}. ${q.question}</h5>`;
    q.options.forEach(option => {
      html += `
        <button class="btn btn-outline-secondary w-100 option-btn" onclick="selectAnswer(this, '${option}')">${option}</button>
      `;
    });
  
    quizContainer.innerHTML = html;
    document.getElementById('feedback').innerText = "";
    answered = false;
  }
  
  function selectAnswer(btn, selectedOption) {
    if (answered) return; // prevent multiple answers
  
    const correct = quizData[currentQuestion].answer;
    const feedback = document.getElementById('feedback');
  
    if (selectedOption === correct) {
      btn.classList.remove('btn-outline-secondary');
      btn.classList.add('btn-success');
      feedback.innerText = "Correct!";
      score++;
    } else {
      btn.classList.remove('btn-outline-secondary');
      btn.classList.add('btn-danger');
      feedback.innerText = `Wrong! Correct answer: ${correct}`;
    }
  
    answered = true;
  }
  
  function nextQuestion() {
    if (!answered) {
      alert("Please select an answer first!");
      return;
    }
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
      <h4>Quiz Finished!</h4>
      <p>Your Score: ${score} / ${quizData.length}</p>
    `;
    document.getElementById('feedback').innerText = "";
  }
  
  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
  }
  
  // Load the first question when page loads
  window.onload = loadQuestion;
  