
var backGround;
var idleKade;
var kadeFusil;

var kade;

function preload(){
  backGround = loadImage("../archivos/Lago.png");
  idleKade = loadImage("../archivos/Kade pistola 3.png");
  kadeFusil = loadAnimation("../archivos/Kade pistola 1.png", "../archivos/Kade pistola 2.png"); 
  kade = createSprite(400, 200, 50, 53);
  kade.addAnimation("move", "../archivos/Kade pistola 1.png", "../archivos/Kade pistola 2.png");
  kade.addAnimation("left-move", "../archivos/Kade pistola 1 izq.png", "../archivos/Kade pistola 2 izq.png");  
  kade.addAnimation("idle", "../archivos/Kade pistola 3.png");

}

function setup() {
  var cnv = createCanvas(800, 400);
  var x = (windowWidth - width) / 2;
  cnv.position(x);
}

function draw() {
  background(backGround);

  if(keyDown('a')){
    kade.changeAnimation('move');
    kade.mirrorX(-1);
    kade.velocity.x = -1;
  }else if (keyDown('d')){    
    kade.changeAnimation('move');
    kade.mirrorX(1);
    kade.velocity.x = 1;
  }else if(keyDown('w')){    
    kade.changeAnimation('move');
    kade.velocity.y = -1;
  }else if(keyDown('s')){    
    kade.changeAnimation('move');
    kade.velocity.y = 1;
  }else{
    kade.changeAnimation('idle');
    kade.velocity.x = 0;
    kade.velocity.y = 0;
  }

  drawSprites();
}
