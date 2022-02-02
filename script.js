class Game {
    constructor(deck) {
        this._players = {
            "1": new Player(),
            "2": new Player() }
        this._deck = deck;
    }

    dealCards () {
        const cardDeck = this._deck.getDeck();
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
        console.log(this._players["1"].getDealtCards());
    }
}

class Deck {
    constructor() {
        this._cards = [];
    }

    createDeck() {
        let suits = ['clubs', 'spades', 'hearts', 'diamonds'];
        let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this._cards.push(new Card(suits[i], ranks[j]))
            }
        }
    }

    shuffleCards() {
        this._cards.sort((a, b) => 0.5 - Math.random());
    }

    getDeck() {
        return this._cards;
    }

}

class Card {
    constructor(suit, rank) {
        this._suit = suit;
        this._rank = rank;
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

const newDeck = new Deck;
newDeck.createDeck();
console.log(newDeck);
const newGame = new Game(newDeck);
newGame.dealCards();
