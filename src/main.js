const PHASES = {
  work:        { label: 'Work',        duration: 25 * 60, phase: 'work' },
  shortBreak:  { label: 'Short Break', duration: 5 * 60,  phase: 'short-break' },
  longBreak:   { label: 'Long Break',  duration: 15 * 60, phase: 'long-break' },
};

const SESSIONS_BEFORE_LONG_BREAK = 4;

let currentPhase = PHASES.work;
let timeRemaining = currentPhase.duration;
let timerInterval = null;
let isRunning = false;
let completedSessions = 0;

// DOM elements
let timerDisplay, modeLabel, sessionInfo, btnStart, btnPause, btnReset, btnSkip;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeRemaining);
  modeLabel.textContent = currentPhase.label;
  document.body.setAttribute('data-phase', currentPhase.phase);

  const sessionNum = Math.min(completedSessions + 1, SESSIONS_BEFORE_LONG_BREAK);
  sessionInfo.textContent = `Session ${sessionNum} / ${SESSIONS_BEFORE_LONG_BREAK}`;
}

function sendNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body });
      }
    });
  }
}

function switchPhase() {
  if (currentPhase === PHASES.work) {
    completedSessions++;
    if (completedSessions >= SESSIONS_BEFORE_LONG_BREAK) {
      currentPhase = PHASES.longBreak;
      sendNotification('Pomodoro Timer', 'Lange Pause! Du hast 4 Sessions geschafft.');
    } else {
      currentPhase = PHASES.shortBreak;
      sendNotification('Pomodoro Timer', 'Kurze Pause!');
    }
  } else {
    if (currentPhase === PHASES.longBreak) {
      completedSessions = 0;
    }
    currentPhase = PHASES.work;
    sendNotification('Pomodoro Timer', 'Arbeitsphase startet!');
  }

  timeRemaining = currentPhase.duration;
  updateDisplay();
}

function tick() {
  if (timeRemaining <= 0) {
    stopTimer();
    switchPhase();
    startTimer();
    return;
  }
  timeRemaining--;
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(tick, 1000);
  btnStart.disabled = true;
  btnPause.disabled = false;
}

function stopTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  btnStart.disabled = false;
  btnPause.disabled = true;
}

function resetTimer() {
  stopTimer();
  currentPhase = PHASES.work;
  completedSessions = 0;
  timeRemaining = currentPhase.duration;
  updateDisplay();
}

function skipPhase() {
  stopTimer();
  switchPhase();
}

window.addEventListener('DOMContentLoaded', () => {
  timerDisplay = document.getElementById('timer-display');
  modeLabel = document.getElementById('mode-label');
  sessionInfo = document.getElementById('session-info');
  btnStart = document.getElementById('btn-start');
  btnPause = document.getElementById('btn-pause');
  btnReset = document.getElementById('btn-reset');
  btnSkip = document.getElementById('btn-skip');

  btnStart.addEventListener('click', startTimer);
  btnPause.addEventListener('click', stopTimer);
  btnReset.addEventListener('click', resetTimer);
  btnSkip.addEventListener('click', skipPhase);

  // Request notification permission early
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  updateDisplay();
});
