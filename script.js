let score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,    
    Loses: 0,
    Ties: 0
};

function computerMove() {
    const compMove = Math.random();
    let compresult = '';

    if (compMove >= 0 && compMove < 1 / 3) {
        compresult = 'rock';
    }
    else if (compMove >= 1 / 3 && compMove < 2 / 3) {
        compresult = 'paper';
    }
    else if (compMove >= 2 / 3 && compMove < 1) {
        compresult = 'scissors';
    }

    return compresult;
}
 
let displayResult = document.querySelector('.display-result');
let displayMoves = document.querySelector('.display-moves');
let wins = document.querySelector('.wins');

displayResult.innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses}, Tie: ${score.Ties}`;

function yourMove(move) {


    const compresult = computerMove();
    let result = '';

    if (move === 'rock') {
        if (compresult === 'rock') {
            result = 'It\'s a tie.';
        }
        else if (compresult === 'paper') {
            result = 'You lose!';
        }
        else if (compresult === 'scissors') {
            result = 'You won ^.^';
        }
    }

    else if (move === 'paper') {
        if (compresult === 'rock') {
            result = 'You won ^.^';
        }
        else if (compresult === 'paper') {
            result = 'It\'s a tie.';
        }
        else if (compresult === 'scissors') {
            result = 'You lose!';
        }
    }

    else if (move === 'scissors') {
        if (compresult === 'rock') {
            result = 'You lose!';
        }
        else if (compresult === 'paper') {
            result = 'You won ^.^';
        }
        else if (compresult === 'scissors') {
            result = 'It\'s a tie.';

        }
    }

    if (result === 'You won ^.^') {
        score.Wins += 1;
    }
    else if (result === 'You lose!') {
        score.Loses += 1;
    } 
    else if (result === 'It\'s a tie.') {
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    displayMoves.innerHTML = `<h1>${result}</h1>`;
    wins.innerHTML = `You <img src="${move}-emoji.png" alt="${move}">  <img src="${compresult}-emoji.png" alt="${move}"> Computer`;
    displayResult.innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses}, Tie: ${score.Ties}`;

}

function resetScore() {

    if(score.Wins !== 0 || score.Loses !== 0 || score.Ties !== 0){

    // let confirmation = confirm('Are you sure you want to reset the score?');
    let confirmCtn = document.querySelector('.confirmation-ctn');
    let yesBtn = document.querySelector('.yes-btn');
    let noBtn = document.querySelector('.no-btn');

    confirmCtn.style.display = 'block';

    yesBtn.addEventListener('click', ()=>{

        localStorage.removeItem('score');
        score.Wins = 0;
        score.Loses = 0;
        score.Ties = 0;

        displayMoves.innerHTML = '';
        wins.innerHTML = '';
        displayResult.innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses}, Tie: ${score.Ties}`;

        confirmCtn.style.display = 'none';

    })
        
    noBtn.addEventListener('click', ()=>{

        confirmCtn.style.display = 'none';
        
    })} else{
        alert('Play the game first!');
    }


}

let autoplaying = false;
let IdStop;
let autoplayButton = document.querySelector('.autoplay');

function autoplay(){
    
    if(!autoplaying){

        
        IdStop = setInterval(()=>{
            let move = computerMove();
            yourMove(move);
        },1000)
        
        autoplaying = true;
        autoplayButton.innerHTML = 'Stop Autoplay';
      
    }else{

        
        clearInterval(IdStop);
        autoplaying = false;
    
        if(autoplayButton.innerHTML == 'Stop Autoplay'){
            autoplayButton.innerHTML = 'Start Autoplay';
          }
    }
    
    
}

document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'a'){
        autoplay();
    }else if(event.key === 'Backspace'){
        resetScore();
    }else if(event.key === 'r'){
        yourMove('Rock');   
    }else if(event.key === 'p'){
        yourMove('Paper');  
    }
    else if(event.key === 's'){
        yourMove('Scissors');  
    }
})  
