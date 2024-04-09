"use strict";

window.addEventListener("load", start);

/* model */

const player = {
  x: 0,
  y: 0,
  speed: 100,
  move: false,
  direction: undefined,
};
const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

function keyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      controls.left = true;
      break;
    case "ArrowRight":
      controls.right = true;
      break;
    case "ArrowUp":
      controls.up = true;
      break;
    case "ArrowDown":
      controls.down = true;
      break;
  }
  /* console.log(controls); */
}

function keyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
      controls.left = false;
      break;
    case "ArrowRight":
      controls.right = false;
      break;
    case "ArrowUp":
      controls.up = false;
      break;
    case "ArrowDown":
      controls.down = false;
      break;
  }
  /* console.log(controls); */
}

function canMoveTo(pos) {
  if (pos.x < 0 || pos.y < -10 || pos.x > 484 || pos.y > 472) {
    player.moving = false;
    return false;
  } else {
    return true;
  }
}

function movePlayer(deltaTime) {
  player.moving = false;

  const newPos = {
    x: player.x,
    y: player.y,
  };

  if (controls.left) {
    player.moving = true;
    player.direction = "left";
    newPos.x -= player.speed * deltaTime;
  } else if (controls.right) {
    player.moving = true;
    player.direction = "right";
    newPos.x += player.speed * deltaTime;
  }

  if (controls.up) {
    player.moving = true;
    player.direction = "up";
    newPos.y -= player.speed * deltaTime;
  } else if (controls.down) {
    player.moving = true;
    player.direction = "down";
    newPos.y += player.speed * deltaTime;
  }
  if (canMoveTo(newPos)) {
    player.x = newPos.x;
    player.y = newPos.y;
  } else {
    
  }
}

/* view */

function displayPlayerAtPosition() {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}
function displayPlayerAnimation() {
  const visualPlayer = document.querySelector("#player");

  if (player.direction && !visualPlayer.classList.contains(player.direction)) {
    visualPlayer.classList.remove("up", "down", "left", "right");
    visualPlayer.classList.add(player.direction);
  }if (!player.moving) {
    visualPlayer.classList.remove("animate");
  } else if(!visualPlayer.classList.contains("animate")){
    visualPlayer.classList.add("animate")
  }
}

/* Controller */
let lastTimestamp = 0;

function tick(timestamp) {
  requestAnimationFrame(tick);

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  movePlayer(deltaTime);

  displayPlayerAtPosition();
  displayPlayerAnimation();
}

function start() {
  console.log("javascript is running");

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  requestAnimationFrame(tick);
}
