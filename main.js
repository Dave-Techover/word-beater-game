// GLOBAL VARIABLES
let   playerScore           = 0,
	playerEasyHighScore   = 0,
	playerNormalHighScore = 0,
	playerHardHighScore   = 0,
	playerExpertHighScore = 0,
	time,
	isPlaying;

// ARRAY OF WORDS
let wordList = ["Absolutely", "Document", "Command", "Developer", "Difficulty", "Overflow", "Network", "TechOver", "Spectacular", "Beautiful", "Element", "Computer", "Amazing", "Mississippi", "Accumulator"];	 

// DOM VARIABLES
const   gameStartContainer           = document.querySelector(".game-start"),
	  startBtn                     = document.querySelector(".start-btn"),
	  levels                       = document.querySelector(".levels"),
	  gameContainer                = document.querySelector(".game-container"),
	  givenWord                    = document.querySelector(".given-word"),
	  wordInput                    = document.querySelector(".word-input"),
	  timeDisplay                  = document.querySelector(".time-display"),
	  timeLimit		             = document.querySelector(".time-limit"),	 
	  playerScoreDisplay           = document.querySelector(".player-score"),
	  newHighScoreAlert            = document.querySelector(".new-high-score"),
	  highScoreDisplay             = document.querySelector(".high-score"),
	  comment                      = document.querySelector(".comment"),
	  guide 		             = document.querySelector(".guide"),
	  pickNewLevelBtn              = document.querySelector(".pick-level-btn");

// DETERMINE GAME DIFFICULTY
const gameDifficulty = () => {
	event.preventDefault()
	if(levels.value === "easy"){
		time = 10
		highScoreDisplay.innerHTML = localStorage.getItem("easyHighScore");
	}else if(levels.value === "normal"){
		time = 7
		highScoreDisplay.innerHTML = localStorage.getItem("normalHighScore")
	}else if(levels.value === "hard"){
		time = 5
		highScoreDisplay.innerHTML = localStorage.getItem("hardHighScore")
	}else if(levels.value === "expert"){
		time = 3
		highScoreDisplay.innerHTML = localStorage.getItem("expertHighScore")
	}
}

// PICK RANDOM WORD FROM ARRAY OF WORDS
const pickWord = (wordList) => {
	const randomIndex = Math.floor(Math.random() * wordList.length);
	givenWord.textContent = wordList[randomIndex];
}

// CHECK IF THE TWO WORDS MATCH
const matchWords = () => {
	if(wordInput.value === givenWord.textContent){
		comment.textContent = "Nice one"
		comment.style.color = "Green"
		return true 
	}else{
		comment.textContent = "..."
		return false
	}
}

// localStorage.setItem("easyHighScore", playerEasyHighScore);
// localStorage.setItem("normalHighScore", playerNormalHighScore);
// localStorage.setItem("hardHighScore", playerHardHighScore);
// localStorage.setItem("expertHighScore", playerExpertHighScore);
// console.log(localStorage.getItem('easyHighScore'));
// console.log(localStorage.getItem('normalHighScore'));
// console.log(localStorage.getItem('hardHighScore'));
// console.log(localStorage.getItem('expertHighScore'));

// CHECK FOR NEW HIGH SCORE
const highScoreCheck = () => {
	if(levels.value === "easy"){
		if(playerScore > localStorage.getItem("easyHighScore")){
			localStorage.setItem("easyHighScore", playerScore);
			playerEasyHighScore = localStorage.getItem("easyHighScore");
			highScoreDisplay.innerHTML = playerEasyHighScore
			newHighScoreAlert.classList.remove("hide");
		}
	}
	else if(levels.value === "normal"){
			if(playerScore > localStorage.getItem("normalHighScore")){
				localStorage.setItem("normalHighScore", playerScore);
				playerNormalHighScore = localStorage.getItem("normalHighScore");
				highScoreDisplay.innerHTML = playerNormalHighScore
				newHighScoreAlert.classList.remove("hide");
			}
	}
	else if(levels.value === "hard"){
			if(playerScore > localStorage.getItem("hardHighScore")){
				localStorage.setItem("hardHighScore", playerScore);
				playerHardHighScore = localStorage.getItem("hardHighScore");
				highScoreDisplay.innerHTML = playerHardHighScore
				newHighScoreAlert.classList.remove("hide");
			}
	}
	else if(levels.value === "expert"){
			if(playerScore > localStorage.getItem("expertHighScore")){
				localStorage.setItem("expertHighScore", playerScore);
				playerExpertHighScore = localStorage.getItem("expertHighScore");
				highScoreDisplay.innerHTML = playerExpertHighScore
				newHighScoreAlert.classList.remove("hide");
			}
	}
}

console.log(localStorage.getItem("easyHighScore"));

const startMatch = () => {
	if(matchWords()){
		gameDifficulty()
		++time
		isPlaying = true
		pickWord(wordList);
		wordInput.value = ""
		playerScore++
		playerScoreDisplay.innerHTML = playerScore
		highScoreCheck();
	}	
}

// TIMER
const countdown = () => {
	if(time > 0){
		time--
	}else if(time === 0){
		isPlaying = false
	}
	timeDisplay.textContent = time
}

// CHECKSTATUS
const checkStatus = () => {
	if(time === 0){
		comment.textContent = "Game Over!"
		comment.style.color = "red"
		highScoreCheck();
		playerScore = -1
	}
}


const countD = () => setInterval(countdown, 1000),
      checkS = () => setInterval(checkStatus, 10);

// INITIAL FUNCTION
const initial = () => {
	pickWord(wordList);
	countD();
	checkS();
	wordInput.focus({focusVisible: true});
	wordInput.addEventListener("input", startMatch);
	timeLimit.textContent = time + " seconds"
	playerScoreDisplay.innerHTML = playerScore
}

// START THE GAME
const startGame = () => {
	gameDifficulty();
	console.log(time);
	timeDisplay.textContent = time
	gameStartContainer.classList.add("hide");
	guide.classList.add("hide");
	gameContainer.classList.remove("hide");
      initial();
      console.log(levels.value)
}

// RELOAD PAGE TO PICK NEW LEVEL
const pickNewLevel = () => {
	window.location.reload();
}

pickNewLevelBtn.addEventListener("click", function(){
	pickNewLevel();
});

startBtn.addEventListener("click", function(){
	startGame();
});