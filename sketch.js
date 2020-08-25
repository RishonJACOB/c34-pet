//Create variables here
var petimg;
var petimg2;
var pet;
var pet2;
var database;
var foodS,foodStock;
function preload()
{
  //load images here
  petimg =loadImage("images/dogImg.png")
  petimg2 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  pet = createSprite(width/2,height/2,10,10)
  pet.addImage(petimg)
  pet2 = createSprite(width/2,height/2,10,10)
  pet2.addImage(petimg2)
  
  foodStock = database.ref('food')
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  pet2.addImage("petimg2",petimg2);
  pet1.visible("false")
}
  drawSprites();
  //add styles here 
textSize(35)
fill("red")
stroke("green")
text("food remaining"+foodS,150,500)
text("note: Use up arrow key to feed your pet/dog ",150,450);
}

function readStock(data){
  foodS-data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

