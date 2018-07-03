
let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');

let currentBlock = null;
let otherBlock = null;

if (window.innerWidth > 1000) {
  canvas.height = 600;
  canvas.width = 900;
} else {
  canvas.height = 300;
  canvas.width = 500;
}

class Block {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.moving = false;
    this.moveDir = '';
    this.move = this.move.bind(this);
    this.stopMove = this.stopMove.bind(this);
  };

  move(e) {
    switch (e.keyCode) {
      case 38:  // Up
        e.preventDefault();
        this.moving = true;
        this.moveDir = 'up';
        break;
      case 40:  // Down
        e.preventDefault();
        this.moving = true;
        this.moveDir = 'down';
        break;
      case 37:  // Left
        e.preventDefault();
        this.moving = true;
        this.moveDir = 'left';
        break;
      case 39:  // Right
        e.preventDefault();
        this.moving = true;
        this.moveDir = 'right';
        break;
      case 32:  // Spacebar
        e.preventDefault();
        this.moving = true;
        this.moveDir = 'jump';
        break;
    }
  };

  stopMove(e) {
    let kc = e.keyCode;
    if (kc === 37 || kc === 38 || kc === 39 || kc === 40) {
      e.preventDefault();
      this.moving = false;
    } else if (kc === 32) {
      e.preventDefault();
      this.moving = false;
      currentBlock.y += 45;
    }
  }
};

let block1 = new Block(100, 100, 40, 30, '#3fa');
let block2 = new Block(150, 100, 40, 30, '#5df');

class ConsoleBlock extends Block {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }

  move(e) {
    console.log('x: ', this.x, 'y: ', this.y);
    super.move(e);
  }

};

let consoleBlock1 = new ConsoleBlock(20, 20, 30, 30, 'red')

currentBlock = consoleBlock1;
otherBlock = block2;

let changeBlock = (e, block) => {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop + $(window).scrollTop();
  if (x >= block.x && x <= block.x + block.width && y >= block.y && y <= block.y + block.height) {
    $(window).off('keydown', currentBlock.move);
    $(window).off('keyup', currentBlock.stopMove);
    currentBlock === consoleBlock1 ? currentBlock = block2 : currentBlock = consoleBlock1;
    otherBlock === consoleBlock1 ? otherBlock = block2 : otherBlock = consoleBlock1;
    $(window).on('keydown', currentBlock.move);
    $(window).on('keyup', currentBlock.stopMove);
  }
};

let animateGame = null;

let animationLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  consoleBlock1.y > 200 ? ctx.fillStyle = consoleBlock1.color : ctx.fillStyle = 'purple';
  ctx.fillRect(consoleBlock1.x, consoleBlock1.y, consoleBlock1.width, consoleBlock1.height);
  ctx.fillStyle = block2.color;
  ctx.fillRect(block2.x, block2.y, block2.width, block2.height);

  if (currentBlock === consoleBlock1) {
    canvas.style.backgroundColor = '#fafae0';
  } else if (currentBlock === block2) {
    canvas.style.backgroundColor = '#fef3c0';
  }

  if (currentBlock.moving) {
    switch (currentBlock.moveDir) {
      case 'up':  // Up
        currentBlock.y -=3;
        break;
      case 'down':  // Down
        currentBlock.y +=3;
        break;
      case 'left':  // Left
        currentBlock.x -=3;
        break;
      case 'right':  // Right
        currentBlock.x +=3;
        break;
      case 'jump':  // spacebar
        currentBlock.y -=6;
        break;
    }
  }

  animateGame = requestAnimationFrame(animationLoop);
};

animationLoop();

$(window).on('keydown', currentBlock.move);
$(window).on('keyup', currentBlock.stopMove);
canvas.addEventListener('click', e => {
  changeBlock(e, otherBlock);
});
