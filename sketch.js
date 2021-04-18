var aline1, alien2, aline1_img, aline2_img;

var fruit1, fruit2, fruit3, fruit4, fruit1_img, fruit2_img, fruit3_img, fruit4_img;

var gameOver, gameOver_img, gameOver_sound;

var knife, knife_img, knife_sound;

var alineGroup, fruitGroup;

var score = 0;

var gameState = "play";

var sound1;

function preload() {
  aline_img = loadAnimation("alien1.png", "alien2.png");


  fruit1_img = loadImage("fruit1.png");
  fruit2_img = loadImage("fruit2.png");
  fruit3_img = loadImage("fruit3.png");
  fruit4_img = loadImage("fruit4.png");

  gameOver_img = loadImage("gameover.png");
  gameOver_sound = loadSound("gameover.mp3");

  knife_img = loadImage("sword.png");
  knife_sound = loadSound("knifeSwooshSound.mp3");

  sound1 = loadSound("sound1.mp3");
}

function setup() {
  //Making background
  background(400, 400);

  //Making knife sprites
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knife_img);
  knife.scale = 0.7;
  knife.setCollider("circle", 20, -23, 40);
  knife.debug = false;

  //Making fruits and aline groups
  fruitGroup = createGroup();
  alineGroup = createGroup();

}

//Making Draw function
function draw() {

  //Filling background colour
  fill(rgb(0, 255, 238));
  rect(0, 0, 400, 400);

  //Making game state 'PLAY'
  if (gameState === "play") {

    //Calling enemy and fruit function
    enemy();
    fruitF();

    //Moning knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    //When knife touches to fruit group will destroy
    if (fruitGroup.isTouching(knife)) {
      knife_sound.play();
      sound1.play();
      fruitGroup.destroyEach();
      score = score + 2;
    }

  }

  if (alineGroup.isTouching(knife)) {
    //game state trun into 'END'
    gameState = "end";

    //Game over sound
    gameOver_sound.play();

    //Destroying fruits and aline
    fruitGroup.destroyEach();
    alineGroup.destroyEach();

    //Setting velocity of fruitGroup and alineGroup 0
    fruitGroup.setVelocityXEach(0);
    alineGroup.setVelocityXEach(0);

    //Changing animation of knife   
    knife.addImage(gameOver_img);

    //Reset the knife
    knife.x = 200;
    knife.y = 200;

  }

  //Drawing sprites
  drawSprites();

  //Display score
  fill("red")
  textSize(18)
  text("Score: " + score, 320, 25);

}

//Function for fruit
function fruitF() {
  if (frameCount % 80 === 0) {
    var fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug = true;

    position = Math.round(random(1, 4));

    if (position === 1) {
      fruit.addImage(fruit1_img);
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else if (position === 2) {
      fruit.addImage(fruit2_img);
      fruit.x = 0;
      fruit.velocityX = (7 + (score / 4));
    } else if (position === 3) {
      fruit.addImage(fruit3_img);
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      fruit.addImage(fruit4_img);
      fruit.x = 0;
      fruit.velocityX = (7 + (score / 4));
    }

    fruit.y = Math.round(random(50, 340));

    //fruit.velocityX = -7;

    fruit.lifetime = 100;

    fruitGroup.add(fruit);
  }
}

//Function for aline
function enemy() {
  if (frameCount % 200 === 0) {
    var aline = createSprite(400, 200, 20, 20);
    aline.scale = 0.95;
    aline.addAnimation("moving", aline_img);
    aline.y = Math.round(random(100, 300));
    aline.velocityX = -(7 + (score / 4));
    aline.lifetime = 100;

    alineGroup.add(aline);
  }
}