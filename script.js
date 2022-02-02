class Game {
    constructor(deck) {
        this._players = {
            "1": new Player(),
            "2": new Player() }
        this._deck = deck;
    }

    dealCards () {
        const cardDeck = this._deck.getCards();
        let isPlayerTurn = true;
        for (let i = 0; i < cardDeck.length; i++) {
            if (isPlayerTurn) {
                this._players["1"].setDealtCard(cardDeck[i]);
                isPlayerTurn = false;
            } else {
                this._players["2"].setDealtCard(cardDeck[i]);
                isPlayerTurn = true;
            }
        }
    }

    addClickListener() {
        this._deck.getElement().addEventListener("click", (event) => {
            event.target.innerHTML = "TEST";
        });
    }
}

class Deck {
    constructor() {
        this._cards = [];
        this._element = document.querySelector(".deck");
    }

    createDeck() {
        let suits = ['C', 'S', 'H', 'D'];
        let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                let image = `https://deckofcardsapi.com/static/img/${suits[i]}${ranks[j]}.png`
                this._cards.push(new Card(suits[i], ranks[j], image))
            }
        }
        console.log(this._cards);
    }

    shuffleCards() {
        this._cards.sort((a, b) => 0.5 - Math.random());
    }

    getElement() {
        return this._element;
    }

    getCards() {
        return this._cards;
    }

}

class Card {
    constructor(suit, rank, image) {
        this._suit = suit;
        this._rank = rank;
        this._image = image;
    }
}

class Player {
    constructor() {
        this._dealtCards = [];
        this._inPlayCard = [];
    }

    setDealtCard(dealtCard) {
        this._dealtCards.push(dealtCard);
    }

    setinPlayCard(inPlayCard) {
        this._inPlayCard.push(inPlayCard);
    }

    getDealtCards() {
        return this._dealtCards; 
    }
}

const newDeck = new Deck();
newDeck.createDeck();
const newGame = new Game(newDeck);
newGame.dealCards();
newGame.addClickListener();
