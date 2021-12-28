const hole$$ = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const mole$$ = document.querySelectorAll(".mole");
const startButton$$ = document.querySelector("button");


let lastHole = 7;
let score = 0;
let timeUp;
let temporizador;
let lastHit = false;

// Esta funcion devuelve un tiempo aleatorio en milisegundos
function randomTime() {
   return((Math.random()*800)+350);//pendiente de ajustar
};
// Esta funcion proporciona un numero de agujero diferente al que se le pasa
function randomHole(last) {
    let randomNumber = last;
    while (randomNumber == last) {
        randomNumber = Math.floor(Math.random() * 6);
    };
    return randomNumber;
};

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        alert("Game Over!");
        }, 15000) 
};

startButton$$.addEventListener('click', startGame);



function borrarClase(param) {
    hole$$[param].classList.remove("up");
    /* alert("se ejecuto con " + param); */
};


 function peep() {
        let index = randomHole(lastHole);
        hole$$[index].classList.add("up");
        lastHit = false;
        lastHole = index;
        let tiempoAleatorio = randomTime();
        /* alert("se levanta? " + index + " " + tiempoAleatorio); */
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