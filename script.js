class Game {
    constructor(deck) {
        this._players = {
            "1": new Player(),
            "2": new Player() }
        this._deck = deck;
        this._PlayerOneDeck = document.getElementById("deck1").getElementsByClassName("card");
        this._PlayerTwoDeck = document.getElementById("deck2").getElementsByClassName("card");
        this._isPlayerTurn = "true";
    }

    createCardElement (card, parentContainer) {
        const cardToGoInDeck = document.createElement("div")
        cardToGoInDeck.className = `${card.rank}${card.suit}`;
        cardToGoInDeck.classList.add("card");
        document.getElementById(parentContainer).appendChild(cardToGoInDeck);
    }

    dealCards () {
        const cardDeck = this._deck.cards;
        for (let i = 0; i < cardDeck.length; i++) {
            if (this._isPlayerTurn) {
                this._players["1"].setDealtCard(cardDeck[i]);
                this.createCardElement(cardDeck[i], "deck1");
                this._isPlayerTurn = false;
            } else {
                this._players["2"].setDealtCard(cardDeck[i]);
                this.createCardElement(cardDeck[i], "deck2");
                this._isPlayerTurn = true;
            }
        }
        this.createStackEffect(this._PlayerOneDeck, 0.03);
        this.createStackEffect(this._PlayerTwoDeck, 0.03);
        this.addClickListener()
    }

    createStackEffect (playerDeckIdName, addMarginBy) {
        const playersDeck = playerDeckIdName;
        let marginNum = 0.05;
        for (let i = 0; i < playersDeck.length; i++) {
            playersDeck[i].style.margin = `${marginNum}em`;
            marginNum += addMarginBy;
        }
    }

    // Loop throguh to add event listeners and do logic
    addClickListener() {
        const playerDeck = [...this._PlayerOneDeck]
        playerDeck.forEach(card => {
            card.addEventListener("click", (event) => {
                const cardToPlay = document.createElement("div");
                const cardInfo = card.className.substring(0,2);
                const cardDeck = this._deck.cards; // MAKE DRY
                const targetCard = cardDeck.filter(card => card.image.includes(cardInfo));
                cardToPlay.style.backgroundImage = `url(${targetCard[0].image})`;
                cardToPlay.className = `${targetCard[0].rank}${targetCard[0].suit}`;
                cardToPlay.classList.add("inplaycard");
                document.getElementById("inplay1").appendChild(cardToPlay);
                playerDeck.pop();
                const removeCard = document.getElementsByClassName(cardInfo);
                removeCard[0].remove();
            })
        });
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
        console.log(this._cards);
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