const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
  width: 100,
  height: 15,
  x: canvas.width / 2 - 50,
  y: canvas.height - 30,
  speed: 10,
  dx: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 12,
  speed: 4,
  dx: 4,
  dy: -4
};

let score = 0;
let isGameOver = false;

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = '#5C6AC4';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw ball
function drawBall() {
  ctx.fillStyle = '#E4E4E4';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// Draw score
function drawScore() {
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
  ball.dy = -ball.speed;
}

function drawGameOver() {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FF5555';
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 60);
}

// Update paddle position based on mouse
function movePaddle(mouseX) {
  paddle.x = mouseX - paddle.width / 2;
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
}

// Update game objects
function update() {
  if (isGameOver) return;

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off left/right walls
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  // Bounce off top wall
  if (ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Bounce off paddle
  if (
    ball.y + ball.size > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    ball.dy = -ball.speed;
    score++;
  }

  // Ball falls below paddle
  if (ball.y + ball.size > canvas.height) {
    isGameOver = true;
  }
}

// Draw everything on canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle();
  drawBall();
  drawScore();

  if (isGameOver) {
    drawGameOver();
  }
}

// Main game loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Restart game on click when over
canvas.addEventListener('click', () => {
  if (isGameOver) {
    score = 0;
    isGameOver = false;
    resetBall();
  }
});

// Paddle control via mouse move
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  movePaddle(mouseX);
});

// Start game
resetBall();
loop();