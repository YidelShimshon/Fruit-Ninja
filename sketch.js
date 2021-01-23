
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit,fruitGroup,enemyGroup, score, monster;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, gameOverImage, monsterImage

var knifeSound, gameOverSound


function preload(){
  
  swordImage = loadImage("sword.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  knifeSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound ("gameover.mp3")

}



function setup() {
  createCanvas(600, 600);
  
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.9
  
  text.scale = 1
  
  enemyGroup=createGroup();
  score=0;
  fruitGroup=createGroup();

}

function draw() {
  background("#FFBEBC");
  
  if(gameState===PLAY){
    
    Enemy();
    fruits();
    
    sword.y=mouseY;
    sword.x=mouseX;
    
    fruitGroup.velocityX = -(5+4*score/4)
  
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeSound.play();  
    }
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        enemyGroup.destroyEach();
        fruitGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);

        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
        gameOverSound.play();
      }
    }
          }
  
  drawSprites();
  
  textSize (20);
  text("Score : "+ score,500,70);
}


function Enemy(){
  if(World.frameCount%300===200){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/8));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
   position = Math.round(random(1,2))
   fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    if (position==1){
     fruit.x =400
     fruit.velocityX = -(8+ (score/4))
    }
    else
    
    if(position==2){
    fruit.x = 0
    fruit.velocityX = (8+(score/4))
    }
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
  }
}

