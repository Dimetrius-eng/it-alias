// --- Глобальні змінні ---
let allWordsByCategory = {}; 
let availableWords = []; 
let isSoundEnabled = true; 
const SOUND_STORAGE_KEY = 'itAliasSound'; 
let sounds = {}; 
let gameState = {
  team1Score: 0,
  team2Score: 0,
  team1Name: "Команда 1",
  team2Name: "Команда 2",
  currentTeam: 1, 
  roundTime: 60,
  totalRounds: 3,
  currentRound: 0,
  isGameInProgress: false,
  lastRoundScore: 0,
  selectedCategory: 'mixed',
  isRoundActive: false 
};
let roundScore = 0;
let timeLeft = 0;
let timerInterval;

// --- Знаходимо елементи на HTML-сторінці ---
// (Без змін)
const screens = document.querySelectorAll('.screen');
const mainMenuScreen = document.getElementById('main-menu-screen'); 
const settingsScreen = document.getElementById('settings-screen'); 
const rulesScreen = document.getElementById('rules-screen');     
const gameScreen = document.getElementById('game-screen');
const turnEndScreen = document.getElementById('turn-end-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const pauseScreen = document.getElementById('pause-screen'); 
const scoreboard = document.getElementById('scoreboard');
const team1NameDisplay = document.getElementById('team1-name');
const team1ScoreDisplay = document.getElementById('team1-score');
const team2NameDisplay = document.getElementById('team2-name');
const team2ScoreDisplay = document.getElementById('team2-score');
const team1Input = document.getElementById('team1-input');
const team2Input = document.getElementById('team2-input');
const timeSlider = document.getElementById('time-slider');
const timeOutput = document.getElementById('time-output');
const roundsSlider = document.getElementById('rounds-slider');
const roundsOutput = document.getElementById('rounds-output');
const categorySelect = document.getElementById('category-select'); 
const continueBtn = document.getElementById('continue-btn'); 
const newGameMenuBtn = document.getElementById('new-game-menu-btn'); 
const rulesBtn = document.getElementById('rules-btn');             
const startBtn = document.getElementById('start-btn'); 
const skipBtn = document.getElementById('skip-btn');
const correctBtn = document.getElementById('correct-btn');
const nextTurnBtn = document.getElementById('next-turn-btn');
const resetGameBtn = document.getElementById('reset-game-btn'); 
const newGameBtn = document.getElementById('new-game-btn'); 
const backButtons = document.querySelectorAll('.btn-primary[data-target], .btn-tertiary[data-target]');
const pauseBtn = document.getElementById('pause-btn');       
const resumeBtn = document.getElementById('resume-btn');     
const quitToMenuBtn = document.getElementById('quit-to-menu-btn'); 
const soundToggleBtn = document.getElementById('sound-toggle-btn'); 
const timerDisplay = document.getElementById('timer');
const roundCounterDisplay = document.getElementById('round-counter'); 
const wordDisplay = document.getElementById('word-display');
const turnEndTitle = document.getElementById('turn-end-title'); 
const roundSummaryDisplay = document.getElementById('round-summary');
const nextTeamNameDisplay = document.getElementById('next-team-name');
const winnerMessageDisplay = document.getElementById('winner-message'); 
const finalScoreSummaryDisplay = document.getElementById('final-score-summary');

// --- Прив'язуємо функції до кнопок ---
// (Без змін)
newGameMenuBtn.addEventListener('click', () => { /* ... */ });
rulesBtn.addEventListener('click', () => showScreen(rulesScreen));
startBtn.addEventListener('click', setupNewGame);
continueBtn.addEventListener('click', continueGame); 
correctBtn.addEventListener('click', handleCorrect);
skipBtn.addEventListener('click', handleSkip);
nextTurnBtn.addEventListener('click', startRound);
resetGameBtn.addEventListener('click', quitGame); 
newGameBtn.addEventListener('click', () => {
    performReset(); 
    showScreen(mainMenuScreen); 
}); 
backButtons.forEach(button => { /* ... */ });
pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);
quitToMenuBtn.addEventListener('click', quitGame); 
soundToggleBtn.addEventListener('click', toggleSound); 
timeSlider.oninput = function() { timeOutput.value = this.value; }
roundsSlider.oninput = function() { roundsOutput.value = this.value; }

// --- Робота зі сховищем (localStorage) ---
// (Без змін)
const GAME_STORAGE_KEY = 'itAliasSavedGame'; 
function saveGameState() { /* ... */ }
function loadGameState() { /* ... */ }
function clearGameState() { /* ... */ }

