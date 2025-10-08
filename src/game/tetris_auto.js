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
    this.messages = [
      "Cut out the clutter before it clogs your entire system",
      "Grab the opportunity at the right time and at the right place",
      "Every piece is a new opportunity",
      "Hold out for the perfect moment,then strike",
      "Success is built on the problems you clear away",
      "Turn falling challenges into a foundation for success",
      "The most elegant solution is often the simplest fit",
      "A well-placed piece can solve problems you haven't even faced yet",
      "Clarity is achieved by removing what is unnecessary",
      "Patience can turn a difficult situation into a perfect opportunity",
      "Sometimes you have to let things fall into place",
      "Strategic thinking can turn chaos into order",
    ];
    this.currentMessageIndex = 0;
    this.lastMessageTime = Date.now();
    this.messagePauseTime = 4000;

    this.curPiece = { data: null, colors: [0, 0, 0], x: 0, y: 0 };
    this.lastMove = Date.now();
    this.curSpeed = 25;
    this.unitSize = 20;
    this.ai = { bestMove: null };

    this.board = [];
    this.boardWidth = Math.floor(this.width / this.unitSize);
    this.boardHeight = Math.floor(this.height / this.unitSize);

    for (let x = 0; x < this.boardWidth; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.boardHeight; y++) {
        this.board[x][y] = { data: 0 };
      }
    }
    
    this.prefillBoard();
    this.renderBoard();
    this.newTetromino();
    this.update();
  }

  // *** THIS IS THE NEW, IMPROVED prefillBoard FUNCTION ***
  prefillBoard() {
    // --- You can tweak these values to change the look ---
    const baseFillPercentage = 0.6; // Average height of the stack (60% of the board)
    const heightVariation = 5;      // How jagged the top is (+/- 5 blocks)
    const holeProbability = 0.05;   // 5% chance for a block to be a hole
    // ---

    const columnHeights = new Array(this.boardWidth).fill(0);
    const baseHeight = this.boardHeight * baseFillPercentage;

    // Step 1: Generate a random height for each column
    let lastHeight = baseHeight;
    for (let x = 0; x < this.boardWidth; x++) {
      let nextHeight = lastHeight + (Math.random() * 4 - 2); // Varies slightly from the last column

      // Keep the height within the desired variation range
      if (nextHeight < baseHeight - heightVariation) nextHeight = baseHeight - heightVariation;
      if (nextHeight > baseHeight + heightVariation) nextHeight = baseHeight + heightVariation;
      
      // Safety check to ensure it never goes off-screen
      if (nextHeight > this.boardHeight) nextHeight = this.boardHeight;
      if (nextHeight < 0) nextHeight = 0;

      columnHeights[x] = Math.floor(nextHeight);
      lastHeight = nextHeight;
    }

    // Step 2: Fill the board based on the generated heights
    for (let x = 0; x < this.boardWidth; x++) {
      const currentColumnHeight = columnHeights[x];
      // Loop from the bottom of the board up to the random height
      for (let y = this.boardHeight - 1; y >= this.boardHeight - currentColumnHeight; y--) {
        // Add a small chance to skip a block, creating a "hole"
        if (Math.random() < holeProbability) {
          continue; // Skip this block
        }
        
        const randomPiece = tetrominos[Math.floor(Math.random() * tetrominos.length)];
        this.board[x][y] = {
          data: 1,
          colors: randomPiece.colors,
        };
      }
    }
  }

  updateTextAnimation() {
    const now = Date.now();
    if (now > this.lastMessageTime + this.messagePauseTime) {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
      this.lastMessageTime = now;
    }
  }
  
  update() {
    this.updateTextAnimation();

    if (Date.now() < this.lastMove) {
        requestAnimationFrame(() => this.update());
        return;
    }
    this.lastMove = Date.now() + this.curSpeed;
    const curPiece = this.curPiece;
    const bestMove = this.ai.bestMove;
    if (!bestMove) {
      requestAnimationFrame(() => this.update());
      return;
    }

    if (curPiece.rotation < bestMove.rotation) {
      curPiece.data = this.rotateTetrimono(curPiece);
      curPiece.rotation++;
    } else if (curPiece.x < bestMove.x) {
      if (this.checkMovement(curPiece, 1, 0)) curPiece.x++;
    } else if (curPiece.x > bestMove.x) {
      if (this.checkMovement(curPiece, -1, 0)) curPiece.x--;
    } else {
      if (this.checkMovement(curPiece, 0, 1)) {
        curPiece.y++;
      } else {
        this.fillBoard(curPiece);
        this.newTetromino();
      }
    }
    this.render();
    requestAnimationFrame(() => this.update());
  }

  findBestMove() {
    let bestScore = -Infinity;
    let bestMove = null;
    const originalPiece = this.curPiece;
    for (let rotation = 0; rotation < 4; rotation++) {
      let tempPiece = { ...originalPiece, data: originalPiece.data.map(r => r.slice()) };
      for (let i = 0; i < rotation; i++) {
        tempPiece.data = this.rotateTetrimono(tempPiece, true);
      }
      for (let x = -2; x < this.boardWidth; x++) {
        let simPiece = { data: tempPiece.data.map(r => r.slice()), x: x, y: 0 };
        if (!this.checkMovement(simPiece, 0, 0)) continue;
        while (this.checkMovement(simPiece, 0, 1)) {
          simPiece.y++;
        }
        const tempBoard = this.board.map(col => col.map(cell => ({ ...cell })));
        for (let px = 0; px < 4; px++) {
            for (let py = 0; py < 4; py++) {
                if (simPiece.data[px] && simPiece.data[px][py] === 1) {
                    const boardX = simPiece.x + px;
                    const boardY = simPiece.y + py;
                    if (tempBoard[boardX] && tempBoard[boardX][boardY]) {
                        tempBoard[boardX][boardY].data = 1;
                    }
                }
            }
        }
        const score = this.calculateBoardScore(tempBoard);
        if (score > bestScore) {
          bestScore = score;
          bestMove = { x: simPiece.x, rotation: rotation };
        }
      }
    }
    this.ai.bestMove = bestMove;
  }

  calculateBoardScore(board) {
    let completedLines = 0, holes = 0, bumpiness = 0;
    const columnHeights = new Array(this.boardWidth).fill(0);
    for (let x = 0; x < this.boardWidth; x++) {
      let hasFoundTopBlock = false;
      for (let y = 0; y < this.boardHeight; y++) {
        if (board[x][y] && board[x][y].data === 1) {
          if (!hasFoundTopBlock) {
             columnHeights[x] = this.boardHeight - y;
             hasFoundTopBlock = true;
          }
        } else if (hasFoundTopBlock) { holes++; }
      }
    }
    const totalHeight = columnHeights.reduce((a, b) => a + b, 0);
    const maxHeight = Math.max(...columnHeights);
    for (let x = 0; x < this.boardWidth - 1; x++) {
      bumpiness += Math.abs(columnHeights[x] - columnHeights[x + 1]);
    }
    for(let y = 0; y < this.boardHeight; y++) {
        let isLineComplete = true;
        for(let x = 0; x < this.boardWidth; x++) {
            if(!board[x][y] || board[x][y].data === 0) {
                isLineComplete = false;
                break;
            }
        }
        if (isLineComplete) { completedLines++; }
    }
    const heightWeight = -0.6, linesWeight = 0.8, holesWeight = -0.4, bumpinessWeight = -0.25, maxHeightWeight = -1.5;
    return (totalHeight*heightWeight) + (completedLines*linesWeight) + (holes*holesWeight) + (bumpiness*bumpinessWeight) + (maxHeight*maxHeightWeight);
  }
  
  preventLoss() {
    let maxHeight = 0;
    for (let x = 0; x < this.boardWidth; x++) {
      for (let y = 0; y < this.boardHeight; y++) {
        if (this.board[x][y] && this.board[x][y].data === 1) {
          const currentHeight = this.boardHeight - y;
          if (currentHeight > maxHeight) { maxHeight = currentHeight; }
          break;
        }
      }
    }
    if (maxHeight > this.boardHeight * 0.70) {
      const rowsToRemove = 6;
      for (let y = this.boardHeight - 1; y >= 0; y--) {
        for (let x = 0; x < this.boardWidth; x++) {
          this.board[x][y] = (y - rowsToRemove >= 0) ? this.board[x][y - rowsToRemove] : { data: 0 };
        }
      }
    }
  }

  fillBoard(curPiece) {
    const { data: piece, x: posX, y: posY } = curPiece;
    const board = this.board;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (piece?.[x]?.[y] === 1) {
          const boardX = x + posX; const boardY = y + posY;
          if (board[boardX]?.[boardY]) {
            board[boardX][boardY].data = 1;
            board[boardX][boardY].colors = curPiece.colors;
          }
        }
      }
    }
    this.checkLines();
    this.preventLoss();
    this.renderBoard();
  }
  
  newTetromino() {
    const pieceNum = Math.floor(Math.random() * tetrominos.length);
    const curPiece = this.curPiece;
    curPiece.data = tetrominos[pieceNum].data.map(row => row.slice());
    curPiece.colors = tetrominos[pieceNum].colors;
    curPiece.x = Math.floor(Math.random() * (this.boardWidth - 4));
    curPiece.y = 0;
    curPiece.rotation = 0;
    this.findBestMove();
  }
  
  checkLines() {
    const { board, boardWidth, boardHeight } = this;
    for (let y = boardHeight - 1; y >= 0; y--) {
      let isLineComplete = true;
      for (let x = 0; x < boardWidth; x++) {
        if (!board[x][y] || board[x][y].data === 0) {
          isLineComplete = false;
          break;
        }
      }
      if (isLineComplete) {
        for (let lineY = y; lineY > 0; lineY--) {
          for (let x = 0; x < boardWidth; x++) {
            board[x][lineY] = board[x][lineY - 1];
          }
        }
        for (let x = 0; x < boardWidth; x++) {
          board[x][0] = { data: 0 };
        }
        y++;
      }
    }
  }

  rotateTetrimono(curPiece, isSimulation = false) {
    const rotated = [[],[],[],[]];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        rotated[x][y] = curPiece.data[3 - y][x];
      }
    }
    if (isSimulation || this.checkMovement({ ...curPiece, data: rotated }, 0, 0)) {
      return rotated;
    }
    return curPiece.data;
  }
  
  wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.strokeText(line, x, y);
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.strokeText(line, x, y);
    context.fillText(line, x, y);
  }

  renderBoard() {
    const { bgCanvas: canvas, bgCtx: ctx, unitSize, board, boardWidth, boardHeight } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < boardWidth; x++) {
      for (let y = 0; y < boardHeight; y++) {
        if (board[x][y]?.data !== 0) {
          const bX = (x * unitSize); const bY = (y * unitSize);
          ctx.fillStyle = board[x][y].colors[0]; ctx.fillRect(bX, bY, unitSize, unitSize);
          ctx.fillStyle = board[x][y].colors[1]; ctx.fillRect(bX + 2, bY + 2, unitSize - 4, unitSize - 4);
          ctx.fillStyle = board[x][y].colors[2]; ctx.fillRect(bX + 4, bY + 4, unitSize - 8, unitSize - 8);
        }
      }
    }
    
    const textToRender = this.messages[this.currentMessageIndex];
    ctx.save();
    ctx.font = 'bold 24px "Press Start 2P", "VT323", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#222';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#222';
    
    const maxWidth = canvas.width * 0.9;
    const lineHeight = 30;
    const centerX = canvas.width / 2;
    const startY = canvas.height / 6;
    
    this.wrapText(ctx, textToRender, centerX, startY, maxWidth, lineHeight);
    ctx.restore();
  }

  render() {
    const { fgCanvas: canvas, fgCtx: ctx, unitSize, curPiece } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!curPiece?.data) return;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (curPiece.data[x]?.[y] === 1) {
          const xPos = ((curPiece.x + x) * unitSize);
          const yPos = ((curPiece.y + y) * unitSize);
          if (yPos > -1) {
            ctx.fillStyle = curPiece.colors[0]; ctx.fillRect(xPos, yPos, unitSize, unitSize);
            ctx.fillStyle = curPiece.colors[1]; ctx.fillRect(xPos + 2, yPos + 2, unitSize - 4, unitSize - 4);
            ctx.fillStyle = curPiece.colors[2]; ctx.fillRect(xPos + 4, yPos + 4, unitSize - 8, unitSize - 8);
          }
        }
      }
    }
  }

  checkMovement(curPiece, newX, newY) {
    const { data: piece, x: posX, y: posY } = curPiece;
    const { board, boardWidth, boardHeight } = this;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (piece?.[x]?.[y] === 1) {
          const nextX = posX + x + newX;
          const nextY = posY + y + newY;
          if (nextX < 0 || nextX >= boardWidth || nextY >= boardHeight) return false;
          if (board[nextX]?.[nextY]?.data === 1) return false;
        }
      }
    }
    return true;
  }
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