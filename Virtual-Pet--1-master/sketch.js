//Create variables here
var database,happyDog,sadDog,dog,foodStock,foodObject,lastfed
function preload()
{happyDog=loadImage("images/dogImg1.png")
sadDog=loadImage("images/dogImg.png")
	//load images here
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(300,300,150,150)
  dog.addImage(sadDog)
  database=firebase.database()
  database.ref("food").on("value",readStock)
  dog.scale=0.2
  addFood=createButton("add food")
  addFood.position(800,100)
  addFood.mousePressed(addF )
feed=createButton("feed the dog")
feed.position(700,100)
feed.mousePressed(feedDog)
foodObject=new Food()
  
}
function readStock(data){
  foodStock=data.val()
foodObject.updateFoodStock(foodStock)
}

function draw() {  
background(46,139,87)
foodObject.display()
  drawSprites();
database.ref("lastfed").on("value",function(data){
  lastfed=data.val()

})
fill(255)
if(lastfed>=12){
text("lastfed:"+lastfed%12+"pm",400,40)
}
else if(lastfed===0){
  text("lastfed:12am",400,40)
}
else{
  text("lastfed:"+lastfed+"am",400,400)
}

}

/*function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref("/").update({
    food:x
  })

  
}*/
function addF(){
foodStock++
database.ref("/").update({
  food:foodStock
})
}
function feedDog(){
  dog.addImage(happyDog)
  if(foodObject.getFoodStock<=0){
foodObject.updateFoodStock(0)

  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  }
  database.ref("/").update({food:foodObject.getFoodStock(),lastfed:hour()})
}




