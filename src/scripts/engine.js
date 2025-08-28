const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score-points')
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type')
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    playerSides: {
        player1: 'player-cards',
        player1Box: document.querySelector('#player-cards'),
        computer: 'computer-cards',
        computerBox: document.querySelector('#computer-cards')
    },
    actions: {
        button: document.getElementById('next-duel')
    }
}



const pathImages = './src/assets/icons/'
const cardData = [
    {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0]

    },
    {
        id: 2,
        name: 'Exodia',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1]

    },
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2]

    }
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('height', '100px')
    cardImage.setAttribute('src', `${pathImages}card-back.png`)
    cardImage.setAttribute('data-id', idCard)
    cardImage.classList.add('card')

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'))
        })

        cardImage.addEventListener('mouseover', () => {
            drawSelectCard(idCard)
        })
    }

    return cardImage
}

async function setCardsField(cardId) {
    await removeAllCardsImage()

    let computerCardId = await getRandomCardId()

    await ShowHiddenCardFieldsImages(true)

    await hiddenCardDetails()    

    await drawCardsInfield(cardId, computerCardId)

    let duelResults = await checkDuelResults(cardId, computerCardId)

    await updateScore()
    await drawButton(duelResults)

}

async function drawCardsInfield(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img
}

async function ShowHiddenCardFieldsImages(value) {
    if(value === true) {
        state.fieldCards.player.style.display = 'block'
        state.fieldCards.computer.style.display = 'block'
    } else {
        state.fieldCards.player.style.display = 'none'
        state.fieldCards.computer.style.display = 'none'
    }
}

async function hiddenCardDetails() {
    state.cardSprites.name.innerText = ''
    state.cardSprites.type.innerText = ''
    state.cardSprites.avatar.src = ''
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore}\nLose: ${state.score.computerScore}`
}

async function removeAllCardsImage() {
    let cards = state.playerSides.computerBox
    let imgElements = cards.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())

    cards = state.playerSides.player1Box
    imgElements = cards.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())
}

async function checkDuelResults(playerId, computerId) {
    let duelResults = "DRAW"
    let playerCard = cardData[playerId]

    if(playerCard.winOf.includes(computerId)) {
        duelResults = "WIN"
        await playAudio(win)
        state.score.playerScore++
    } else if (playerCard.loseOf.includes(computerId)){
        duelResults = "LOSE"
        await playAudio(lose)
        state.score.computerScore++
    }

    return duelResults
}

async function drawButton(text) {
    state.actions.button.innerText = text
    state.actions.button.style.display = 'block'
}

async function drawSelectCard(id) {
    state.cardSprites.avatar.src = cardData[id].img
    state.cardSprites.name.innerText = cardData[id].name
    state.cardSprites.type.innerText = `Attribute: ${cardData[id].type}`

}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)
        document.getElementById(fieldSide).appendChild(cardImage)

    }
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play()
}

async function resetDuel() {
    state.cardSprites.avatar.src = ''
    state.actions.button.style.display = 'none'

    state.fieldCards.player.style.display = 'none'
    state.fieldCards.computer.style.display = 'none'

    init()

}

function init() {
    ShowHiddenCardFieldsImages(false)

    drawCards(5, state.playerSides.player1)
    drawCards(5, state.playerSides.computer)

    const bgm = document.getElementById('bgm')
    bgm.play()
}

init()
