'use strict';

// tetrominos definition (7 pieces)
const tetrominos = [
  {
    // box
    colors: ['rgb(59,84,165)', 'rgb(118,137,196)', 'rgb(79,111,182)'],
    data: [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]
  },
  {
    // stick
    colors: ['rgb(214,30,60)', 'rgb(241,108,107)', 'rgb(236,42,75)'],
    data: [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]
  },
  {
    // z
    colors: ['rgb(88,178,71)', 'rgb(150,204,110)', 'rgb(115,191,68)'],
    data: [[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]]
  },
  {
    // T
    colors: ['rgb(62,170,212)', 'rgb(120,205,244)', 'rgb(54,192,240)'],
    data: [[0,0,0,0],[0,1,1,1],[0,0,1,0],[0,0,0,0]]
  },
  {
    // s
    colors: ['rgb(236,94,36)', 'rgb(234,154,84)', 'rgb(228,126,37)'],
    data: [[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]]
  },
  {
    // backwards L
    colors: ['rgb(220,159,39)', 'rgb(246,197,100)', 'rgb(242,181,42)'],
    data: [[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]]
  },
  {
    // L
    colors: ['rgb(158,35,126)', 'rgb(193,111,173)', 'rgb(179,63,151)'],
    data: [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]
  }
];

class Tetris {
  // container: DOM element to append canvases into
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
    this.curPiece = { data: null, colors: [0,0,0], x: 0, y: 0 };
    this.lastMove = Date.now();
    this.curSpeed = 50 + Math.random() * 50;
    this.unitSize = 20;
    this.linesCleared = 0;
    this.level = 0;
    this.loseBlock = 0;

    // board dimensions
    this.board = [];
    this.boardWidth = Math.floor(this.width / this.unitSize);
    this.boardHeight = Math.floor(this.height / this.unitSize);

    const board = this.board;
    const boardWidth = this.boardWidth;
    const boardHeight = this.boardHeight;
    const halfHeight = boardHeight / 2;
    const curPiece = this.curPiece;

    // init board
    for (let x = 0; x <= boardWidth; x++) {
      board[x] = [];
      for (let y = 0; y <= boardHeight; y++) {
        board[x][y] = {
          data: 0,
          colors: ['rgb(0,0,0)', 'rgb(0,0,0)', 'rgb(0,0,0)']
        };
        if (Math.random() > 0.15 && y > halfHeight) {
          board[x][y] = {
            data: 1,
            colors: tetrominos[Math.floor(Math.random() * tetrominos.length)].colors
          };
        }
      }
    }

    // collapse the board a bit
    for (let x = 0; x <= boardWidth; x++) {
      for (let y = boardHeight - 1; y > -1; y--) {
        if (board[x][y].data === 0 && y > 0) {
          for (let yy = y; yy > 0; yy--) {
            if (board[x][yy - 1].data) {
              board[x][yy].data = 1;
              board[x][yy].colors = board[x][yy - 1].colors;

              board[x][yy - 1].data = 0;
              board[x][yy - 1].colors = ['rgb(0,0,0)', 'rgb(0,0,0)', 'rgb(0,0,0)'];
            }
          }
        }
      }
    }

