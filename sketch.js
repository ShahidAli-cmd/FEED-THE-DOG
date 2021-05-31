var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedthedog=createButton("FeedTheDog");
  feedthedog.position(670,95);
  feedthedog.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref('FeedTime')
  feedTime.on("value",function(){
    lastFeed=data.val()
  })
  
  
 
  //write code to display text lastFed time here
  if(lastFeed>=12){
    text("Last Feed:"+lastFeed%12+"PM",350,30)
  }else if(lastFeed==0){
    text("Last Feed:12 AM ",350,50)
  }else{
text("Last Feed:"+lastFeed+"AM",350,50)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 var food_Stock_val = foodObj.getFoodStock();
 if(food_Stock_val <=0){
   foodObj.updateFoodStock(food_Stock_val * 0);
 }else{
  foodObj.updateFoodStock(food_Stock_val - 1);
 }
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
