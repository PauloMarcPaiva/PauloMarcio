const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
];

const cards = images.concat(images);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");
cards.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = image;
  card.appendChild(img);
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = false;

  if (
    (firstCard.firstChild.src === images[0] && secondCard.firstChild.src === images[1]) ||
    (firstCard.firstChild.src === images[1] && secondCard.firstChild.src === images[0]) ||
    (firstCard.firstChild.src === images[2] && secondCard.firstChild.src === images[3]) ||
    (firstCard.firstChild.src === images[3] && secondCard.firstChild.src === images[2]) ||
    (firstCard.firstChild.src === images[4] && secondCard.firstChild.src === images[5]) ||
    (firstCard.firstChild.src === images[5] && secondCard.firstChild.src === images[4])
  ) {
    isMatch = true;
  }

  isMatch ? handleMatch() : handleMismatch();
}

function handleMatch() {
  firstCard.classList.add("match");
  secondCard.classList.add("match");

  resetBoard();
}

function handleMismatch() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
