let deckId = localStorage.getItem("deckId")
let computerScore = 0
let myScore = 0

let cardsContainer = null,
    drawCardBtn = null,
    header = null,
    remainingText = null,
    computerScoreEl = null,
    myScoreEl = null

function init() {
    remainingText = document.getElementById("remaining");
    cardsContainer = document.getElementById("cards");
    newDeckBtn = document.getElementById("new-deck");
    drawCardBtn = document.getElementById("draw-cards");
    header = document.getElementById("header");
    computerScoreEl = document.getElementById("computer-score");
    myScoreEl = document.getElementById("my-score");

    newDeckBtn.addEventListener("click", handleClick)
    drawCardBtn.addEventListener("click", drawCard)
}

async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
    handleLocalStorage(deckId)

}

function handleLocalStorage(deckId) {
    localStorage.removeItem("deckId")
    localStorage.setItem("deckId", deckId)
}

async function fetchCards() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    return await res.json()
}

async function drawCard() {
    const data = await fetchCards()

    remainingCards(data)

    cardsContainer.children[0].innerHTML = `
            <img src="${data.cards[0].image}" class="card" />
        `
    cardsContainer.children[1].innerHTML = `
            <img src="${data.cards[1].image}" class="card" />
        `
    displayWinner(data)
}

function remainingCards(data) {
    remainingText.textContent = `Remaining cards: ${data.remaining}`
}

function displayWinner(data) {
    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    header.textContent = winnerText

    if (data.remaining === 0) {
        drawCardBtn.disabled = true
        if (computerScore > myScore) {
            header.textContent = "The computer won the game!"
        } else if (myScore > computerScore) {
            header.textContent = "You won the game!"
        } else {
            header.textContent = "It's a tie game!"
        }
    }
}

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}

document.addEventListener("DOMContentLoaded", init)