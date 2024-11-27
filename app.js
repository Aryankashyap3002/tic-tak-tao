const gameArena = document.querySelector(".game-arena"); 
const gameDivArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let turn = false;
let movesCount = 0;

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        let gameDiv = document.createElement("div");
        gameDiv.classList.add("game-div");
        gameDiv.id = `${i}${j}`;
        gameDivArray[i][j] = gameDiv;
        gameArena.appendChild(gameDiv);
    }
}

gameDivArray.forEach((row) => {
    row.forEach((ele) => {
        ele.addEventListener("click", function() {
            if (ele.innerText !== "") return;
            ele.innerText = turn ? "O" : "X";
            movesCount++;
            if (checkWinning()) {
                setTimeout(() => {
                    alert(`${turn ? "X" : "O"} Wins!`);
                    resetGame();
                }, 200);
            } else if (movesCount === 9) {
                setTimeout(() => {
                    alert("It's a Draw!");
                    resetGame();
                }, 200);
            }
            turn = !turn;
        });
    });
});

function checkWinning() {
    for (let i = 0; i < 3; i++) {
        if (gameDivArray[i][0].innerText && 
            gameDivArray[i][0].innerText === gameDivArray[i][1].innerText && 
            gameDivArray[i][0].innerText === gameDivArray[i][2].innerText) {
            return true;
        }
        if (gameDivArray[0][i].innerText && 
            gameDivArray[0][i].innerText === gameDivArray[1][i].innerText && 
            gameDivArray[0][i].innerText === gameDivArray[2][i].innerText) {
            return true;
        }
    }
    if (gameDivArray[0][0].innerText && 
        gameDivArray[0][0].innerText === gameDivArray[1][1].innerText && 
        gameDivArray[0][0].innerText === gameDivArray[2][2].innerText) {
        return true;
    }
    if (gameDivArray[0][2].innerText && 
        gameDivArray[0][2].innerText === gameDivArray[1][1].innerText && 
        gameDivArray[0][2].innerText === gameDivArray[2][0].innerText) {
        return true;
    }
    return false;
}

function resetGame() {
    gameDivArray.forEach(row => {
        row.forEach(cell => {
            cell.innerText = "";
        });
    });
    turn = false;
    movesCount = 0;
}

function runGame() {
    resetGame();
}

function intiateGame() {
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.classList.add('start-btn');
    const upperDiv = document.getElementById("upperDiv");
    upperDiv.appendChild(startButton);
    startButton.addEventListener('click', function () {
        startButton.style.display = 'none';
        runGame();
    });
}

intiateGame();
