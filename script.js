"use strict";

window.addEventListener("load", start);

/* model */

const player = {
  x: 0,
  y: 160,
  regX: 14,
  regY: 18,
  hitbox: {
    x: 4,
    y: 7,
    w: 12,
    h: 17
  },
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

const enemy = {
  x:  160,
  y:  160,
  speed: 100,
  move: false
};

const tiles = [ 
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,0,0,0,0,0,4,0,3,3,3,3,3,3],
  [3,3,3,3,3,3,0,4,0,0,4,0,0,3,3,3,3,3,3],
  [3,3,3,3,3,3,0,0,4,0,0,0,0,3,3,3,3,3,3],
  [6,6,6,6,6,6,1,1,1,1,1,1,1,6,6,6,6,6,6],
  [3,3,3,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3],
  [3,3,3,3,3,3,0,4,0,0,0,4,0,3,3,3,3,3,3],
  [3,3,3,3,3,3,0,0,0,4,0,0,0,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
]


const GRID_WIDTH = tiles[0].length;
const GRID_HEIGHT = tiles.length;
const TILE_SIZE = 32;

function getTileAtCoord( {row,col} ){
  return tiles[row][col]
}

function coordFromPos( {x,y} ) {
  const row = Math.floor(y / TILE_SIZE);
  const col = Math.floor(x / TILE_SIZE);
  const coord = { row, col };
  return coord;
}

function posFromCoord( {row,col} ){

}

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

function getTilesUnderPlayer(){
  const tiles = [
  ]
  const topleft ={X: player.x - player.regX + player.hitbox.x, y: player.y};
  const topRight = {x: player.x - player.regX + player.hitbox.x + player.hitbox.w, y: player.y};
};

function canMoveTo(pos) {

  const {row,col}= coordFromPos(pos)

  if(row < 0 || row >= GRID_HEIGHT ||
     col < 0 || col >= GRID_WIDTH ) {
    return false;
  }
  /* if (pos.x < -5 || pos.y < -10 || pos.x > 484 || pos.y > 474) {
    player.moving = false; */
    
    const tileType = getTileAtCoord({row, col});
    switch(tileType){
      case 0:
      case 1:
      case 2:
      case 6:
      case 4:
        return true;
        break;
      case 3:
      case 4:
      case 5: 
        return false;
        break;
    }
    return true;
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

function createTiles(){
  const background = document.querySelector("#background");
  // scan igennem alle rows og cols
  // for hver af dem lav en div.item  og tilføj til background
  for( let row = 0; row<GRID_HEIGHT; row++){
    for( let col = 0; col<GRID_WIDTH; col++){
     let tile = document.createElement("div")
     tile.classList.add("tile")
     background.append(tile)

    }
  }
  background.style.setProperty("--GRID_WIDTH", GRID_WIDTH)
  background.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT)
  background.style.setProperty("--TILE_SIZE",TILE_SIZE+"px")
}

function dislayTiles(){
 const visualTiles = document.querySelectorAll("#background .tile");

 for( let row = 0; row<GRID_HEIGHT; row++){
  for( let col = 0; col<GRID_WIDTH; col++){
  
    const modelTile = getTileAtCoord({row,col})
    const visualTile = visualTiles[row*GRID_WIDTH+col]

    visualTile.classList.add( getClassForTiletype( modelTile));
  }
}
}

function getClassForTiletype( tiletype){
  switch(tiletype) {
    case 0: return "grass"; break;
    case 1: return "path"; break;
    case 2: return "wall"; break;
    case 3: return "water"; break;
    case 4: return "flowers"; break;
    case 5: return "cliff"; break;
    case 6: return "floor"; break;
  }
}

function displayPlayerAtPosition() {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.style.translate = `${player.x - player.regX}px ${player.y - player.regY}px`;
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

// debugging
function showDebugging(){
  showDebugTileUnderPlayer();
  showDebuglayerRect();
  showDebugPlayerRegistrationPoint()
}

let lastPlayerCoord = {row: 0, col: 0}

function showDebugTileUnderPlayer() {
  const coord = coordFromPos(player);

  if(coord.row != lastPlayerCoord.row || coord.col != lastPlayerCoord.col) {
    unhighlightTile(lastPlayerCoord)
    highlightTile(coord)
  }

  lastPlayerCoord = coord;

}

function showDebuglayerRect(){
  const visualPlayer = document.querySelector("#player")
  if(!visualPlayer.classList.contains("show-rect")) {
    visualPlayer.classList.add("show-rect")
  }
}

function showDebugPlayerRegistrationPoint() {
  const visualPlayer = document.querySelector("#player")
  if(!visualPlayer.classList.contains("show-reg-point")) {
    visualPlayer.classList.add("show-reg-point")
  }
  visualPlayer.style.setProperty("--regX", player.regX+"px")
  visualPlayer.style.setProperty("--regY", player.regY+"px")
}

function highlightTile({row, col}) {
const highlightTiles = document.querySelectorAll("#background .tile");
const highlightTile = highlightTiles[row*GRID_WIDTH+col]

highlightTile.classList.add("highlight")


}

function unhighlightTile( {row, col} ) {
const highlightTiles = document.querySelectorAll("#background .tile");
const highlightTile = highlightTiles[row*GRID_WIDTH+col]

highlightTile.classList.remove("highlight")

}

/* Controller */
let lastTimestamp = 0;

function tick(timestamp) {
  requestAnimationFrame(tick);

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  movePlayer(deltaTime);

  showDebugging()

  displayPlayerAtPosition();
  displayPlayerAnimation();
}

function start() {
  console.log("javascript is running");
 createTiles()
 dislayTiles()

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  
  requestAnimationFrame(tick);
}
