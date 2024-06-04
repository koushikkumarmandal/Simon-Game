let gameSeq = [];
let userSeq = [];
let buttons = ["red", "green", "yellow", "purple"];
let maxScore = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 50);
}

function flashUser(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 50);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random() * 4);
    let randColor = buttons[randInd];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(randColor);
    flashBtn(randBtn);
}

function checkAns(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        maxScore.push(level);
        h2.innerHTML = `Game over! <b>Your score is = ${5*level}</b> <br> Maximum score is = ${maximumScore()*5} <br> Press any key to restart.`;
        reset();
    }
}

function btnPress() {
    let btn = this;
    flashUser(btn);
    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".button");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function maximumScore(){
    return maxScore.reduce(function(res, el){
        return res > el ? res : el;
    }, 0);
}
