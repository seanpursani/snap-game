class Game {
    constructor(deck) {
        this._deck = deck;
        this._players = {
            1: new Player(),
            2: new Player()
        }
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

    dealCards () {
        let playerTurn = true;
        for (let i = 0; i < this._cards.length; i++) {
            if (playerTurn) {
                console.log(playerTurn)
                this._players["1"].setDealtCard(this._cards[i]);
                playerTurn = false;
            } 
            this._players["2"].setDealtCard(this.cards[i]);
            playerTurn = true;
        }
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
newDeck.shuffleCards();
console.log(newDeck);
newDeck.dealCards();

