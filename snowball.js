class Snowball {
  constructor(x,y,r,speed,inversion,pic){
    this.maxSpeed = random(0.6,0.8)*speed;
    this.maxAcc = 0.03;
    this.loc = new p5.Vector(x,y); // center
    this.vel = new p5.Vector(0,1);
    this.vel.setMag(this.maxSpeed);
    this.acc = new p5.Vector(0,0);
    this.r = r;
    this.pic = pic.get();
    this.pic.resize(this.r, this.r);
    this.offset = random(360);

    this.inverted = inversion;
    if(this.inverted)this.vel.y *= -1;
    this.angle = 0;
  }

  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
    this.acc.mult(0);

    this.rotate();
    this.wiggle();
    this.seekCursor(this.r*2);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  wiggle(){
    let a = radians(this.offset+frameCount);
    let desired = new p5.Vector(sin(a), 0);
    if (this.inverted) desired.add(new p5.Vector(0,1));
    else               desired.add(new p5.Vector(0,-1));
    let steer = p5.Vector.sub(this.vel, desired);
    steer.limit(this.maxAcc);
    this.applyForce(steer);
  }

  seekCursor(range){
    let dx = this.loc.x - mouseX;
    let dy = this.loc.y - mouseY;
    let d =  dx*dx+dy*dy;
    if(d < range*range){
      let desired = p5.Vector.sub(this.loc, new p5.Vector(mouseX, mouseY));
      let steer = p5.Vector.sub(this.vel, desired);
      steer.limit(this.maxAcc);
      this.applyForce(steer);
    }
  }

  rotate(){
    this.angle += 0.008;
  }

  isEqual(other){
    return (this.loc.x == other.loc.x && this.loc.y == other.loc.y);
  }

  display(){
    push();
    translate(this.loc.x, this.loc.y);
    rotate(this.angle);
    image(this.pic, 0,0);
    pop();
  }

  isOut(where){
    if (where === 'top'       &&
        this.loc.y < -this.r  &&
        this.inverted === true){
      console.log('im out on top');
      return true;
    }

    if (where === 'bottom'             &&
        this.loc.y > height+this.r  &&
        this.inverted === false){
      console.log('im out on bottom');
      return true;
    }

  }
}
