
let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');

if (window.innerWidth > 1000) {
  canvas.height = 600;
  canvas.width = 900;
} else {
  canvas.height = 300;
  canvas.width = 500;
}

class Block {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
};

let block1 = new Block(100, 100, '#3fa');
let block2 = new Block(-50, 100, '#3fa');

var moveBlock = e => {
  switch (e.keyCode) {
    case 38:  // Up
    e.preventDefault();
      block1.y -=3;
      break;
    case 40:  // Down
    e.preventDefault();
      block1.y +=3;
      break;
    case 37:  // Left
    e.preventDefault();
      block1.x -=3;
      break;
    case 39:  // right
    e.preventDefault();
      block1.x +=3;
      break;
  }
};

let animateGame = null;

let animationLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = block1.color;
  ctx.fillRect(block1.x, block1.y, 40, 30);
  ctx.fillStyle = block2.color;
  ctx.fillRect(block2.x, block2.y, 40, 30);

  if (block1.x <= 850 && block2.x < 0) {
    console.log('one');
    block1.x +=3 ;
  } else if (block1.x > 850 && block2.x < 0) {
    console.log('two');
    block1.x += 3;
    block2.x += 3;
  } else if (block2.x <= 850) {
    console.log('three');
    block1.x = -50;
    block2.x += 3;
  } else if (block2.x > 850 && block1.x < 0) {
    console.log('four');
    block1.x += 3;
    block2.x += 3;
  } else if (block1.x <= 850) {
    block1.x += 3;
    block2.x = -50;
  }

  animateGame = requestAnimationFrame(animationLoop);
};

animationLoop();

$(window).on('keydown', moveBlock);
