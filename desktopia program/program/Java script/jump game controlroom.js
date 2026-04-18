const player = document.getElementById('player');
const obstacle1 = document.getElementById('obstacle');

const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');

let playerBottom = 0;
let isJumping = false;
let gravity = 0.8;
let velocity = 0;
let score = 0;
let gameOver = false;

// Create second obstacle dynamically
const obstacle2 = document.createElement('div');
obstacle2.id = 'obstacle2';
obstacle2.style.position = 'absolute';
obstacle2.style.bottom = '0px';
obstacle2.style.width = '30px';
obstacle2.style.height = '50px';
obstacle2.style.background = '#E74C3C';
obstacle2.style.borderRadius = '5px';
obstacle2.style.right = '-30px';
document.getElementById('game').appendChild(obstacle2);

// Initial horizontal positions (on the right side, off-screen)
let obstacle1Left = 600;
let obstacle2Left = 900;

const OBSTACLE_WIDTH = 30;
const MIN_GAP = 180; // Minimum horizontal distance between obstacles to allow jumps

window.onload = () => {
  document.body.setAttribute('tabindex', '0');
  document.body.focus();
};

function jump() {
  if (!isJumping && !gameOver) {
    isJumping = true;
    velocity = 15;
  }
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    jump();
  }
});

document.addEventListener('click', e => {
  e.preventDefault();
  jump();
});

// Clamp function helper
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Respawn obstacle ensuring enough gap
function respawnObstacle(currentObstacleLeft, otherObstacleLeft) {
  // Random spawn between 600 and 1000 px from left boundary
  let newPos = 600 + Math.random() * 400;

  // If too close to other obstacle, push it ahead
  if (Math.abs(newPos - otherObstacleLeft) < MIN_GAP) {
    if (newPos < otherObstacleLeft) {
      newPos = otherObstacleLeft - MIN_GAP;
    } else {
      newPos = otherObstacleLeft + MIN_GAP;
    }
  }

  // Clamp within reasonable bounds to stay offscreen right side
  newPos = clamp(newPos, 600, 1200);

  return newPos;
}

function update() {
  if (gameOver) return;

  // Gravity effect on jump
  velocity -= gravity;
  playerBottom += velocity;
  if (playerBottom <= 0) {
    playerBottom = 0;
    isJumping = false;
    velocity = 0;
  }
  player.style.bottom = playerBottom + 'px';

  // Move obstacle1
  obstacle1Left -= 9;
  if (obstacle1Left < -OBSTACLE_WIDTH) {
    obstacle1Left = respawnObstacle(obstacle1Left, obstacle2Left);
    score++;
    scoreEl.textContent = 'Score: ' + score;
  }
  obstacle1.style.left = obstacle1Left + 'px';

  // Move obstacle2
  obstacle2Left -= 9;
  if (obstacle2Left < -OBSTACLE_WIDTH) {
    obstacle2Left = respawnObstacle(obstacle2Left, obstacle1Left);
    score++;
    scoreEl.textContent = 'Score: ' + score;
  }
  obstacle2.style.left = obstacle2Left + 'px';

  const playerRect = player.getBoundingClientRect();
  const obstacle1Rect = obstacle1.getBoundingClientRect();
  const obstacle2Rect = obstacle2.getBoundingClientRect();

  // Collision detection obstacle1
  if (
    playerRect.right > obstacle1Rect.left &&
    playerRect.left < obstacle1Rect.right &&
    playerRect.bottom > obstacle1Rect.top
  ) {
    gameOver = true;
    messageEl.textContent = 'Game Over! Refresh to play again.';
  }

  // Collision detection obstacle2
  if (
    playerRect.right > obstacle2Rect.left &&
    playerRect.left < obstacle2Rect.right &&
    playerRect.bottom > obstacle2Rect.top
  ) {
    gameOver = true;
    messageEl.textContent = 'Game Over! Refresh to play again.';
  }

  requestAnimationFrame(update);
}

update();