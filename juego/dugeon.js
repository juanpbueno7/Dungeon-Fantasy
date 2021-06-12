var backGroundLago;
var backGroundPlaya;
var disparo;
var house;
var caja1;
var caja2;
var kade;
var rotation;
var trebol;
var enemigoDead;
var enemigoDemon;
var enemigoCerdo;
var enemigoCerdoHits = 0;
var ondaGolpe;
var bomba;
var manzana;
var scene = 0;
var velocidad = 1;
var hits = 0; 

function preload(){

  /* Imagenes de fondo de las diferentes escenas */ 
  backGroundInicio = loadImage("../archivos/Portada 1.png");
  backGroundLago = loadImage("../archivos/Lago.png");
  backGroundPlaya = loadImage("../archivos/Playa.png");
    

  /* Sprite del personaje principal Kade */ 
  kade = createSprite(400, 200, 50, 53);
  kade.setCollider('rectangle', 0, 26, 75, 75);
  kade.addAnimation("move", "../archivos/Kade pistola 1.png", "../archivos/Kade pistola 2.png");
  kade.addAnimation("left-move", "../archivos/Kade pistola 1 izq.png", "../archivos/Kade pistola 2 izq.png");  
  kade.addAnimation("idle", "../archivos/Kade pistola 3.png");
  kade.visible = false;


  /* Grupo de disparos */  
  disparo = loadImage("../archivos/Bola de fuego.png");
  disparos = new Group();


  /* Grupo de objetos escena 1 */ 
  house = createSprite(200, 210);
  house.addImage(loadImage('../archivos/CasaPlaya.png'));
  house.setCollider('rectangle', 0, 0, 300, 300);
  house.visible = false;

  caja1 = createSprite(300, 10);
  caja1.addImage(loadImage('../archivos/caja.png'));
  caja1.setCollider('rectangle', 0, 0, -10, 34);
  caja1.visible = false;

  caja2 = createSprite(250, 10);
  caja2.addImage(loadImage('../archivos/caja.png'));
  caja2.setCollider('rectangle', 0, 0, -10, 34);
  caja2.visible = false;


  /* Enemigos existentes */
  enemigoDead = createSprite(200, 250);
  enemigoDead.addImage(loadImage('../archivos/Dead.png'));
  enemigoDead.setCollider('rectangle', 0, 0, -10, 34);
  enemigoDead.visible = false;

  enemigoDemon = createSprite(100, 100);
  enemigoDemon.addImage(loadImage('../archivos/Demon.png'));
  enemigoDemon.setCollider('rectangle', 0, 0, -10, 34); 
  enemigoDemon.visible = false;

  enemigoCerdo = createSprite(600, 40);
  enemigoCerdo.addImage(loadImage('../archivos/Hombre cerdo.png'));
  enemigoCerdo.setCollider('rectangle', 0, 0, 100, 100); 
  enemigoCerdo.visible = false;


  /* Objetivos a alcanzar */
  trebol = createSprite(80, 10);
  trebol.addImage(loadImage('../archivos/Trebol.png'));
  trebol.setCollider('rectangle', 0, 0, -10, 34);
  trebol.visible = false;

  bomba = createSprite(700, 50);
  bomba.addImage(loadImage('../archivos/Bomba.png'));
  bomba.setCollider('rectangle', 0, 0, -10, 34);
  bomba.visible = false;

  manzana = loadImage('../archivos/Manzana.png');
  manzanas = new Group();

  /* Onda de golpe enemiga */
  ondaGolpe = loadImage("../archivos/Rayo.png");
  ondasGolpe = new Group();


  /* Corazones vida */
  cora1 = createSprite(770, 20);
  cora1.addImage(loadImage('../archivos/Corazon.png'));  
  cora2 = createSprite(740, 20);
  cora2.addImage(loadImage('../archivos/Corazon.png'));  
  cora3 = createSprite(710, 20);
  cora3.addImage(loadImage('../archivos/Corazon.png'));  
  cora4 = createSprite(680, 20);
  cora4.addImage(loadImage('../archivos/Corazon.png'));

}

function setup() {

  /* 
    
    Configruación general del juego 
  
  */

  var cnv = createCanvas(800, 400);
  cnv.position((windowWidth - width) / 2);
  setInterval(ondasEnemigas, 1500);

}

