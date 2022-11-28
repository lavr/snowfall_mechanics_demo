class Snowball {
  constructor(x,y,w,speed,inversion,pic){
    this.maxSpeed = random(0.6,0.8)*speed;
    this.loc = new p5.Vector(x,y); // center
    this.vel = new p5.Vector(0,1);
    this.vel.setMag(this.maxSpeed);
    this.w = random(w*0.9,w*1.1);
    this.h = this.w;
    this.pic = pic.get();
    this.pic.resize(this.w, this.h);
    this.offset = random(360);

    this.inverted = inversion;
    if(this.inverted)this.vel.y *= -1;
    this.angle = 0;
  }

  update(){
    this.loc.add(this.vel);
    this.rotate();
    this.wiggle();
  }

  wiggle(){
    let a = radians(this.offset+frameCount);
    let w = new p5.Vector(sin(a), 0);
    if (this.inverted) w.add(new p5.Vector(0,-1));
    else w.add(new p5.Vector(0,1));
    this.vel.add(w);
    this.vel.limit(this.maxSpeed);
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
}
