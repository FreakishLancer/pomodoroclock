let breakTimer = 5;
let focusTimer = 25;

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

function countDown()

function reset() {
  breakTimer = 5;
  focusTimer = 25;
  print(breakTimer, "#break-timer");
  print(focusTimer, "#focus-timer");
  printFocusTimer(focusTimer);
  $("#focus-setter-container button").prop("disabled", false);
}

$(document).ready(() => {

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

  $("#start").on("click", () => {
    $("#focus-setter-container button").prop("disabled", true);
    $("#timer").css("color", "black");
    $("#focus-timer").css("color", "lightgray");

    let seconds = 60;
    focusTimer--;

    let focusCounter = setInterval(function() {
      seconds--;
      if (seconds === 0) {
        focusTimer--;
        seconds = 60;
      }
      if (seconds === 60 && focusTimer > 9) {
        $("#timer").text(`${focusTimer}:00`);
      }
      else if (seconds < 10 && focusTimer > 9) {
        $("#timer").text(`${focusTimer}:0${seconds}`);
      }
      else if (seconds > 9 && focusTimer > 9) {
        $("#timer").text(`${focusTimer}:${seconds}`);
      }
      else if (seconds < 10 && focusTimer < 10) {
        $("#timer").text(`0${focusTimer}:0${seconds}`);
      }
      else if (seconds > 9 && focusTimer < 10) {
        $("#timer").text(`0${focusTimer}:${seconds}`);
      }
    }, 1);

    if (focusTimer === 20 && seconds === 40) {
        clearInterval(focusCounter);
      }
  });

  $("#reset").on("click", () => {
    reset();
  });
});