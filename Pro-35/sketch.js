var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, variable;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

  var balloonPosition=database.ref('Balloon/position');
  balloonPosition.on("value",readPosition,showError);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   updatePosition(-10,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updatePosition(){
  database.ref('Balloon/position').set({
    'x' : position.x + x,
    'y': position.y+ y
  })
}

function readPosition(data){
  position= data.val();
  balloon.x= position.x;
  balloon.y= position.y;
}
function showError(){
  console.log("Error in writing to the database");
}
