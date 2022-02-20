const hole$$ = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const mole$$ = document.querySelectorAll(".mole");
const startButton$$ = document.querySelector("button");
const timer$$ = document.querySelector('.time');

let lastHole = 7;
let score = 0;
let timeUp;
let temporizador;
let lastHit = false;
let time = 15;

// Esta funcion devuelve un tiempo aleatorio en milisegundos
function randomTime() {
   return((Math.random()*800)+350);
};
// Esta funcion proporciona un numero de agujero diferente al que se le pasa
function randomHole(last) {
    let randomNumber = last;
    while (randomNumber == last) {
        randomNumber = Math.floor(Math.random() * 6);
    };
    return randomNumber;
};
//Esta funcion comienza el juego y llama a peep y a timer, el settimeout controla la duracion, cuando transcurra el tiempo definido timeup será true
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    time = 15;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        }, time*1000)
    timer();
};

startButton$$.addEventListener('click', startGame);

function borrarClase(param) {
    hole$$[param].classList.remove("up");
    
};
//peep levanta un mole distinto al anterior y transcurrido un tiempo aleatorio esconde el mole y se llama recursivamente si timeup es false. 
function peep() {
    let index = randomHole(lastHole);
    hole$$[index].classList.add("up");
    lastHit = false;
    lastHole = index;
    let tiempoAleatorio = randomTime();
    setTimeout(() => {
        borrarClase(index);
        if (timeUp == false) {
            peep();
        }
    }, tiempoAleatorio); 
};

for (let i = 0; i < mole$$.length; i++){
    mole$$[i].addEventListener('click', scorePoints);
};

function scorePoints() {
    if (lastHit == false) {
    score += 5;
    scoreBoard.innerText = score;
    lastHit = true;
    };
};

function timer () {
    setTimeout(() => {
        timer$$.innerText = "TIME: " + time;
        time--;
        if (time >= 0) {
            timer();
        } else {
            timer$$.innerText = "GAME OVER";
        }  
    },1000)
}