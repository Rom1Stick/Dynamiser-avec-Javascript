var scores;
var roundScore;
var activePlayer;
var gamePlaying;


var instructions = document.querySelector('.instructions');

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var randomNumber = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var instructions = document.createElement('div');
        
        //3. Update the round score IF the rolled number was NOT a 1
        if (randomNumber !== 1) {
            instructions.style.display = 'block';
            instructions.textContent = '+ ' + randomNumber + ' pour le joueur ' + (activePlayer + 1);
            instructions.className = ".instructions"
            //Add score
            roundScore += randomNumber;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            instructions.style.display = 'block';
            instructions.textContent = ' Changement de joueur ';
            instructions.className = "instructionLoose"
            nextPlayer();
        }
    }   
    
    document.querySelector('.instructions').prepend(instructions);
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Gagnant(e) !';
            document.querySelector('.instructions').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}

// New game 
var newGame = document.querySelector('.btn-new');


newGame.addEventListener('click', function () {
    // reload current page for clear "instructions"
    location.reload();

    // to check that all scores are reset to 0
    init ();
});

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Joueur 1';
    document.getElementById('name-1').textContent = 'Joueur 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}