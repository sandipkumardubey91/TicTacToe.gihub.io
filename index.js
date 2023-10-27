const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
initGame();

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create function to initialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
        // boxes should un greend or initialized css property again;
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box, index) =>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    });
});


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        //check if winner
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";

    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){

    let answer="";

    winningPositions.forEach((position) =>{
        // all three boxes should be non empty and and equal
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && gameGrid[position[0]] ===  gameGrid[position[1]] && gameGrid[position[2]] ===  gameGrid[position[1]]){

            //chexk if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";
            //diable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // now we now X/O is wiiner;
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
    // we have a winner
   if(answer !== ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active"); 
    return;
   }

   // when there is no winner or tie
   let fillcount = 0;
   gameGrid.forEach(box =>{
    if(box !== "")
        fillcount++;
   });

   if(fillcount == 9){
    gameInfo.innerText = "Game Tied !!!"
    newGameBtn.classList.add("active"); 
   }

}

newGameBtn.addEventListener('click',initGame);