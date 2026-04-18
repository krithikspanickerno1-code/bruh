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

// Initial horizontal positions (distance from LEFT edge)
let obstacle1Left = 600;
let obstacle2Left = 900;

const OBSTACLE_WIDTH = 30;
const GAME_WIDTH = 600;

// Calculate maximum jump distance horizontally
// Player jumps with initial velocity 15 and gravity 0.8
// Time to reach max height: t_up = velocity / gravity
// Total jump time = 2 * t_up
// Horizontal speed = 9 units per frame (obstacle speed)
// So, max jump distance = horizontal speed * total jump frames

const jumpInitialVelocity = 15;
const jumpGravity = 0.8;
const obstacleSpeed = 9;

// Calculate jump duration in frames
const jumpDurationFrames = Math.ceil((2 * jumpInitialVelocity) / jumpGravity);
// Minimum gap = jumpDurationFrames * obstacleSpeed + some margin
const MIN_GAP = jumpDurationFrames * obstacleSpeed + 10; 

window.onload = () => {
  document.body.setAttribute('tabindex', '0');
  document.body.focus();
};

function jump() {
  if (!isJumping && !gameOver) {
    isJumping = true;
    velocity = jumpInitialVelocity;
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

// Clamp helper
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Respawn obstacle making sure gap with other obstacle remains at least MIN_GAP
function respawnObstacle(currentObstacleLeft, otherObstacleLeft) {
  let newPos = GAME_WIDTH + Math.random() * 400;

  // Ensure obstacles are always at least MIN_GAP apart horizontally
  if (Math.abs(newPos - otherObstacleLeft) < MIN_GAP) {
    if (newPos < otherObstacleLeft) {
      newPos = otherObstacleLeft - MIN_GAP;
    } else {
      newPos = otherObstacleLeft + MIN_GAP;
    }
  }

  newPos = clamp(newPos, GAME_WIDTH, GAME_WIDTH + 600);
  return newPos;
}

function update() {
  if (gameOver) return;

  // Gravity/jump update
  velocity -= gravity;
  playerBottom += velocity;
  if (playerBottom <= 0) {
    playerBottom = 0;
    isJumping = false;
    velocity = 0;
  }
  player.style.bottom = playerBottom + 'px';

  // Move obstacles left by obstacleSpeed pixels per frame
  obstacle1Left -= obstacleSpeed;
  if (obstacle1Left < -OBSTACLE_WIDTH) {
    obstacle1Left = respawnObstacle(obstacle1Left, obstacle2Left);
    score++;
    scoreEl.textContent = 'Score: ' + score;
  }
  obstacle1.style.left = obstacle1Left + 'px';

  obstacle2Left -= obstacleSpeed;
  if (obstacle2Left < -OBSTACLE_WIDTH) {
    obstacle2Left = respawnObstacle(obstacle2Left, obstacle1Left);
    score++;
    scoreEl.textContent = 'Score: ' + score;
  }
  obstacle2.style.left = obstacle2Left + 'px';

  const playerRect = player.getBoundingClientRect();
  const obstacle1Rect = obstacle1.getBoundingClientRect();
  const obstacle2Rect = obstacle2.getBoundingClientRect();

  // Collision detection for obstacle1
  if (
    playerRect.right > obstacle1Rect.left &&
    playerRect.left < obstacle1Rect.right &&
    playerRect.bottom > obstacle1Rect.top
  ) {
    gameOver = true;
    messageEl.textContent = 'Game Over! Refresh to play again.';
  }

  // Collision detection for obstacle2
  if (
    playerRect.right > obstacle2Rect.left &&
    playerRect.left < obstacle2Rect.right &&
    playerRect.bottom > obstacle2Rect.top
  ) {
    gameOver = true;
    messageEl.textContent = 'Game Over! Refresh to play again.';
  }

  if (!gameOver) requestAnimationFrame(update);
}

update();
