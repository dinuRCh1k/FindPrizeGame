document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.querySelector(".grid_container");
    const attemptsElement = document.querySelector(".game_attempts");
    const restartBtn = document.querySelector(".reset_btn");
    const gameTime = document.querySelector('.game_time');
    const modal = document.querySelector(".modal");
    const modalTitle = document.querySelector(".modal_title");
    const modalText = document.querySelector(".modal_text");
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-modal');

    let attempts = 3;
    let cross = ["red", "red", "green", "red", "red", "red"];
    let revealedCross = [];
    let win = 0;
    let lose = 0;
    let timeLeft = 10;

    function time(boolean) {
        if (boolean) {
            const timer = setInterval(() => {
                console.log(timeLeft, boolean);
                timeLeft--;
                gameTime.textContent = `Время: ${timeLeft}s`;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    resetGameTime();
                    console.log("Время вышло!");
                }
                return timer;
            }, 1000);
        } else {
            gameTime.textContent = `Время: 10s`;
        }
    }

    function sortCross() {
        cross.sort(() => 0.5 - Math.random());
    }

    function createLevel() {
        sortCross();
        time(true);
        attemptsElement.textContent = `Попытки: ${attempts}`;
        gameTime.textContent = 'Время: 10s';

        cross.forEach((card) => {
            const cardElement = document.createElement("article");
            cardElement.classList.add("card");
            cardElement.classList.add('card-first');
            cardElement.addEventListener('click', function () {
                revealedCross.push(card);
                current = card;
                cardElement.style.backgroundColor = current;
                if (current.includes('green')) {
                    win++;
                    if (win > 0) {
                        openModal('Поздравляю', 'Кросс НАЙН');
                        
                        const card = document.querySelectorAll('.card');
                        for (let i = 0; i < card.length; i++) {
                            card[i].style.backgroundColor = '#eae7e7';
                        }
                    }

                } else {
                    lose++;
                    attempts--;
                    attemptsElement.textContent = `Попытки: ${attempts}`;
                    if (attempts === 0) {
                        openModal('Вы проиграли', 'Начните заново');
                    }
                }
            })

            gridContainer.appendChild(cardElement);
        });
        return;
    }

    function openModal(title, text) {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        modalTitle.textContent = title;
        modalText.textContent = text;
    }

    function closeModal() {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        resetGame();
    }

    function nextLevel() {
        const cards = document.querySelectorAll('.card-first')
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = 'none';
        }


        cross.forEach((card) => {
            const cardElement = document.createElement("article");
            cardElement.classList.add("card");
            cardElement.classList.add('card-first');
            cardElement.addEventListener('click', function () {
                revealedCross.push(card);
                current = card;
                cardElement.style.backgroundColor = current;
                if (current.includes('green')) {
                    win++;
                    if (win > 0) {
                        openModal('Поздравляю', 'Кросс НАЙН');
                        nextLevel();
                        const card = document.querySelectorAll('.card');
                        for (let i = 0; i < card.length; i++) {
                            card[i].style.backgroundColor = '#eae7e7';
                        }
                    }

                } else {
                    lose++;
                    attempts--;
                    attemptsElement.textContent = `Попытки: ${attempts}`;
                    if (attempts === 0) {
                        openModal('Вы проиграли', 'Начните заново');
                    }
                }
            })

            gridContainer.appendChild(cardElement);
        });
        resetGame();
    }

    function resetGame() {
        sortCross();
        attempts = 3;
        attemptsElement.textContent = `Попытки: ${attempts}`;
        timeLeft = 10;
        time(false);
        const card = document.querySelectorAll('.card');
        for (let i = 0; i < card.length; i++) {
            card[i].style.backgroundColor = '#eae7e7';
        }
    }

    function resetGameTime() {
        sortCross();
        attempts = 3;
        attemptsElement.textContent = `Попытки: ${attempts}`;
        timeLeft = 10;
        time(false);
        time(true);
        const card = document.querySelectorAll('.card');
        for (let i = 0; i < card.length; i++) {
            card[i].style.backgroundColor = '#eae7e7';
        }
    }

    closeBtn.addEventListener('click', closeModal);
    restartBtn.addEventListener('click', resetGame);

    createLevel();

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    })
});