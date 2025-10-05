const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;

let snake;
let direction;
let food;
let score;
let game; 
let gameStarted = false; 


function initGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null; 
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
  };
  score = 0;
  document.getElementById("score").textContent = "Score: " + score;
  gameStarted = false;
  clearInterval(game); 
  draw(); 
}

// Handle arrow key input
document.addEventListener("keydown", (event) => {
  const key = event.key;

    if (!gameStarted && ["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].includes(key)) {
    gameStarted = true;
    game = setInterval(draw, 100); 
  }

  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#ffa500" : "#ffb733";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#00ff00";
  ctx.fillRect(food.x, food.y, box, box);

  if (!direction) return; 

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    snake.some((s) => s.x === newHead.x && s.y === newHead.y)
  ) {
    alert("Game Over! Your score: " + score);
    initGame(); 
    return;
  }

  snake.unshift(newHead);
}

initGame();
