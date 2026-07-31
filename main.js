function hideSections(){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("subtopic1").style.display = "none";
    document.getElementById("subtopic2").style.display = "none";
    document.getElementById("subtopic3").style.display = "none";
}
hideSections();
document.getElementById("homePage").style.display = "grid";

//home button
const homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click",function(){

    hideSections();
    document.getElementById("homePage").style.display = "grid";

});


//nav button 1
const subtopic1Button = document.getElementById("subtopic1Button");
subtopic1Button.addEventListener("click",function(){

    hideSections();
    document.getElementById("subtopic1").style.display = "grid";

});

//nav button 2
const subtopic2Button = document.getElementById("subtopic2Button");
subtopic2Button.addEventListener("click",function(){

    hideSections();
    document.getElementById("subtopic2").style.display = "grid";

});

//nav button3
const subtopic3Button = document.getElementById("subtopic3Button");
subtopic3Button.addEventListener("click",function(){

    hideSections();
    document.getElementById("subtopic3").style.display = "grid";

});

//hide result page
document.getElementById("result").style.display = "none";


//reset quiz
const quizReset = document.getElementById("reset_button");
quizReset.addEventListener("click",function(){

    document.querySelectorAll('#quiz input').forEach(function(input) {
        input.checked = false;
    });

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";

});


//submit quiz
const submitButton = document.getElementById("submit_button");
submitButton.addEventListener("click",function(){
    let score = 0;

    // Q1 correct answer: Red Blood Cell
    let q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value == "rbc") {
        score++;
    }


    // Q2 correct answer: Mitochondria
    let q2 = document.querySelector('input[name="q2"]:checked');
    if (q2 && q2.value == "mitochondria") {
        score++;
    }


    // Q3 correct answer: Endoplasmic reticulum
    let q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.value == "er") {
        score++;
    }


    // Q4 correct answers: T-Cell + White Blood Cell
    let q4 = document.querySelectorAll('input[name="q4"]:checked');

    let q4Answers = [];

    q4.forEach(function(answer) {
        q4Answers.push(answer.value);
    });

    let correctQ4 = ["tcell", "wbc"];

    if (
        q4Answers.length == correctQ4.length &&
        correctQ4.every(function(answer) {
            return q4Answers.includes(answer);
        })
    ) {
        score++;
    }


    // Q5 correct answer: White Blood Cell
    let q5 = document.querySelector('input[name="q5"]:checked');
    if (q5 && q5.value == "wbc") {
        score++;
    }

    // Hide quiz
    document.getElementById("quiz").style.display = "none";


    // Show result
    document.getElementById("result").style.display = "block";


    if (score == 5) {
        resultImg.src = "images/tick.png";
    } else {
        resultImg.src = "images/cross.png";
    }


    alert("You scored " + score + "/5");
});


//GAME
const wrongAudio = new Audio("audio/wrong_sound.mp3");
const correctAudio = new Audio("audio/correct_sound.mp3");

let game = document.getElementById("game");
let startButton = document.getElementById("startButton");

let scoreValue = document.getElementById("scoreValue");
let healthValue = document.getElementById("healthValue");

const resultImg = document.getElementById("resultImg");

let score = 0;
let health = 3;
let spawnTimer;

let gameRunning = false;

let goodImages = ["images/waterdroplet.webp","images/oxygen.png"];

let badImages = ["images/poop.jpg","images/CO2.jpg"];

startButton.addEventListener("click", startGame);

game.addEventListener("click", function(event)
{
    let image = event.target;

    // Ignore clicks that aren't on falling images
    if (!image.classList.contains("falling"))
    {
        return;
    }

    if (image.active == false)
    {
        return;
    }

    image.active = false;

    if (image.isBad)
    {
        score++;
        scoreValue.textContent = score;
        correctAudio.play();
    }
    else
    {
        wrongAudio.play();
        loseHealth();
    }

    image.remove();
});


function startGame()
{
    startButton.style.display = "none";

    score = 0;
    health = 3;

    scoreValue.textContent = score;
    healthValue.textContent = "❤️❤️❤️";

    gameRunning = true;
   
    spawnTimer = setInterval(function()
    {
        createFallingImage();

    }, 1000);
}


function createFallingImage()
{
    //dont create images if game is not running
    if(gameRunning == false)
    {
        return;
    }
    
    let image = document.createElement("img");

    let isBad = Math.random() < 0.5;
    if(isBad)
    {
        let randomBad = Math.floor(Math.random() * badImages.length);

        image.src = badImages[randomBad];
    }
    else
    {
        let randomGood = Math.floor(Math.random() * goodImages.length);

        image.src = goodImages[randomGood];
    }

    image.classList.add("falling");

    let randomPosition = Math.random() * (game.clientWidth - 60);
    image.style.left = randomPosition + "px";
    
    image.style.top = "0px";

    game.appendChild(image);
    image.draggable = false; // prevent dragging of image
    image.active = true;
    image.isBad = isBad;


    moveImage(image);
}

//make it fall
function moveImage(image)
{
    let position = 0;

    let falling = setInterval(function()
    {
        position = position + 5;

        image.style.top = position + "px";

        if(position > game.clientHeight)
        {

            clearInterval(falling);


            if(image.active == true)
            {
                image.active = false;


                if(image.isBad)
                {
                    loseHealth();
                }

            }

            
            image.remove();

        }

    }, 20);
}


function loseHealth()
{
    health = health - 1;


    if(health == 3)
    {
        healthValue.textContent = "❤️❤️❤️";
    }

    else if(health == 2)
    {
        healthValue.textContent = "❤️❤️";
    }

    else if(health == 1)
    {
        healthValue.textContent = "❤️";
    }

    else
    {
        healthValue.textContent = "💀";

        gameOver();
    }
}


function gameOver()
{
    gameRunning = false;


    clearInterval(spawnTimer);


    game.innerHTML =
    "<h2>Game Over</h2>" +
    "<p>Score: " + score + "</p>" +
    '<button id="restartButton">Restart</button>';


    let restartButton = document.getElementById("restartButton");


    restartButton.addEventListener("click", restartGame);
}


function restartGame()
{
    game.innerHTML = "";

    startGame();
}

//full screen
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");

btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);

function enterFullscreen() { //must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}
