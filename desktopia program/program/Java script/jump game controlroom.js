const player = document.getElementById('player');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let playerBottom = 0;
let score = 0;

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;
    let count = 0;
    let upInterval = setInterval(() => {
        if (count >= 15) {
            clearInterval(upInterval);
            // descend
            let downInterval = setInterval(() => {
                if (count <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                playerBottom -= 5;
                player.style.bottom = playerBottom + 'px';
                count--;
            }, 20);
        } else {
            playerBottom += 5;
            player.style.bottom = playerBottom + 'px';
            count++;
        }
    }, 20);
}

// Create obstacles
function createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    game.appendChild(obstacle);
    let obstacleRight = -40;
    obstacle.style.right = obstacleRight + 'px';

    function moveObstacle() {
        if (obstacleRight > 840) {
            // off screen, remove obstacle
            game.removeChild(obstacle);
            clearInterval(intervalId);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
            return;
        } else if (
            obstacleRight > 740 && obstacleRight < 790 &&
            playerBottom < 40
        ) {
            // collision detected
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';
    }

    let intervalId = setInterval(moveObstacle, 20);
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        jump();
    }
});

// Create obstacles every 2 seconds
setInterval(createObstacle, 2000);