document.addEventListener("DOMContentLoaded", () => {
  const words = [
    {
      word: "JAVASCRIPT",
      scrambled: "TPIRCSAVAJ",
      hint: "A programming language used for web development.",
    },
    {
      word: "DEVELOPER",
      scrambled: "REPOLEVED",
      hint: "A person who writes code.",
    },
    {
      word: "FUNCTION",
      scrambled: "NOITCNUF",
      hint: "A block of code that performs a specific task.",
    },
    {
      word: "VARIABLE",
      scrambled: "ELBAIRAV",
      hint: "A storage location in programming with a valid name.",
    },
    {
      word: "BROWSER",
      scrambled: "RESWORB",
      hint: "A software application for accessing the web.",
    },
    {
      word: "ARRAY",
      scrambled: "YARAR",
      hint: "A data structure that holds a collection ofelements.",
    },
    {
      word: "OBJECT",
      scrambled: "TCEJBO",
      hint: "An instance of a class in object-oriented programming.",
    },
    {
      word: "STRING",
      scrambled: "GNIRTS",
      hint: "A sequence of characters in programming.",
    },
  ];

  let currentWordIndex = 0;
  let attempts = 0;
  let timer;
  const TIMER_DURATION = 20;

  const scrambledWordElement = document.getElementById("scrambled-word");
  const userInput = document.getElementById("user-input");
  const feedback = document.getElementById("feedback");
  const attemptsElement = document.getElementById("attempts");
  const hintElement = document.getElementById("hint");
  const submitBtn = document.getElementById("submit-btn");
  const newWordBtn = document.getElementById("new-word-btn");
  const timerElement = document.getElementById("timer");
  const refreshWordBtn = document.getElementById("refresh-word-btn");

  function displayWord(index) {
    scrambledWordElement.textContent = words[index].scrambled;
    hintElement.textContent = `Hint: ${words[index].hint}`;
    userInput.value = "";
    feedback.textContent = "";
    attempts = 0;
    updateAttempts();
    startTimer();
  }

  function updateAttempts() {
    attemptsElement.textContent = `Attempts: ${attempts}`;
  }

  function checkGuess() {
    const userGuess = userInput.value.trim().toUpperCase();
    if (userGuess === words[currentWordIndex].word) {
      feedback.textContent = "Correct! Well done!";
      feedback.style.color = "green";
      refreshWordBtn.disabled = true;
      stopTimer();
    } else {
      feedback.textContent = "Incorrect guess. Try again!";
      feedback.style.color = "red";
      attempts++;
      updateAttempts();
    }
  }

  function getNewWord() {
    timerElement.style.color = "green";
    currentWordIndex = Math.floor(Math.random() * words.length);
    displayWord(currentWordIndex);
    userInput.disabled = false;
    submitBtn.disabled = false;
    refreshWordBtn.disabled = false;
  }

  function refreshScrambledWord() {
    const currentWord = words[currentWordIndex].word;
    words[currentWordIndex].scrambled = jumbleWord(currentWord);
    displayWord(currentWordIndex);
    userInput.disabled = false;
  }

  function jumbleWord(word) {
    const characters = word.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join("");
  }

  function startTimer() {
    timerElement.style.color = "green";

    if (timer) {
      clearInterval(timer);
    }

    let timeLeft = TIMER_DURATION;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;

      if (timeLeft <= 12) {
        timerElement.style.color = "orange";
      }
      if (timeLeft <= 5) {
        timerElement.style.color = "red";
      }
      if (timeLeft === 0) {
        clearInterval(timer);

        feedback.textContent = `Time is up! Try again with a new word. Your word was "${words[currentWordIndex].word}"`;

        feedback.style.color = "red";
        userInput.disabled = true;
        submitBtn.disabled = true;
        refreshWordBtn.disabled = true;
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timerElement.style.color = "gray";
    timerElement.textContent = "Time Left: 0s";
    userInput.disabled = true;
    submitBtn.disabled = true;
    updateAttempts();
  }

  submitBtn.addEventListener("click", checkGuess);
  newWordBtn.addEventListener("click", getNewWord);
  refreshWordBtn.addEventListener("click", refreshScrambledWord);

  displayWord(currentWordIndex);
});
