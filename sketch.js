const SB_num = 20;
const snowballs = [];
const videosID = new Array(SB_num).fill('10924819024819384');

const SB_pics = new Array(4);
const BACK_pics = new Array(3);
let HAND_pic;
let stoppped = false;

function preload(){
  for (let i = 0; i < SB_pics.length; i ++) SB_pics[i] = loadImage('images/s'+(i+1)+'.png');
  for (let i = 0; i < BACK_pics.length; i ++) BACK_pics[i] = loadImage('images/back'+(i+1)+'.png');
  HAND_pic = loadImage('images/hand.png');
}

function setup() {
  noCursor();
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  snowballs.push (new Array(Math.floor(SB_num*0.4)));
  snowballs.push (new Array(Math.floor(SB_num*0.35)));
  snowballs.push (new Array(SB_num - snowballs[0].length - snowballs[1].length));
  // HAND_pic.resize(150,0);

  for (let i = 0; i < SB_pics.length; i ++) {
    console.log(SB_pics[i].width);
  }

  for (let s = 0; s < snowballs.length; s++){
    for (let i = 0; i < snowballs[s].length; i++){
      let inversion = (random() < 0.5);
      let x = random(width);
      let y = random(height);
      let w = (width*0.1) / (snowballs.length - s);
      let speed = s+1;
      let pic = SB_pics[floor(random(SB_pics.length))];
      snowballs[s][i] = new Snowball(x,y,w,speed,inversion,pic);
    }
  }
}

function draw() {
  if (stoppped) return;
  for(let s = 0; s < snowballs.length; s++){
    image(BACK_pics[s],width/2,height/2,width,height);
    for(let i = 0; i < snowballs[s].length; i++){
      snowballs[s][i].update();
      snowballs[s][i].display();
    }
  }

  for(let s = 0; s < snowballs.length; s++){
    for(let i = 0; i < snowballs[s].length; i++){
      if (snowballs[s][i].loc.y > height + snowballs[s][i].w && !snowballs[s][i].inverted) {
        snowballs[s].splice(i,1);
        let inversion = false;
        let x = random(width);
        let y = random(-100,-500);
        let w = (width*0.1) / (snowballs.length - s);
        let speed = s+1;
        let pic = SB_pics[floor(random(SB_pics.length))];
        snowballs[s].push(new Snowball(x,y,w,speed,inversion,pic));
      }

      if (snowballs[s][i].loc.y < -snowballs[s][i].w && snowballs[s][i].inverted) {
        snowballs[s].splice(i,1);
        let inversion = true;
        let x = random(width);
        let y = height + random(100,500);
        let w = (width*0.1) / (snowballs.length - s);
        let speed = s+1;
        let pic = SB_pics[floor(random(SB_pics.length))];
        snowballs[s].push(new Snowball(x,y,w,speed,inversion,pic));
      }
    }
  }
  push();
  translate(mouseX, mouseY);
  if (mouseY < height/2) rotate(PI);
  image(HAND_pic,0,0);
  pop();
}

function mousePressed(){
  for (let s = 0; s < snowballs.length; s++){
    for (let i = 0; i < snowballs[s].length; i++){
      let me = new p5.Vector(mouseX, mouseY);
      let r = snowballs[s][i].w*0.5;
      let ballCenter = new p5.Vector(snowballs[s][i].loc.x, snowballs[s][i].loc.y);
      if(p5.Vector.dist(me,ballCenter) < r){
        stoppped = true;
        background(0,200);
        rect(width/2,height/2,500,500,300);
      }
    }
  }
}


// function showModalWithVideo(id) {
//   console.log('Modal with video is shown! The video ID is '+id);
// }
