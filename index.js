
let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');

if (window.innerWidth > 1000) {
  canvas.height = 600;
  canvas.width = 900;
} else {
  canvas.height = 300;
  canvas.width = 500;
}

let block1 = {
  x: 100,
  y: 100,
  color: '#3fa'
};

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
  ctx.fillRect(block1.x, block1.y, 30, 30);

  // if (block1.x <= )
  // block1.x +=3;

  animateGame = requestAnimationFrame(animationLoop);
};

animationLoop();

$(window).on('keydown', moveBlock);
