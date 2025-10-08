'use strict';

// tetrominos definition (7 pieces)
const tetrominos = [
  {colors:['rgb(59,84,165)','rgb(118,137,196)','rgb(79,111,182)'],data:[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]},{colors:['rgb(214,30,60)','rgb(241,108,107)','rgb(236,42,75)'],data:[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]},{colors:['rgb(88,178,71)','rgb(150,204,110)','rgb(115,191,68)'],data:[[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]]},{colors:['rgb(62,170,212)','rgb(120,205,244)','rgb(54,192,240)'],data:[[0,0,0,0],[0,1,1,1],[0,0,1,0],[0,0,0,0]]},{colors:['rgb(236,94,36)','rgb(234,154,84)','rgb(228,126,37)'],data:[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]]},{colors:['rgb(220,159,39)','rgb(246,197,100)','rgb(242,181,42)'],data:[[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]]},{colors:['rgb(158,35,126)','rgb(193,111,173)','rgb(179,63,151)'],data:[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]}
];

class Tetris {
  constructor(container, x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
    this.container = container || document.body;
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;

    this.bgCanvas = document.createElement('canvas');
    this.fgCanvas = document.createElement('canvas');

    this.bgCanvas.width = this.fgCanvas.width = this.width;
    this.bgCanvas.height = this.fgCanvas.height = this.height;

    this.bgCanvas.style.position = this.fgCanvas.style.position = 'absolute';
    this.bgCanvas.style.left = this.posX + 'px';
    this.bgCanvas.style.top = this.posY + 'px';
    this.fgCanvas.style.left = this.posX + 'px';
    this.fgCanvas.style.top = this.posY + 'px';

    this.bgCtx = this.bgCanvas.getContext('2d');
    this.fgCtx = this.fgCanvas.getContext('2d');

    this.container.appendChild(this.bgCanvas);
    this.container.appendChild(this.fgCanvas);

    this.init();
  }

  init() {
    this.curPiece = { data: null, colors: [0, 0, 0], x: 0, y: 0 };
    this.lastMove = Date.now();
    this.curSpeed = 500; // Slower speed for human play
    this.unitSize = 20;
    this.linesCleared = 0;
    this.level = 0;
    this.loseBlock = 0;

    this.board = [];
    this.boardWidth = Math.floor(this.width / this.unitSize);
    this.boardHeight = Math.floor(this.height / this.unitSize);
    
    // Create the empty board grid
    for (let x = 0; x < this.boardWidth; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.boardHeight; y++) {
        this.board[x][y] = { data: 0 };
      }
    }

    // *** CHANGE 1: Call the prefillBoard function to fill the board at the start ***
    this.prefillBoard();

    // Keyboard controls
    if (!this.keyListenerAdded) {
        window.addEventListener('keydown', (e) => {
            const curPiece = this.curPiece;
            switch (e.keyCode) {
                case 37: // left arrow
                if (this.checkMovement(curPiece, -1, 0)) curPiece.x--;
                break;
                case 39: // right arrow
                if (this.checkMovement(curPiece, 1, 0)) curPiece.x++;
                break;
                case 40: // down arrow
                if (this.checkMovement(curPiece, 0, 1)) curPiece.y++;
                break;
                case 32: // space bar
                case 38: // up arrow
                curPiece.data = this.rotateTetrimono(curPiece);
                break;
            }
            this.render(); // Re-render immediately on key press
        });
        this.keyListenerAdded = true;
    }