// --- Логіка Звуку ---
// (Без змін)
function loadSounds() { /* ... */ }
function playSound(sound) { /* ... */ }
function stopSound(sound) { /* ... */ }
function updateSoundIcon() { /* ... */ }
function toggleSound() { /* ... */ }
function loadSoundPreference() { /* ... */ }

// --- Ініціалізація гри (Запуск) ---
async function initializeApp() {
  loadSoundPreference();
  loadSounds();
  newGameMenuBtn.disabled = true;
  continueBtn.disabled = true;
  try {
    const response = await fetch('./words.json');
    if (!response.ok) throw new Error('Не вдалося завантажити слова.');
    allWordsByCategory = await response.json(); 
    newGameMenuBtn.disabled = false;
    console.log(`Завантажено ${Object.keys(allWordsByCategory).length} категорій слів.`);
  } catch (error) { /* ... */ }
  
  if (loadGameState() && gameState.isGameInProgress) {
    continueBtn.style.display = 'block';
    continueBtn.disabled = false;
  }
  
  pauseBtn.style.display = 'none'; 
  soundToggleBtn.style.display = 'block'; // Звук видно завжди, окрім паузи
  
  showScreen(mainMenuScreen); 
  scoreboard.style.display = 'none';
}

// --- Функції гри ---
function showScreen(screenToShow) {
  screens.forEach(screen => screen.classList.remove('active'));
  screenToShow.classList.add('active');
}
function getWordsForCategory(category) { /* ... */ }
function setupNewGame() {
  // (Без змін)
  clearGameState(); 
  // ...
  updateScoreboard();
  scoreboard.style.display = 'flex'; 
  startRound();
}
function continueGame() {
  // (Без змін)
  updateScoreboard();
  scoreboard.style.display = 'flex';
  // ...
  if (gameState.isRoundActive) {
    startRound(true); 
  } else {
    showRoundSummary(true); 
  }
}
function startRound(isContinuation = false) {
  // (Без змін)
  // ...
  nextWord();
  showScreen(gameScreen);
  
  pauseBtn.style.display = 'block'; 
  soundToggleBtn.style.display = 'block'; // Переконатися, що звук видно
  
  startTimer();
  gameState.isRoundActive = true; 
  saveGameState(); 
}
function startTimer() { /* (Без змін) */ }
function nextWord() { /* (Без змін, логіка тексту вже тут) */ }
function handleCorrect() { /* (Без змін) */ }
function handleSkip() { /* (Без змін) */ }

function endRound() {
  clearInterval(timerInterval); 
  gameState.isRoundActive = false; 
  
  pauseBtn.style.display = 'none'; 
  soundToggleBtn.style.display = 'block'; // Переконатися, що звук видно
  
  stopSound(sounds.tick); 
  playSound(sounds.timesUp); 
  
  // (Решта коду - без змін)
  // ...
  saveGameState(); 
}

function showRoundSummary(isContinuation = false) { /* (Без змін) */ }
function updateScoreboard() { /* (Без змін) */ }
function showWinner() { /* (Без змін) */ }

function performReset() {
  stopSound(sounds.tick); 
  pauseBtn.style.display = 'none'; 
  soundToggleBtn.style.display = 'block'; // Переконатися, що звук видно
  
  gameState.isGameInProgress = false; 
  // (Решта коду - без змін)
  // ...
  gameState.lastRoundScore = 0; 
}

// --- Функції Паузи ---
function pauseGame() {
  clearInterval(timerInterval); 
  stopSound(sounds.tick); 
  
  pauseBtn.style.display = 'none'; 
  soundToggleBtn.style.display = 'none'; // ЗМІНА ТУТ: Ховаємо звук на паузі
  
  showScreen(pauseScreen); 
}
function resumeGame() {
  showScreen(gameScreen); 
  
  pauseBtn.style.display = 'block'; 
  soundToggleBtn.style.display = 'block'; // ЗМІНА ТУТ: Повертаємо звук
  
  startTimer(); 
}
function quitGame() {
  if (!confirm("Вийти в головне меню? Ваш прогрес буде збережено.")) {
      return; 
  }
  clearInterval(timerInterval); 
  stopSound(sounds.tick); 
  
  pauseBtn.style.display = 'none'; 
  // (Кнопка звуку увімкнеться в initializeApp)
  
  gameState.isRoundActive = false; 
  saveGameState(); 
  scoreboard.style.display = 'none'; 
  initializeApp(); 
}

// --- ЗАПУСК ДОДАТКУ ---
initializeApp();
