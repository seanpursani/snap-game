class Game {
    constructor(deck) {
        this._players = {
            "1": new Player(),
            "2": new Player() }
        this._deck = deck; this.cardDeck = this._deck.cards;
        this._playerOneDeck = document.getElementById("deck1").getElementsByClassName("card");
        this._playerTwoDeck = document.getElementById("deck2").getElementsByClassName("card");
        this._isPlayerTurn = "true";
    }

    //Deals Card --> Creates 3d Stack Effect --> Add Click Listener to each Card --> Listen for "Snap"!
    startGame () {
        for (let i = 0; i < this.cardDeck.length; i++) {
            if (this._isPlayerTurn) {
                //this._players["1"].setDealtCard(this.cardDeck[i]);
                this.createDealtCardHTMLElem(this.cardDeck[i], "deck1");
                this._isPlayerTurn = false;
            } else {
                //this._players["2"].setDealtCard(this.cardDeck[i]);
                this.createDealtCardHTMLElem(this.cardDeck[i], "deck2");
                this._isPlayerTurn = true;
            }
        }
        this.createStackEffectOnDealtCards(this._playerOneDeck, 0.03);
        this.createStackEffectOnDealtCards(this._playerTwoDeck, 0.03);
        this.addClickListenerToEachDealtCard();
        this.addSnapListener(this._players, this._playerOneDeck, this._playerTwoDeck);
    }

    // Create and append a <div> element based on the dealt card
    createDealtCardHTMLElem (card, playerDeck) {
        const cardToGoInDeck = document.createElement("div")
        cardToGoInDeck.className = `${card.rank}${card.suit}`;
        cardToGoInDeck.classList.add("card");
        document.getElementById(playerDeck).appendChild(cardToGoInDeck);
    }

    // Add a 3D effect on the card deck by slightly incrementing each cards margin
    createStackEffectOnDealtCards(playerDeckIdName, addMarginBy) {
        const playersDeck = playerDeckIdName;
        let marginNum = 0.05;
        for (let i = 0; i < playersDeck.length; i++) {
            playersDeck[i].style.margin = `${marginNum}em`;
            marginNum += addMarginBy;
        }
    }

    // Loop through each card in each players deck to add an event listener 
    addClickListenerToEachDealtCard() {
        const playerOneDeck = [...this._playerOneDeck]
        const playerTwoDeck = [...this._playerTwoDeck]
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

    // Places the top card from the players deck onto the inplay area 
    putDownInPlayCard (card, playerDeck, playerInPlayDeck) {
        // finds the 'clicked' card from the entire deck of cards
        const cardSuitAndRank = card.className.substring(0,2); // e.g AC - Ace of Clubs
        const cardFromDeck = this.cardDeck.filter(card => card.image.includes(cardSuitAndRank));
        // 'creates' and 'puts down' the top card from a players deck into the inplay area
        const cardToPlay = document.createElement("div");
        cardToPlay.style.backgroundImage = `url(${cardFromDeck[0].image})`;
        cardToPlay.className = `${cardFromDeck[0].rank}${cardFromDeck[0].suit}`;
        cardToPlay.classList.add("inplaycard");
        document.getElementById(playerInPlayDeck).appendChild(cardToPlay);
        // removes the card from the players deck, and removes its associated HTML element
        playerDeck.pop();
        const removeCard = document.getElementsByClassName(cardSuitAndRank);
        removeCard[0].remove(); // [0] removes the card from players deck, but NOT from the in-play deck
    }

    addSnapListener(players, playerOneDeck, PlayerTwoDeck) {
        document.addEventListener("keydown", function (event) {
            let score = this.getElementById("score");
            const inPlayDeckPlayerOne = document.getElementById("inplay1").getElementsByClassName("inplaycard");
            const inPlayDeckPlayerTwo = document.getElementById("inplay2").getElementsByClassName("inplaycard");
            if (event.key === 'l') {
                if ((inPlayDeckPlayerOne[inPlayDeckPlayerOne.length-1].className.substring(0,1) === inPlayDeckPlayerTwo[inPlayDeckPlayerTwo.length-1].className.substring(0,1))) {
                    players["1"].awardOrTakePoint(true);
                    console.log(playerOneDeck);
                } else {
                    players["1"].awardOrTakePoint(false);
                }
            }
            if (event.key === 'a') {
                if ((inPlayDeckPlayerOne[inPlayDeckPlayerOne.length-1].className.substring(0,1) === inPlayDeckPlayerTwo[inPlayDeckPlayerTwo.length-1].className.substring(0,1))) {
                    players["2"].awardOrTakePoint(true);
                } else {
                    players["2"].awardOrTakePoint(false);
                }
            }
            score.innerHTML = `Player 1: ${players["1"].pointsTotal} | ${players["2"].pointsTotal}: Player 2`
        })
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
        this._pointsTotal = 0;
    }

    awardOrTakePoint(isValid) {
        (isValid) ? this._pointsTotal++ : this._pointsTotal--;
    }

    get pointsTotal() {
        return this._pointsTotal;
    }
}

const newDeck = new Deck();
newDeck.createDeck();
newDeck.shuffleCards();
const newGame = new Game(newDeck);
newGame.startGame();