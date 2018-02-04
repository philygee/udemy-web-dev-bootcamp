var numSquares;
var colors = [];
var pickedColour;
var squares = document.querySelectorAll(".square");
var titleColour = document.querySelector("#title");
var messageDisplay = document.getElementById("message")
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll(".mode");

init();


function init(){
	numSquares = 6;
	setUpButtons();
	initialise();
	activateSquares();
}

function setUpButtons(){
	//Set up mode buttons (easy and hard)
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			initialise();
			if (numSquares===6) {
				activateSquares();
			}
		})
	}
	//Set up reset button
	resetButton.addEventListener('click', initialise);
}

function initialise(){
	//update Title background colour
	h1.style.backgroundColor = "steelblue";
	//update message banner
	resetButton.textContent = "New Colours";
	messageDisplay.textContent = "";
	//Generate random colours based on the mode and update banner
	colors = generateRandomColours(numSquares);
	pickedColour = pickColour();
	titleColour.textContent = pickedColour;
	//Create squares; hide last 3 squares if easy mode is selected
	if (numSquares===3) {
		//turn the last 3 squares to the same colour as background
		colors.push("#232323","#232323","#232323");
		for (var i = 3; i < squares.length; i++) {
			//"deactivate" the hidden squares
			squares[i].removeEventListener("click", activate);
		}
	}	
	createSquares();
}

function changeColours(color){
	//loop through all squares
	for (var i = 0; i < numSquares; i++) {
		//change each colour to match given colour
		squares[i].style.backgroundColor = color;
	}	
}

function pickColour(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColours(num){
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random colour and push into arr
		arr.push(randomColour());		
	}
	//return that array
	return arr;
}

function randomColour(){
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random()*256);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random()*256);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random()*256);
	return 'rgb('+r+', '+g+', '+b+')';
}

function createSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
	}
}

function activateSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", activate);
	}
}

function activate(){
	//grab colour of picked square
	var clickedColour = this.style.backgroundColor;
	//compare colour to picked colour
	if (clickedColour === pickedColour) {
		messageDisplay.textContent = "Correct!";
		h1.style.backgroundColor = clickedColour;
		changeColours(clickedColour);
		resetButton.textContent = "Play Again?";
	} else {
		this.style.backgroundColor = "#232323";
		messageDisplay.textContent = "Try Again";
	}
}