    // keyboard controls
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 37: // left
          if (this.checkMovement(curPiece, -1, 0)) curPiece.x--;
          break;
        case 39: // right
          if (this.checkMovement(curPiece, 1, 0)) curPiece.x++;
          break;
        case 40: // down
          if (this.checkMovement(curPiece, 0, 1)) curPiece.y++;
          break;
        case 32: // space
        case 38: // up
          curPiece.data = this.rotateTetrimono(curPiece);
          break;
      }
    });

    // initial render & assign first piece
    this.checkLines();
    this.renderBoard();
    this.newTetromino();
    this.update();
  }

  update() {
    const curPiece = this.curPiece;

    if (!this.checkMovement(curPiece, 0, 1)) {
      if (curPiece.y < -1) {
        this.loseScreen();
        return true;
      } else {
        this.fillBoard(curPiece);
        this.newTetromino();
      }
    } else {
      if (Date.now() > this.lastMove) {
        this.lastMove = Date.now() + this.curSpeed;
        if (this.checkMovement(curPiece, 0, 1)) {
          curPiece.y++;
        } else {
          this.fillBoard(curPiece);
          this.newTetromino();
        }
      }
    }

    this.render();
    requestAnimationFrame(() => this.update());
  }

  renderBoard() {
    const canvas = this.bgCanvas;
    const ctx = this.bgCtx;
    const unitSize = this.unitSize;
    const board = this.board;
    const boardWidth = this.boardWidth;
    const boardHeight = this.boardHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the board blocks
    for (let x = 0; x <= boardWidth; x++) {
      for (let y = 0; y <= boardHeight; y++) {
        if (board[x][y].data !== 0) {
          const bX = (x * unitSize);
          const bY = (y * unitSize);

          ctx.fillStyle = board[x][y].colors[0];
          ctx.fillRect(bX, bY, unitSize, unitSize);

          ctx.fillStyle = board[x][y].colors[1];
          ctx.fillRect(bX + 2, bY + 2, unitSize - 4, unitSize - 4);

          ctx.fillStyle = board[x][y].colors[2];
          ctx.fillRect(bX + 4, bY + 4, unitSize - 8, unitSize - 8);
        }
      }
    }

    // Draw centered Tetris-style text
    const message = "Cut out the clutter before it clogs your entire system";
    ctx.save();
    ctx.font = 'bold 24px "Press Start 2P", "VT323", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    // Draw shadow for better visibility
    ctx.shadowColor = '#222';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#222';
    // Center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 5;
    // Draw stroke for outline effect
    ctx.strokeText(message, centerX, centerY);
    ctx.shadowBlur = 0;
    ctx.fillText(message, centerX, centerY);
    ctx.restore();
  }

  render() {
    const canvas = this.fgCanvas;
    const ctx = this.fgCtx;
    const unitSize = this.unitSize;
    const curPiece = this.curPiece;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (!curPiece.data) continue;
        if (curPiece.data[x][y] === 1) {
          const xPos = ((curPiece.x + x) * unitSize);
          const yPos = ((curPiece.y + y) * unitSize);

          if (yPos > -1) {
            ctx.fillStyle = curPiece.colors[0];
            ctx.fillRect(xPos, yPos, unitSize, unitSize);

            ctx.fillStyle = curPiece.colors[1];
            ctx.fillRect(xPos + 2, yPos + 2, unitSize - 4, unitSize - 4);

            ctx.fillStyle = curPiece.colors[2];
            ctx.fillRect(xPos + 4, yPos + 4, unitSize - 8, unitSize - 8);
          }
        }
      }
    }
  }

  checkMovement(curPiece, newX, newY) {
    const piece = curPiece.data;
    const posX = curPiece.x;
    const posY = curPiece.y;
    const board = this.board;
    const boardWidth = this.boardWidth;
    const boardHeight = this.boardHeight;

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (piece && piece[x] && piece[x][y] === 1) {
          if (!board[posX + x + newX]) {
            board[posX + x + newX] = [];
          }

          if (!board[posX + x + newX][y + posY + newY]) {
            board[posX + x + newX][y + posY + newY] = { data: 0 };
          }

          if (posX + x + newX >= boardWidth || posX + x + newX < 0 || board[posX + x + newX][y + posY + newY].data == 1) {
            return false;
          }

          if (posY + y + newY > boardHeight) {
            return false;
          }
        }
      }
    }
    return true;
  }

  checkLines() {
    const board = this.board;
    const boardWidth = this.boardWidth;
    const boardHeight = this.boardHeight;
    let linesCleared = this.linesCleared;
    let level = this.level;
    let y = boardHeight + 1;

    while (y--) {
      let x = boardWidth;
      let lines = 0;

      while (x--) {
        if (board[x][y].data === 1) {
          lines++;
        }
      }

      if (lines === boardWidth) {
        linesCleared++;
        level = Math.round(linesCleared / 20) * 20;

        let lineY = y;
        while (lineY) {
          for (x = 0; x <= boardWidth; x++) {
            if (lineY - 1 > 0) {
              board[x][lineY].data = board[x][lineY - 1].data;
              board[x][lineY].colors = board[x][lineY - 1].colors;
            }
          }
          lineY--;
        }
        y++;
      }
    }

    this.linesCleared = linesCleared;
    this.level = level;
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

      ctx.fillStyle = 'rgb(150,150,150)';
      ctx.fillRect(bX + 2, bY + 2, unitSize - 4, unitSize - 4);

      ctx.fillStyle = 'rgb(100,100,100)';
      ctx.fillRect(bX + 4, bY + 4, unitSize - 8, unitSize - 8);
    }

    if (this.loseBlock <= (boardHeight + 1)) {
      this.loseBlock++;
      requestAnimationFrame(() => this.loseScreen());
    } else {
      this.init();
    }
  }

  fillBoard(curPiece) {
    const piece = curPiece.data;
    const posX = curPiece.x;
    const posY = curPiece.y;
    const board = this.board;

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (piece && piece[x] && piece[x][y] === 1) {
          board[x + posX][y + posY].data = 1;
          board[x + posX][y + posY].colors = curPiece.colors;
        }
      }
    }

    this.checkLines();
    this.renderBoard();
  }

  rotateTetrimono(curPiece) {
    const rotated = [];

    for (let x = 0; x < 4; x++) {
      rotated[x] = [];
      for (let y = 0; y < 4; y++) {
        rotated[x][y] = curPiece.data[3 - y][x];
      }
    }

    if (!this.checkMovement({
      data: rotated,
      x: curPiece.x,
      y: curPiece.y
    }, 0, 0)) {
      return curPiece.data;
    }

    return rotated;
  }

  newTetromino() {
    const pieceNum = Math.floor(Math.random() * tetrominos.length);
    const curPiece = this.curPiece;
    // copy the array so we don't mutate the global tetromino definition
    curPiece.data = tetrominos[pieceNum].data.map(row => row.slice());
    curPiece.colors = tetrominos[pieceNum].colors;
    curPiece.x = Math.floor(Math.random() * (this.boardWidth - curPiece.data.length + 1));
    curPiece.y = -4;
  }
}

// exported helper to create one or multiple boards inside a container
export function initTetris(container, boards = 1) {
  const boardDiv = 20 * Math.round(window.innerWidth / 20);
  const bWidth = boardDiv / boards;
  const instances = [];

  for (let w = 0; w < boards; w++) {
    instances.push(new Tetris(container, 20 * Math.round((w * bWidth) / 20), 0, bWidth));
  }

  return instances;
}
