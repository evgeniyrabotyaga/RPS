import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");
const allGameIcons = document.querySelectorAll(".far");
const playerContainer = document.querySelector(".player-container");
let computerChoice = "";
let playerChoice = "";
let playerScoreNumber = 0;
let computerScoreNumber = 0;

const playerOption = function (e) {
  resetSelected();
  const clicked = e.target.closest(".s");
  if (!clicked) return;
  playerChoiceEl.textContent = ` --- ${clicked.title}`;
  clicked.classList.add("selected");
  playerChoice = clicked.title.toLowerCase();
  checkResult();
};

const computerOption = function () {
  const computerChoiceNumber = Math.trunc(Math.random() * 5);
  if (computerChoiceNumber === 0) computerChoice = "rock";
  if (computerChoiceNumber === 1) computerChoice = "paper";
  if (computerChoiceNumber === 2) computerChoice = "scissors";
  if (computerChoiceNumber === 3) computerChoice = "lizard";
  if (computerChoiceNumber === 4) computerChoice = "spock";
  document.querySelector(`.c-hand-${computerChoice}`).classList.add("selected");
  computerChoiceEl.textContent =
    ` --- ${computerChoice}`.toUpperCase().slice(0, 6) +
    ` --- ${computerChoice}`.slice(6);
};

const resetSelected = function () {
  allGameIcons.forEach((e) => e.classList.remove("selected"));
  stopConfetti();
  removeConfetti();
};

const updateScore = function () {
  if (playerChoice === computerChoice) resultText.textContent = "It's a tie.";
  else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      startConfetti();
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
};

const checkResult = function () {
  computerOption();
  updateScore();
};

playerContainer.addEventListener("click", playerOption);
document.querySelector(".fas").addEventListener("click", function () {
  computerChoice = "";
  playerChoice = "";
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  resultText.textContent = "Start Playing!";
  resetSelected();
});

// Modal Window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const event = document.querySelectorAll(".event");

const toggleModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

event.forEach((e) => e.addEventListener("click", toggleModal));
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) toggleModal();
});
