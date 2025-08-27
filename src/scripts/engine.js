const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points')
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
    button: document.getElementById('next-duel')
}

const playerSides = {
    player1: 'player-cards',
    computer: 'computer-cards'
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

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'))
        })

        cardImage.addEventListener('mouseover', () => {
            drawSelectCard(idCard)
        })
    }



    return cardImage
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


function init() {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}

init()