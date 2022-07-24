var scores;
var roundScore;
var activePlayer;
var gamePlaying;
var bestScore;

var instructions        = document.querySelector('.instructions');
var newGame             = document.querySelector('.btn-new');
var myModal             = document.querySelector('#myModal')

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
            instructions.textContent = `Le joueur ${(activePlayer + 1)} lance le dé et tombe sur ${randomNumber} => (+ ${randomNumber})`;
            instructions.className = ".instructions"
            //Add score
            roundScore += randomNumber;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            instructions.style.display = 'block';
            instructions.textContent = 'Le dé est tombé sur 1, changement de joueur 🎲';
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
            newGame.classList.add('btn-new-winner')
            document.querySelector('#name-' + activePlayer).textContent = 'Gagnant(e) !';
            document.querySelector('.instructions').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            modal();
            window.confettiful = new Confettiful(document.querySelector('.js-container'));

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

newGame.addEventListener('click', (e) => {

    // selection of the best player 
    bestScorePlayer();

    // request for confirmation if the game is already in progress
    if  ((scores[0] || scores[1] !== 0) && (scores[0] || scores[1] < 100)) {
        
        let confirmNewGame = confirm(`Voulez vous vraiment recommencer votre partie ? ça serait dommage pour ${bestScore} qui était en tête 😃`);
        if (confirmNewGame) {

            location.reload();
            init();
        } 
    } else {
        
        // reload current page for clear "instructions"
        location.reload();
        // to check that all scores are reset to 0
        init ();
    }
    
    e.preventDefault();
});

// function INIT 

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('score-0').textContent      = '0';
    document.getElementById('score-1').textContent      = '0';
    document.getElementById('current-0').textContent    = '0';
    document.getElementById('current-1').textContent    = '0';
    document.getElementById('name-0').textContent       = 'Joueur 1';
    document.getElementById('name-1').textContent       = 'Joueur 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// funtion BEST SCORE

function bestScorePlayer() {
    if (scores[0] > scores[1]) {

        bestScore = 'Joueur 1';
        return bestScore
        
    } else {

        bestScore = 'Joueur 2';
        return bestScore
    } 
}

// function MODAL

function modal() {
        let myModal = new bootstrap.Modal(
          document.getElementById("myModal"),
          {}
        );

        document.querySelector('.modal-body').textContent = `Félicitation Joueur ${activePlayer + 1} vous remportez la partie avec un score de ${scores[activePlayer]}`
        myModal.show();
};



// CONFETTI
// develop by debroah on codepen : https://codepen.io/deborah1029/pen/KKQORoK
// Change of the places of appearance of the confetti to make them appear if the score is 100 or more;
//   window.confettiful = new Confettiful(document.querySelector('.js-container'));

class Confettiful {
    constructor(el) {
        this.el = el;
        this.containerEl = null;

        this.confettiFrequency = 3;
        this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
        this.confettiAnimations = ['slow', 'medium', 'fast'];

        this._setupElements();
        this._renderConfetti();
    }
    _setupElements() {
        const containerEl = document.createElement('div');
        const elPosition = this.el.style.position;

        if (elPosition !== 'relative' || elPosition !== 'absolute') {
            this.el.style.position = 'relative';
        }

        containerEl.classList.add('confetti-container');

        this.el.appendChild(containerEl);

        this.containerEl = containerEl;
    }
    _renderConfetti() {
        this.confettiInterval = setInterval(() => {
            const confettiEl = document.createElement('div');
            const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
            const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
            const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
            const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

            confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;

            confettiEl.removeTimeout = setTimeout(function () {
                confettiEl.parentNode.removeChild(confettiEl);
            }, 3000);

            this.containerEl.appendChild(confettiEl);
        }, 25);
    }
}
  