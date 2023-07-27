document.addEventListener("DOMContentLoaded", function () {
  let sessionDuration = 25; // Default session duration (in minutes)
  let breakDuration = 5; // Default break duration (in minutes)

  let isSession = true;
  let isRunning = false;
  let timeRemaining = sessionDuration * 60;
  let timerInterval;

  function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById("clock").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Set the appropriate label based on the current state (session or break)
    if (isSession) {
      document.getElementById("timerLabel").textContent = "session";
    } else {
      document.getElementById("timerLabel").textContent = "break";
    }
  }

  function startTimer() {
    isRunning = true;
    timerInterval = setInterval(function () {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        if (isSession) {
          timeRemaining = breakDuration * 60;
        } else {
          timeRemaining = sessionDuration * 60;
        }
        isSession = !isSession;
        updateTimerDisplay();
        startTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
  }

  function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    isSession = true;
    timeRemaining = sessionDuration * 60;
    updateTimerDisplay();
  }

  function adjustSessionLength(increment) {
    sessionDuration += increment;
    if (sessionDuration < 1) {
      sessionDuration = 1; // Prevent setting session duration to 0 or negative values
    }
    if (isSession) {
      timeRemaining = sessionDuration * 60;
      updateTimerDisplay();
    }
    document.getElementById("cd").textContent = sessionDuration;
  }

  function adjustBreakLength(increment) {
    breakDuration += increment;
    if (breakDuration < 1) {
      breakDuration = 1; // Prevent setting break duration to 0 or negative values
    }
    if (!isSession) {
      timeRemaining = breakDuration * 60;
      updateTimerDisplay();
    }
    document.getElementById("pauseLength").textContent = breakDuration;
  }

  document.getElementById("start").addEventListener("click", function () {
    if (!isRunning) {
      startTimer();
    }
  });

  document.getElementById("pause").addEventListener("click", function () {
    if (isRunning) {
      pauseTimer();
    }
  });

  document.getElementById("reset").addEventListener("click", function () {
    resetTimer();
  });

  document.getElementById("cdUP").addEventListener("click", function () {
    adjustSessionLength(1);
  });

  document.getElementById("cdDOWN").addEventListener("click", function () {
    adjustSessionLength(-1);
  });

  document.getElementById("pauseUP").addEventListener("click", function () {
    adjustBreakLength(1);
  });

  document.getElementById("pauseDOWN").addEventListener("click", function () {
    adjustBreakLength(-1);
  });

  updateTimerDisplay();
});
