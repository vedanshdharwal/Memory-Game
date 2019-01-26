const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipcard() {
    if(lockBoard) return;
    if(this == firstCard) return;
    this.classList.add('flip');
    
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
    
    //second click
    hasFlippedCard = false;
    secondCard = this;
    
    checkForMatch();
}

function checkForMatch() {
    var isMatch = firstCard.dataset.framework == secondCard.dataset.framework;
    
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    //it's a match!!
    firstCard.removeEventListener('click',flipcard);
    secondCard.removeEventListener('click',flipcard);
}

function unflipCards() {
    lockBoard = true;
    // not a match
    setTimeout( function() {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    },1500);
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null,null];
}


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click',flipcard));

