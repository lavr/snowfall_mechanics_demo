const BACK_h = window.innerHeight * 1.4;
const BACK_w = BACK_h * 1.78;
const backTranslateRange = window.innerHeight*0.15;

const LAYERS = 3;
const SNOWBALLS = new Array(LAYERS);
const BACK_pics = new Array(LAYERS);
const SB_num = 20;
const SB_pics = new Array(16);
let HAND_pic;

let trXprev = 0;
let trYprev = 0;

function preload(){
  for (let i = 0; i < SB_pics.length; i ++) SB_pics[i] = loadImage('images/sb'+(i+1)+'.svg');
  for (let i = 0; i < BACK_pics.length; i ++) BACK_pics[i] = loadImage('images/back'+(i+1)+'.svg');
  HAND_pic = loadImage('images/hand.svg');
}

function setup() {
  // noCursor();
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  SNOWBALLS[0] = new Array(Math.floor(SB_num*0.40));
  SNOWBALLS[1] = new Array(Math.floor(SB_num*0.35));
  SNOWBALLS[2] = new Array(SB_num - SNOWBALLS[0].length - SNOWBALLS[1].length);
  HAND_pic.resize(150,0);

  for (let s = 0; s < SNOWBALLS.length; s++){
    for (let i = 0; i < SNOWBALLS[s].length; i++){
      let inversion = (random() < 0.5);
      let x = random(width);
      let y = random(height);
      let r = (width*0.2) / (SNOWBALLS.length - s+1);
      let speed = s+1;
      let pic = SB_pics[floor(random(SB_pics.length))];
      SNOWBALLS[s][i] = new Snowball(x,y,r,speed,inversion,pic);
    }
  }
}

function draw() {
//   let lerpVal = 0.05;
//   let trXdesired = map(mouseX,0,width, -backTranslateRange,backTranslateRange) * 0.3;
//   let trX = lerp(trXprev,trXdesired,lerpVal);

//   let trYdesired = map(mouseY,0,width, -backTranslateRange,backTranslateRange) * 0.2;
//   let trY = lerp(trYprev,trYdesired,lerpVal);

  for(let s = 0; s < SNOWBALLS.length; s++){
    push();
//     translate(trX * (s+0.5), trY * (s+0.3));
    image(BACK_pics[s],width/2,height/2,BACK_w,BACK_h);
    pop();
    for(let i = 0; i < SNOWBALLS[s].length; i++){
      SNOWBALLS[s][i].update();
      SNOWBALLS[s][i].display();
    }
  }

//   trXprev = trX;
//   trYprev = trY;

  for(let s = 0; s < SNOWBALLS.length; s++){
    for(let i = 0; i < SNOWBALLS[s].length; i++){
      if (SNOWBALLS[s][i].isOut('bottom')) {
        SNOWBALLS[s].splice(i,1);
        let inversion = false;
        let x = random(width);
        let y = random(-100,-500);
        let r = (width*0.2) / (SNOWBALLS.length - s+1);
        let speed = s+1;
        let pic = SB_pics[floor(random(SB_pics.length))];
        SNOWBALLS[s].push(new Snowball(x,y,r,speed,inversion,pic));
      }

      if (SNOWBALLS[s][i].isOut('top')) {
        SNOWBALLS[s].splice(i,1);
        let inversion = true;
        let x = random(width);
        let y = height + random(100,500);
        let r = (width*0.2) / (SNOWBALLS.length - s+1);
        let speed = s+1;
        let pic = SB_pics[floor(random(SB_pics.length))];
        SNOWBALLS[s].push(new Snowball(x,y,r,speed,inversion,pic));
      }
    }
  }
}

function mousePressed(){
  for (let s = SNOWBALLS.length-1; s >= 0; s--){
    for (let i = SNOWBALLS[s].length-1; i >= 0; i--){
      let me = new p5.Vector(mouseX, mouseY);
      let r = SNOWBALLS[s][i].r*0.5;
      let ballCenter = new p5.Vector(SNOWBALLS[s][i].loc.x, SNOWBALLS[s][i].loc.y);
      if(p5.Vector.dist(me,ballCenter) < r){
        showModalWithVideo();
        return;
      }
    }
  }
}


function showModalWithVideo() {
  console.log('Modal with video is shown!');
}
