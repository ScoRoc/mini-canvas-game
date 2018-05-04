
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
      case 39:  // right
        e.preventDefault();
        this.moving = true;
        this.moveDir = 'right';
        break;
    }
  };

  stopMove(e) {
    let kc = e.keyCode;
    if (kc === 37 || kc === 38 || kc === 39 || kc === 40) {
      e.preventDefault();
      this.moving = false;
    }
  }
};

let block1 = new Block(100, 100, 40, 30, '#3fa');
let block2 = new Block(150, 100, 40, 30, '#5df');

currentBlock = block1;
otherBlock = block2;

let changeBlock = (e, block) => {
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop + $(window).scrollTop();
  if (x >= block.x && x <= block.x + block.width && y >= block.y && y <= block.y + block.height) {
    $(window).off('keydown', currentBlock.move);
    $(window).off('keyup', currentBlock.stopMove);
    currentBlock === block1 ? currentBlock = block2 : currentBlock = block1;
    otherBlock === block1 ? otherBlock = block2 : otherBlock = block1;
    $(window).on('keydown', currentBlock.move);
    $(window).on('keyup', currentBlock.stopMove);
  }
};

// var moveBlock = e => {
//   switch (e.keyCode) {
//     case 38:  // Up
//     e.preventDefault();
//       block1.y -=3;
//       break;
//     case 40:  // Down
//     e.preventDefault();
//       block1.y +=3;
//       break;
//     case 37:  // Left
//     e.preventDefault();
//       block1.x -=3;
//       break;
//     case 39:  // right
//     e.preventDefault();
//       block1.x +=3;
//       break;
//   }
// };

let animateGame = null;

let animationLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = block1.color;
  ctx.fillRect(block1.x, block1.y, block1.width, block1.height);
  ctx.fillStyle = block2.color;
  ctx.fillRect(block2.x, block2.y, block2.width, block2.height);

  // if (block1.x <= 850 && block2.x < 0) {
  //   console.log('one');
  //   block1.x +=3 ;
  // } else if (block1.x > 850 && block2.x < 0) {
  //   console.log('two');
  //   block1.x += 3;
  //   block2.x += 3;
  // } else if (block2.x <= 850) {
  //   console.log('three');
  //   block1.x = -50;
  //   block2.x += 3;
  // } else if (block2.x > 850 && block1.x < 0) {
  //   console.log('four');
  //   block1.x += 3;
  //   block2.x += 3;
  // } else if (block1.x <= 850) {
  //   block1.x += 3;
  //   block2.x = -50;
  // }

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
      case 'right':  // right
        currentBlock.x +=3;
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
