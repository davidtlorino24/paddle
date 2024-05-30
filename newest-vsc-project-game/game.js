const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

canvas.width = 800;
canvas.height = 600;

const paddleHeight = 10;
let paddleWidth = 75;
const ballRadius = 10;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;
let level = 1;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
restartButton.addEventListener("click", restartGame);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function increaseDifficulty() {
  if (score % 10 === 0) {
    // Increase difficulty every 10 points
    level++;
    dx += 1;
    dy = dy > 0 ? dy + 1 : dy - 1;
    paddleWidth -= 5; // Reduce paddle width
  }
}

function drawBall() {
  const gradient = ctx.createRadialGradient(
    x,
    y,
    ballRadius / 2,
    x,
    y,
    ballRadius
  );
  gradient.addColorStop(0, "#FF5733");
  gradient.addColorStop(1, "#C70039");

  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  const gradient = ctx.createLinearGradient(
    paddleX,
    canvas.height - paddleHeight,
    paddleX + paddleWidth,
    canvas.height
  );
  gradient.addColorStop(0, "#33FF57");
  gradient.addColorStop(1, "#28A745");

  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#00FF00";
  ctx.fillText("Score: " + score, 8, 20);
}

function restartGame() {
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
  score = 0;
  level = 1;
  paddleWidth = 75;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      score++;
      increaseDifficulty();
    } else {
      restartGame();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
