const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [{ x: gridSize / 2, y: gridSize / 2 }];
let direction = { x: 0, y: 0 };
let food = generateFood();

function main() {
  update();
  draw();
  setTimeout(main, 100);
}

function update() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  if (isCollision(newHead) || isOutOfBounds(newHead)) {
    resetGame();
  } else {
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      food = generateFood();
    } else {
      snake.pop();
    }
  }
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lime';
  for (const segment of snake) {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function generateFood() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (isOccupied(position));
  return position;
}

function isCollision(position) {
  return snake.some((segment) => segment.x === position.x && segment.y === position.y);
}

function isOutOfBounds(position) {
  return position.x < 0 || position.y < 0 || position.x >= gridSize || position.y >= gridSize;
}

function isOccupied(position) {
  return snake.some((segment) => segment.x === position.x && segment.y === position.y);
}

function resetGame() {
  snake = [{ x: gridSize / 2, y: gridSize / 2 }];
  direction = { x: 0, y: 0 };
  food = generateFood();
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (key === 'ArrowRight' && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

main();
