class Game {
    constructor(deck) {
        this._players = {
            "1": new Player(),
            "2": new Player() }
        this._PlayerOneDeck = document.getElementById("deck1").getElementsByClassName("card");
        this._PlayerTwoDeck = document.getElementById("deck2").getElementsByClassName("card");
        this._isPlayerTurn = "true";
        this._deck = deck;
        this.cardDeck = this._deck.cards;
    }

    dealCards () {
        for (let i = 0; i < this.cardDeck.length; i++) {
            if (this._isPlayerTurn) {
                this._players["1"].setDealtCard(this.cardDeck[i]);
                this.createDealtCardHTMLElem(this.cardDeck[i], "deck1");
                this._isPlayerTurn = false;
            } else {
                this._players["2"].setDealtCard(this.cardDeck[i]);
                this.createDealtCardHTMLElem(this.cardDeck[i], "deck2");
                this._isPlayerTurn = true;
            }
        }
        this.createStackEffectOnDealtCards(this._PlayerOneDeck, 0.03);
        this.createStackEffectOnDealtCards(this._PlayerTwoDeck, 0.03);
        this.addClickListenerToEachDealtCard();
    }

    createDealtCardHTMLElem (card, pile) {
        const cardToGoInDeck = document.createElement("div")
        cardToGoInDeck.className = `${card.rank}${card.suit}`;
        cardToGoInDeck.classList.add("card");
        document.getElementById(pile).appendChild(cardToGoInDeck);
    }

    createStackEffectOnDealtCards(playerDeckIdName, addMarginBy) {
        const playersDeck = playerDeckIdName;
        let marginNum = 0.05;
        for (let i = 0; i < playersDeck.length; i++) {
            playersDeck[i].style.margin = `${marginNum}em`;
            marginNum += addMarginBy;
        }
    }

    // Loop through each card in the players deck to add event listeners 
    addClickListenerToEachDealtCard() {
        const playerOneDeck = [...this._PlayerOneDeck]
        const playerTwoDeck = [...this._PlayerTwoDeck]
        playerOneDeck.forEach(card => {
            card.addEventListener("click", (event) => {
                this.putDownInPlayCard(card, playerOneDeck, "inplay1");
            })   
        });
        playerTwoDeck.forEach(card => {
            card.addEventListener("click", (event) => {
                this.putDownInPlayCard(card, playerTwoDeck, "inplay2");
            })   
        });

    }

    putDownInPlayCard (card, playerDeck, playerInPlayDeck) {
        // finds the 'clicked' card from the entire deck of cards
        const cardSuitAndRank = card.className.substring(0,2);
        console.log(cardSuitAndRank);
        const cardFromDeck = this.cardDeck.filter(card => card.image.includes(cardSuitAndRank));
        console.log(cardFromDeck);
        // 'creates' and 'puts down' the top card from a players deck 
        const cardToPlay = document.createElement("div");
        cardToPlay.style.backgroundImage = `url(${cardFromDeck[0].image})`;
        cardToPlay.className = `${cardFromDeck[0].rank}${cardFromDeck[0].suit}`;
        cardToPlay.classList.add("inplaycard");
        console.log(cardToPlay);
        document.getElementById(playerInPlayDeck).appendChild(cardToPlay);
        
        // removes the card from the players deck array, and removes its HTML element
        playerDeck.pop();
        const removeCard = document.getElementsByClassName(cardSuitAndRank);
        removeCard[0].remove(); // removes from players deck, NOT the in-play deck
    }
}

class Deck {
    constructor() {
        this._cards = [];
    }

    createDeck() {
        let suits = ['C', 'S', 'H', 'D'];
        let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K']
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                let image = `https://deckofcardsapi.com/static/img/${ranks[j]}${suits[i]}.png`
                this._cards.push(new Card(suits[i], ranks[j], image))
            }
        }
    }

    shuffleCards() {
        this._cards.sort((a, b) => 0.5 - Math.random());
    }

    get cards() {
        return this._cards;
    }
}

class Card {
    constructor(suit, rank, image) {
        this._rank = rank;
        this._suit = suit;
        this._image = image;
    }

    get suit() {
        return this._suit;
    }

    get rank() {
        return this._rank;
    }

    get image() {
        return this._image;
    }
}

class Player {
    constructor() {
        this._dealtCards = [];
        this._inPlayCard = [];
        this._pointsTotal = 0;
    }

    setDealtCard(dealtCard) {
        this._dealtCards.push(dealtCard);
    }

    setInPlayCard(inPlayCard) {
        this._inPlayCard.push(inPlayCard);
    }

    getDealtCards() {
        return this._dealtCards; 
    }

}

const newDeck = new Deck();
newDeck.createDeck();
newDeck.shuffleCards();
const newGame = new Game(newDeck);
newGame.dealCards();