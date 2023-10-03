document.addEventListener('DOMContentLoaded', () => {

    // const cardSymbols = ['A', 'B', 'C', 'D']; //4x4
    // const cardSymbols = ['A', 'B', 'C', 'D', 'E', 'F']; //6x6
    const cardSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; //8x8
    const cardPairs = cardSymbols.concat(cardSymbols);

    const grid = document.querySelector('.grid');
    const restartButton = document.querySelector('#restart-button')

    let cardsFlipped = [];
    let cardsOutOfGame = [];
    let cardsMatched = 0;
    let isCardFlipped = false;
    let lockBoard = false;

    const gameBoard = () => {
        for (let i = 0; i < cardPairs.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card', 'face-down');
            card.dataset.symbol = cardPairs[i];
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(cardPairs);

    //arrow function does not work with (this) keyword.
    function flipCard() {
        if (lockBoard || cardsOutOfGame.includes(this)) return;
        if (this === cardsFlipped[0]) return;

        this.classList.add('face-up');
        this.textContent = this.dataset.symbol;

        if (isCardFlipped === false) {
            isCardFlipped = true;
            cardsFlipped[0] = this;
        } else {
            cardsFlipped[1] = this;
            checkMatching();
        }
    }

    const checkMatching = () => {
        const firstCardSymbol = cardsFlipped[0].dataset.symbol;
        const secondCardSymbol = cardsFlipped[1].dataset.symbol;

        if (firstCardSymbol === secondCardSymbol) {
            cardsOutOfGame.push(cardsFlipped[0], cardsFlipped[1]);
            cardsFlipped[0].classList.add('match');
            cardsFlipped[1].classList.add('match');

            //reset for the next round
            cardsFlipped = [];

            isCardFlipped = false;
            cardsMatched += 2;

            if (cardsMatched === cardPairs.length) setTimeout(displayWinMessage, 500)

        } else {
            lockBoard = true;

            setTimeout(() => {
                cardsFlipped[0].textContent = '';
                cardsFlipped[1].textContent = '';
                cardsFlipped[0].classList.remove('face-up');
                cardsFlipped[1].classList.remove('face-up');

                //reset for the next round
                cardsFlipped = [];

                isCardFlipped = false;
                lockBoard = false;
            }, 1000);
        }

    }

    const displayWinMessage = () => {
        alert('You Won The Game 😄')
        resetGame();
    }

    const resetGame = () => {
        grid.innerHTML = '';
        cardsFlipped = [];
        cardsMatched = 0;
        isCardFlipped = false;
        lockBoard = false;
        shuffleArray(cardPairs);
        gameBoard();
    }

    restartButton.addEventListener('click', resetGame);

    gameBoard();
})