    this.renderBoard();
    this.newTetromino();
    this.update();
  }

  // *** CHANGE 2: Add the prefillBoard function here ***
  prefillBoard() {
    const board = this.board;
    const boardWidth = this.boardWidth;
    const boardHeight = this.boardHeight;
    const halfHeight = boardHeight / 2;

    // Step 1: Randomly scatter blocks in the bottom half
    for (let x = 0; x < boardWidth; x++) {
      for (let y = 0; y < boardHeight; y++) {
        if (y > halfHeight && Math.random() > 0.15) {
          const randomPiece = tetrominos[Math.floor(Math.random() * tetrominos.length)];
          board[x][y] = { data: 1, colors: randomPiece.colors };
        }
      }
    }

    // Step 2: Apply "gravity" to collapse the floating blocks
    for (let x = 0; x < boardWidth; x++) {
      let emptySpot = boardHeight - 1;
      for (let y = boardHeight - 1; y >= 0; y--) {
        if (board[x][y].data === 1) {
          const temp = board[x][y];
          board[x][y] = board[x][emptySpot];
          board[x][emptySpot] = temp;
          emptySpot--;
        }
      }
    }
  }

  update() {
    const curPiece = this.curPiece;

    if (Date.now() > this.lastMove + this.curSpeed) {
        this.lastMove = Date.now();
        if (this.checkMovement(curPiece, 0, 1)) {
            curPiece.y++;
        } else {
            if (curPiece.y < 0) {
                this.loseScreen();
                return;
            }
            this.fillBoard(curPiece);
            this.newTetromino();
        }
    }
    this.render();
    requestAnimationFrame(() => this.update());
  }
  
  loseScreen() {
    const ctx = this.bgCtx;
    const unitSize = this.unitSize;
    const boardWidth = this.boardWidth;
    const boardHeight = this.boardHeight;
    const y = boardHeight - this.loseBlock;

    for (let x = 0; x < boardWidth; x++) {
      const bX = (x * unitSize);
      const bY = (y * unitSize);
      ctx.fillStyle = 'rgb(80,80,80)';
      ctx.fillRect(bX, bY, unitSize, unitSize);
    }

    if (this.loseBlock <= (boardHeight + 1)) {
      this.loseBlock++;
      requestAnimationFrame(() => this.loseScreen());
    } else {
      this.init();
    }
  }

  fillBoard(curPiece) {
    const piece = curPiece.data; const posX = curPiece.x; const posY = curPiece.y; const board = this.board; for (let x = 0; x < 4; x++) { for (let y = 0; y < 4; y++) { if (piece && piece[x] && piece[x][y] === 1) { const boardX = x + posX; const boardY = y + posY; if (board[boardX] && board[boardX][boardY]) { board[boardX][boardY].data = 1; board[boardX][boardY].colors = curPiece.colors; } } } }
    this.checkLines();
    this.renderBoard();
  }
  
  newTetromino() {
    const pieceNum = Math.floor(Math.random() * tetrominos.length);
    const curPiece = this.curPiece;
    curPiece.data = tetrominos[pieceNum].data.map(row => row.slice());
    curPiece.colors = tetrominos[pieceNum].colors;
    curPiece.x = Math.floor(this.boardWidth / 2 - 2);
    curPiece.y = -2;
  }
  
  checkLines() { const board = this.board; const boardWidth = this.boardWidth; const boardHeight = this.boardHeight; let y = boardHeight; while (y--) { let x = boardWidth; let lines = 0; while (x--) { if (board[x][y] && board[x][y].data === 1) { lines++; } } if (lines === boardWidth) { this.linesCleared++; let lineY = y; while (lineY > 0) { for (x = 0; x < boardWidth; x++) { board[x][lineY] = board[x][lineY - 1]; } lineY--; } y++; } } }
  
  rotateTetrimono(curPiece) { 
    const rotated = []; for (let x = 0; x < 4; x++) { rotated[x] = []; for (let y = 0; y < 4; y++) { rotated[x][y] = curPiece.data[3 - y][x]; } }
    if (!this.checkMovement({ data: rotated, x: curPiece.x, y: curPiece.y }, 0, 0)) { return curPiece.data; } return rotated;
  }
  
  renderBoard() { 
    const canvas = this.bgCanvas; const ctx = this.bgCtx; const unitSize = this.unitSize; const board = this.board; const boardWidth = this.boardWidth; const boardHeight = this.boardHeight; ctx.clearRect(0, 0, canvas.width, canvas.height); for (let x = 0; x < boardWidth; x++) { for (let y = 0; y < boardHeight; y++) { if (board[x][y] && board[x][y].data !== 0) { const bX = (x * unitSize); const bY = (y * unitSize); ctx.fillStyle = board[x][y].colors[0]; ctx.fillRect(bX, bY, unitSize, unitSize); ctx.fillStyle = board[x][y].colors[1]; ctx.fillRect(bX + 2, bY + 2, unitSize - 4, unitSize - 4); ctx.fillStyle = board[x][y].colors[2]; ctx.fillRect(bX + 4, bY + 4, unitSize - 8, unitSize - 8); } } } 
    const message = ""; ctx.save(); ctx.font = 'bold 24px "Press Start 2P", "VT323", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff'; ctx.shadowColor = '#222'; ctx.shadowBlur = 8; ctx.lineWidth = 4; ctx.strokeStyle = '#222'; const centerX = canvas.width / 2; const centerY = canvas.height / 5; ctx.strokeText(message, centerX, centerY); ctx.shadowBlur = 0; ctx.fillText(message, centerX, centerY); ctx.restore(); 
  }

  render() { const canvas = this.fgCanvas; const ctx = this.fgCtx; const unitSize = this.unitSize; const curPiece = this.curPiece; ctx.clearRect(0, 0, canvas.width, canvas.height); if (!curPiece || !curPiece.data) return; for (let x = 0; x < 4; x++) { for (let y = 0; y < 4; y++) { if (curPiece.data[x][y] === 1) { const xPos = ((curPiece.x + x) * unitSize); const yPos = ((curPiece.y + y) * unitSize); if (yPos > -1) { ctx.fillStyle = curPiece.colors[0]; ctx.fillRect(xPos, yPos, unitSize, unitSize); ctx.fillStyle = curPiece.colors[1]; ctx.fillRect(xPos + 2, yPos + 2, unitSize - 4, unitSize - 4); ctx.fillStyle = curPiece.colors[2]; ctx.fillRect(xPos + 4, yPos + 4, unitSize - 8, unitSize - 8); } } } } }
  
  checkMovement(curPiece, newX, newY) { const piece = curPiece.data; const posX = curPiece.x; const posY = curPiece.y; const board = this.board; const boardWidth = this.boardWidth; const boardHeight = this.boardHeight; for (let x = 0; x < 4; x++) { for (let y = 0; y < 4; y++) { if (piece && piece[x] && piece[x][y] === 1) { const nextX = posX + x + newX; const nextY = posY + y + newY; if (nextX < 0 || nextX >= boardWidth || nextY >= boardHeight) { return false; } if (board[nextX] && board[nextX][nextY] && board[nextX][nextY].data === 1) { return false; } } } } return true; }
}

export function initTetris(container, boards = 1) {
  const boardDiv = 20 * Math.round(window.innerWidth / 20);
  const bWidth = boardDiv / boards;
  const instances = [];

  for (let w = 0; w < boards; w++) {
    instances.push(new Tetris(container, 20 * Math.round((w * bWidth) / 20), 0, bWidth));
  }

  return instances;
}