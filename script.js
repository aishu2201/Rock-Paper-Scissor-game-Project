const handOptions = {
  "rock": "rock.png",
  "paper": "paper.png",
  "scissors": "scissors.png",
}
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

let SCORE = parseInt(localStorage.getItem("userScore")) || 0;
let SCORE1 = parseInt(localStorage.getItem("computerScore")) || 0;

const isNewSession = sessionStorage.getItem("isNewSession") === null;


if (isNewSession || localStorage.getItem("userScore") === null) {
  SCORE = 0;
  localStorage.setItem("userScore", SCORE.toString());
} else {
  SCORE = parseInt(localStorage.getItem("userScore"));
}

if (isNewSession || localStorage.getItem("computerScore") === null) {
  SCORE1 = 0;
  localStorage.setItem("computerScore", SCORE1.toString());
} else {
  SCORE1 = parseInt(localStorage.getItem("computerScore"));
}
document.querySelector(".score h1").innerText = SCORE;
document.querySelector(".score1 h1").innerText = SCORE1;


const pickUserHand = (hand) => {
  let hands = document.querySelector(".hands");
  hands.style.display = "none";

  let contest = document.querySelector(".contest");
  contest.style.display = "flex";

  
  document.getElementById("userPickImage").src = handOptions[hand];

  pickComputerHand(hand);
};

const pickComputerHand = (hand) => {
    let hands = ["rock", "paper", "scissors"];
    let cpHand = hands[Math.floor(Math.random() * hands.length)];
    
    
    document.getElementById("computerPickImage").src = handOptions[cpHand]
    
    referee(hand, cpHand);
};

const referee = (userHand, cpHand) => {
  let result = "";

  const userChoiceElement = document.getElementById("userPickImage");
  const computerChoiceElement = document.getElementById("computerPickImage");

  
  userChoiceElement.classList.remove("winner", "loser");
  computerChoiceElement.classList.remove("winner", "loser");

  if (
    (userHand === "paper" && cpHand === "rock") ||
    (userHand === "rock" && cpHand === "scissors") ||
    (userHand === "scissors" && cpHand === "paper")
  ) {
    result = "YOU WIN AGAINST PC";
    setScore(SCORE + 1);
    showNextButton();
    userChoiceElement.classList.add("winner");
  } else if (
    (userHand === "paper" && cpHand === "scissors") ||
    (userHand === "rock" && cpHand === "paper") ||
    (userHand === "scissors" && cpHand === "rock")
  ) {
    result = "YOU LOST AGAINST PC";
    setScore1(SCORE1 + 1);
    hideNextButton();
    computerChoiceElement.classList.add("loser");
  } else {
    result = "TIE UP";
    hideNextButton();
  }

  setDecision(result);
};



const setDecision = (decision) => {
  document.querySelector(".decision h1").innerText = decision;
}
const setScore = (newScore) => {
  SCORE = newScore;
  document.querySelector(".score h1").innerText = SCORE;
  localStorage.setItem("userScore", SCORE.toString());
};

const setScore1 = (newScore) => {
  SCORE1 = newScore;
  document.querySelector(".score1 h1").innerText = SCORE1;
  localStorage.setItem("computerScore", SCORE1.toString());
};



btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});


const showNextButton = () => {
  
  const nextBtn = document.querySelector(".next-btn");
  nextBtn.style.display = "block";
};



const hideNextButton = () => {
  const nextBtn = document.querySelector(".next-btn");
  nextBtn.style.display = "none";
};

const restartGame = () => {
  
  
  setScore(SCORE);
  setScore1(SCORE1);

  
  let contest = document.querySelector(".contest");
  contest.style.display = "none";
  
  let hands = document.querySelector(".hands");
  hands.style.display = "flex";
  
  
  hideNextButton();
  
  
  setDecision("");
};
const showHurrayPage = () => {
 
  
  document.querySelector(".contest").style.display = "none";
  document.querySelector(".scoreboard").style.display = "none";

  const hurrayPage = document.querySelector(".hurray-page");
  const hurrayContent = document.querySelector(".hurray-content");

  
  hurrayPage.style.display = "flex";
  hurrayContent.style.display = "flex";
   

  
};
const notshowHurrayPage = () => {
  
  const hurrayPage = document.querySelector(".hurray-page");
  const hurrayContent = document.querySelector(".hurray-content");

  
  hurrayPage.style.display = "none";
  hurrayContent.style.display = "none";

  
};
const restart= () => {
  
  
  setScore(SCORE);
  setScore1(SCORE1);

  
  let contest = document.querySelector(".contest");
  contest.style.display = "none";
  let scoreboard = document.querySelector(".scoreboard");
  scoreboard.style.display = "flex";
  let hands = document.querySelector(".hands");
  hands.style.display = "flex";
  notshowHurrayPage();
  
  hideNextButton();
  
  
  setDecision("");
  
  localStorage.removeItem("userScore");
  localStorage.removeItem("computerScore");
  
  
  
  
};

if (isNewSession) {
  sessionStorage.setItem("isNewSession", "false");
}

window.addEventListener("beforeunload", () => {
  
  localStorage.setItem("userScore", SCORE.toString());
  localStorage.setItem("computerScore", SCORE1.toString());
});