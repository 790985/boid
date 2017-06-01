'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var main;   // the global Main object
const FRAME_RATE=0;

function setup() {
  main = new Main();
  window.setTimeout(draw, 0);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
  main.run();
  window.setTimeout(draw, 10000/FRAME_RATE);  // come back here every interval
}

// Start main class  +++++++++++++++++++++++++++++++++++++++++++++++++++++
class Main {
  //  Main constructor
  constructor() {

    //Start create a canvas element ++++++++++++++++++++++++++++++++
    this.canvas = document.createElement("canvas");
    this.canvas.style.backgroundColor = 'white';
    //check if canvas was made
    if(!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    //match the dimensions of the canvas div
    this.canvas.width = 1000;
    this.canvas.height = 750;
    //make the canvas a child of the canvas div
    document.getElementById('canDiv').appendChild(this.canvas);
    //  create the context for the canvas
    this.context = this.canvas.getContext("2d");
    //check if context was made
    if(!this.context)
    throw "No valid context found!";
    //End create a canvas element ++++++++++++++++++++++++++++++++
    // declare instance variables for main
    this.menuButtons = [];
    this.makeRect = false;
    this.b = [];
    this.boidSize = 20;
    //create all initial items
    this.init();

  }

  init(){
    // get the current time
    this.lastTime = Date.now();
    // select canvas for callbacks
    this.canvas.addEventListener('mousemove',this.handleCNVMouseMoved,false);
    this.canvas.addEventListener('mouseover',this.handleCNVMouseOver, false);
    this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);

    // create menu buttons
    this.createMenuButtons();
    this.createBoids();
  }

  run() { // update canvas components --> called from draw()
     this.render();

  }

  render() { // render or draw stuff to canvas
   if(this.makeRect){
     this.context.fillStyle = '#823409';
      this.context.fillRect(10, 10, 100, 100);
    for(let i = 0; i < this.boidSize; i++)
    {
      this.b[i].run();
    }
    }
  }
  //  +++++++++++++++++++++++++++++++++  create buttons for menu area
  createMenuButtons(){
     var numButtons = 5;
     //create and style all button divs
     for(let i = 0; i < numButtons; i++){
       // create a button and place it on the DOM tree
       var button = document.createElement('div');
       document.getElementById("menuDiv").appendChild(button);
       // place a button image on the button
       var buttImg = new Image();
       buttImg.src = "buttons/mb01.png";
       buttImg.id = "b" + i;
       button.appendChild(buttImg);
       //  Add event listeners to images (not buttons)
       buttImg.addEventListener('mouseover',buttonMouseOverHandler,false);
       buttImg.addEventListener('mouseout',buttonMouseOutHandler,false);
       buttImg.addEventListener('click',buttonMouseClickHandler,false);
       // style buttons
       button.style.float = "left";
       button.style.marginTop = "5px";
       button.style.marginLeft = "85px";

       //push button into buttons array
       this.menuButtons.push(button);
     }

  }   // end createMenuButtons
  createBoids(){
    for(let i = 0;i<this.boidSize;i++){
        var x = Math.random()*1000;
        var y = Math.random()*1000;
        var loc = vector2d(x, y);
        var boid = new Boid(this, loc);
        this.b.push(boid);
    }
  }

}//  end main class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// add functionality to your buttons here

function buttonMouseOverHandler(){
   this.src = "buttons/mb02.png"
}


function buttonMouseOutHandler(){
  this.src = "buttons/mb01.png"
}

function buttonMouseClickHandler(){
  main.makeRect = !main.makeRect;
  if(this.id=="b1"){
    if(!this.on){
      main.canvas.style.backgroundColor='green';
      this.on=true;
    }
    else{
      main.canvas.style.backgroundColor='white';
      this.on=false;
    }
  }
  else if(this.id=="b0"){
    if(!this.on){
      for(let i=0; i<main.boidSize; i++){
        main.b[i].boidColor();
      }
    }
  }
  else if(this.id=="b2"){
    if(!this.on){
      for(let i=0; i<main.boidSize; i++){
        boid.b[i].speedX = Math.random() * 20;
        boid.b[i].speedY = Math.random() * 20;
      }
    }
  }
}