function draw() {

  /* 

    Movimiento y manejo de animaciones personaje principal Kade 
    
  */
    
  switch (scene) {
    case 0:
      menuInicio();
      break;
    case 1:
      escenaPlaya();    
      break;
    case 2:
      escenaLago();
      break;
  }

  if(keyDown('a')){
    kade.changeAnimation('move');
    kade.mirrorX(-1);
    kade.velocity.x = -velocidad;
    rotation = 180;
  }else if (keyDown('d')){    
    kade.changeAnimation('move');
    kade.mirrorX(1);
    kade.velocity.x = velocidad;
    rotation = 360;
  }else if(keyDown('w')){    
    kade.changeAnimation('move');
    kade.velocity.y = -velocidad;
  }else if(keyDown('s')){    
    kade.changeAnimation('move');
    kade.velocity.y = velocidad;
  }else{
    kade.changeAnimation('idle');
    kade.velocity.x = 0;
    kade.velocity.y = 0;
  }
  
  drawSprites();

}

function menuInicio(){

  /* 

    Escena inicial del juego
    Kade deberá mover dos cajas para poder alcanzar el trebol sin delatar su presencia 

  */

  background(backGroundInicio);
  cora1.visible = false;
  cora2.visible = false;
  cora3.visible = false;
  cora4.visible = false;
  
}

function escenaPlaya(){

  /* 

    Escena número 1 del juego - Playa
    Kade deberá mover dos cajas para poder alcanzar el trebol sin delatar su presencia 

  */

  background(backGroundPlaya);

  /* Objetos de colisión */ 

  cora1.visible = true;
  cora2.visible = true;
  cora3.visible = true;
  cora4.visible = true; 
  house.visible = true;
  caja1.visible = true;
  caja2.visible = true;

  /* Movimiento centinela 1 */
  enemigoDead.visible = true;
  if (enemigoDead.position.x === 200){
    enemigoDead.velocity.x = 1;    
    enemigoDead.mirrorX(-1);
  }
  if (enemigoDead.position.x === 300){
    enemigoDead.velocity.x = -1;
    enemigoDead.mirrorX(1);
  }

  /* Movimiento centinela 2 */
  enemigoDemon.visible = true;
  if (enemigoDemon.position.y === 100){
    enemigoDemon.velocity.y = 1;
    enemigoDemon.mirrorX(-1);
  }
  if (enemigoDemon.position.y === 350){
    enemigoDemon.velocity.y = -1;
    enemigoDemon.mirrorX(1);
  }

  trebol.visible = true;
  kade.visible = true;

  kade.collide(house); 
  kade.displace(caja1);
  kade.displace(caja2);

  if (kade.overlap(trebol)){
    scene = 2;
    house.visible = false;
    caja1.visible = false;
    caja2.visible = false;
    trebol.visible = false;
    kade.visible = true;
    kade.position.x = 80;
    kade.position.y = 380;
  }

}

function escenaLago(){

  /* 

    Escena número 2 del juego - Lago
    Kade deberá mover dos cajas para poder alcanzar el trebol sin delatar su presencia 

  */

  background(backGroundLago);

  enemigoDead.visible = true;
  enemigoDead.position.x = 330;
  enemigoDead.position.y = 200;
  enemigoDemon.visible = true;
  enemigoDemon.position.x = 270;
  enemigoDemon.position.y = 200;
  enemigoCerdo.visible = true;
  kade.visible = true;
  bomba.visible = true;
  manzana.visible = true;
  enemigoCerdo.mirrorX(-1);


  if(enemigoDead.overlap(disparos)){
    enemigoDead.rotation = random(0,5);
  }   
  
  if(enemigoDemon.overlap(disparos)){
    enemigoDemon.rotation = random(0,5);
  }  
 
  if(enemigoCerdo.overlap(disparos)){
    enemigoCerdoHits += 1;
    enemigoCerdo.rotation = random(0,5);
    if (enemigoCerdoHits > 100){
      enemigoCerdo.visible = false;
    }
  }
  
  if(kade.overlap(ondasGolpe)){
    hits += 1;
    if (hits > 1 && hits <= 10) cora4.visible = false;
    else if (hits > 10 && hits <= 20) cora3.visible = false;
    else if (hits > 20 && hits <= 30) cora2.visible = false;
    else if (hits > 30 && hits <= 40) cora1.visible = false;
  }

}

function mouseClicked() {
  if (scene === 0) scene = 1;
  var balita = createSprite(kade.position.x, kade.position.y);
  balita.addImage(disparo);
  balita.setSpeed(10+kade.getSpeed(), random(rotation+15,rotation-15));
  balita.life = 30;
  disparos.add(balita);
}

function ondasEnemigas(){
  if (scene === 2){
    var ondita = createSprite(enemigoCerdo.position.x, enemigoCerdo.position.y);
    ondita.addImage(ondaGolpe);
    ondita.setSpeed(10+enemigoCerdo.getSpeed(), random(180, 130));
    ondita.life = 30;
    ondasGolpe.add(ondita);
  }
}


