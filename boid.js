'use strict'


// Start Boid class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Boid {
  //  Boid constructor
  constructor(m, location,color) {
    // declare instance variables for Boid
    this.main = m;
    this.loc = location;
    this.speedX = 5;//Math.random(-1.0, 1.0);
    this.speedY = -3;//Math.random(-1.0, 1.0);
    this.vel = vector2d(Math.random()*10 - 5, Math.random()*10 - 5);
    this.radius = Math.floor(Math.random()*5+5);
    this.context = this.main.context;
    //create all initial items
    this.init();
  }

  init(){

  }

  run() { // update this
    //console.log("Inside boid run");
    this.update();
    this.render();
  }
  update() { // render or draw this to canvas
    this.checkEdges();
    this.loc.x += this.vel.x;
    this.loc.y += this.vel.y;

  }
  render() { // render or draw this to canvas
    //console.log("loc.x = " + this.loc.x);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.beginPath();
    this.context.arc(this.loc.x, this.loc.y, 11, 0, 2 * Math.PI, false);
    this.context.stroke();
  }

  checkEdges(){
  if(this.loc.x > 1000 ||this.loc.x < 10) this.vel.x *= -1;
  if(this.loc.y > 750 ||this.loc.y < 10) this.vel.y *= -1;

  }

}
