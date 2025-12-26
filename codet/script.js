const botChoices = document.querySelectorAll(".bot-choices .choice");
const playerChoices = document.querySelectorAll(".choice");
const botImage = document.querySelector(".bot-img");
const botChoicesBox = document.querySelector(".bot-choices");
const playerScoreEl = document.querySelector(".player-score");
const botScoreEl = document.querySelector(".bot-score");
const resultBox = document.querySelector(".result");

function getRandomBotChoice() {
	const randomIndex = Math.floor(Math.random() * botChoices.length);
	const current = document.querySelector(".choice.show");
	if (current) current.classList.remove("show");
	botChoices[randomIndex].classList.add("show");
	return randomIndex;
}

const botImages = {
	lose: ["4712036.png", "bot_4712063.png"],
	win: ["4712041.png", "bot_4712048.png"]
};

let botChoice;
let botInterval = setInterval(() => {
	botChoice = getRandomBotChoice();
}, 200);

let playerScore = 0;
let botScore = 0;

playerChoices.forEach(choice => {
	choice.onclick = function () {
		this.classList.add("hide-left");
		botChoicesBox.classList.add("hide-right");
		clearInterval(botInterval);

		const playerChoice = Number(this.className.replace(/[^0-9]/g, ""));

		if (playerChoice === botChoice) {
			botImage.src = "icon_bot/bot_4711997.png";
			showResult("draw", this);
			return;
		}

		if (
			playerChoice === 0 && botChoice === 2 ||
			playerChoice === 1 && botChoice === 0 ||
			playerChoice === 2 && botChoice === 1
		) {
			playerScore++;
			changeBotImage("lose");
			showResult("win", this);
		} else {
			botScore++;
			changeBotImage("win");
			showResult("lose", this);
		}

		playerScoreEl.textContent = playerScore;
		botScoreEl.textContent = botScore;
	};
});

function changeBotImage(type) {
	const images = botImages[type];
	const randomImg = Math.floor(Math.random() * images.length);
	botImage.src = "icon_bot/" + images[randomImg];
}

function showResult(type, element) {
	if (type === "win") {
		resultBox.textContent = "لقد ربحت !";
	}
	if (type === "lose") {
		resultBox.textContent = "لقد خسرت !";
	}
	if (type === "draw") {
		resultBox.textContent = "تعادل";
	}

	resultBox.classList.add("show");

	setTimeout(() => {
		resultBox.classList.remove("show");
		element.classList.remove("hide-left");
		botChoicesBox.classList.remove("hide-right");
	}, 1000);

	botInterval = setInterval(() => {
		botChoice = getRandomBotChoice();
	}, 200);
}
