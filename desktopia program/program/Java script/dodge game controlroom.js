    const gameContainer = document.getElementById("gameContainer");
    const player = document.getElementById("player");
    const scoreBoard = document.getElementById("scoreBoard");
    const gameOverScreen = document.getElementById("gameOverScreen");

    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const playerSize = 40;
    const enemySize = 40;
    const playerSpeed = 8;
    let score = 0;
    let gameOver = false;

    // Player position
    let playerX = (containerWidth - playerSize) / 2;
    player.style.left = playerX + "px";

    // Movement controls
    let keys = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") keys.left = true;
      if (e.key === "ArrowRight") keys.right = true;
      if (e.key === "ArrowUp") keys.up = true;
      if (e.key === "ArrowDown") keys.down = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") keys.left = false;
      if (e.key === "ArrowRight") keys.right = false;
      if (e.key === "ArrowUp") keys.up = false;
      if (e.key === "ArrowDown") keys.down = false;
    });

    // Enemy management
    let enemies = [];
    const enemySpeedBase = 4; // Increased base speed from 3 to 4
    let enemyAddInterval = 1000; // Reduced interval from 1500 to 1000ms

    function createEnemy() {
      let enemy = document.createElement("div");
      enemy.classList.add("enemy");
      enemy.style.top = "-40px";
      enemy.style.left = Math.floor(Math.random() * (containerWidth - enemySize)) + "px";

      gameContainer.appendChild(enemy);
      enemies.push({
        obj: enemy,
        y: -40,
        speed: enemySpeedBase + Math.random() * 3 // increased max random speed from 2 to 3
      });
    }

    // Check collision between player and enemy
    function isColliding(rect1, rect2) {
      return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
      );
    }

    // Game loop
    function update() {
      if (gameOver) return;

      // Move player horizontally
      if (keys.left) playerX -= playerSpeed;
      if (keys.right) playerX += playerSpeed;

      // Clamp player position horizontally inside container
      if (playerX < 0) playerX = 0;
      if (playerX > containerWidth - playerSize) playerX = containerWidth - playerSize;

      player.style.left = playerX + "px";

      // Move player vertically
      let playerY = parseInt(player.style.bottom || 20);
      if (keys.up) {
        playerY = Math.min(containerHeight - playerSize, playerY + playerSpeed);
      }
      if (keys.down) {
        playerY = Math.max(20, playerY - playerSpeed);
      }
      player.style.bottom = playerY + "px";

      // Move enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        let enemyObj = enemies[i];
        enemyObj.y += enemyObj.speed;
        enemyObj.obj.style.top = enemyObj.y + "px";

        if (enemyObj.y > containerHeight) {
          enemyObj.obj.remove();
          enemies.splice(i, 1);
          score += 10;
          scoreBoard.textContent = "Score: " + score;
          // Speed up difficulty
          if (score % 100 === 0 && enemyAddInterval > 500) {
            enemyAddInterval -= 100;
            clearInterval(enemySpawner);
            enemySpawner = setInterval(createEnemy, enemyAddInterval);
          }
        } else {
          // Check collision with player
          let playerRect = player.getBoundingClientRect();
          let enemyRect = enemyObj.obj.getBoundingClientRect();
          if (isColliding(playerRect, enemyRect)) {
            gameOver = true;
            gameOverScreen.style.display = "block";
          }
        }
      }

      if (!gameOver) requestAnimationFrame(update);
    }

    // Spawn enemies repeatedly
    let enemySpawner = setInterval(createEnemy, enemyAddInterval);

    // Start game loop
    update();