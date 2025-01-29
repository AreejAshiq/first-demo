const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = [...emojis, ...emojis];
let moves = 0;
let pairs = 0;
let flippedCards = [];
let canFlip = true;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(emoji, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
                <div class="card-face card-front">${emoji}</div>
                <div class="card-face card-back">?</div>
            `;
  card.dataset.index = index;
  card.dataset.emoji = emoji;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (
    !canFlip ||
    this.classList.contains("flipped") ||
    this.classList.contains("matched")
  )
    return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  canFlip = false;
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    pairs++;
    document.getElementById("pairs").textContent = pairs;

    if (pairs === emojis.length) {
      setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves!`);
        resetGame();
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }

  setTimeout(() => {
    flippedCards = [];
    canFlip = true;
  }, 1000);
}

function resetGame() {
  moves = 0;
  pairs = 0;
  document.getElementById("moves").textContent = moves;
  document.getElementById("pairs").textContent = pairs;

  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  cards = shuffle([...emojis, ...emojis]);
  cards.forEach((emoji, index) => {
    gameBoard.appendChild(createCard(emoji, index));
  });
}

resetGame();
