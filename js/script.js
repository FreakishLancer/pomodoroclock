let breakTimer;
let focusTimer;

function print(timer, $selector) {
  timer < 10 ?
    $(`${$selector}`).text(` 0${timer}:00`) :
    $(`${$selector}`).text(` ${timer}:00`);
}

function printFocusTimer(focusTimer) {
  focusTimer < 10 ?
      $("#timer").text(`0${focusTimer}:00`) :
      $("#timer").text(`${focusTimer}:00`);
}

function reset() {
  breakTimer = 5;
  focusTimer = 25;
  print(breakTimer, "#break-timer");
  print(focusTimer, "#focus-timer");
  printFocusTimer(focusTimer);
  $("#focus-setter-container button").prop("disabled", false);
  $("#break-setter-container button").prop("disabled", false);
  $("#start").prop("disabled", false);
  $("#timer").css("color", "lightgray");
  $("#focus-timer").css("color", "black");
  $("#break-timer").css("color", "black");
  $("#mode").text("Click Start to focus!");
}

$(document).ready(() => {
  reset();

  $("#break-setter-container button.sub").on("click", () => {
    if (breakTimer === 1) return;
    breakTimer--;
    print(breakTimer, "#break-timer");
  });

  $("#break-setter-container button.add").on("click", () => {
    if (breakTimer === 99) return;
    breakTimer++;
    print(breakTimer, "#break-timer");
  });

  $("#focus-setter-container button.sub").on("click", () => {
    if (focusTimer === 1) return;
    focusTimer--;
    print(focusTimer, "#focus-timer");

    printFocusTimer(focusTimer);
  });

  $("#focus-setter-container button.add").on("click", () => {
    if (focusTimer === 99) return;
    focusTimer++;
    print(focusTimer, "#focus-timer")

    printFocusTimer(focusTimer);
  });

  $("#start").on("click", button => {
    $("#start").prop("disabled", true);
    $("#focus-setter-container button").prop("disabled", true);
    $("#break-setter-container button").prop("disabled", true);
    $("#timer").css("color", "black");
    $("#focus-timer").css("color", "lightgray");
    $("#break-timer").css("color", "lightgray");
    $("#mode").text("Focus Mode!");
    let memory = focusTimer;
    focusTimer--;
    let seconds = 60;
    let isFocusMode = true;
    let counter = setInterval(timer, 1000);

    function timer() {
      let minutesString = focusTimer.toString();
      let secondsString = seconds.toString();
      seconds--;

      if (seconds === 0) {
        focusTimer--;
        seconds = 60;
      }

      if (focusTimer <= 0 && seconds === 60) {
        if (isFocusMode) {
          $("#mode").text("Break Mode!");
          focusTimer = breakTimer - 1;
          isFocusMode = false;
        }
        else {
          $("#mode").text("Focus Mode!");
          focusTimer = memory - 1;
          isFocusMode = true;
        }
      }

      focusTimer <= 9 ?
        minutesString = "0" + focusTimer.toString() :
        minutesString = focusTimer.toString();

      seconds <= 9 ?
        secondsString = "0" + seconds.toString() :
        secondsString = seconds.toString();

      if (seconds === 60) secondsString = "00";

      $("#reset").on("click", () => {
        clearInterval(counter);
      });

      $("#timer").text(`${minutesString}:${secondsString}`);
    }
  });

  $("#reset").on("click", () => {
    reset();
  });
});