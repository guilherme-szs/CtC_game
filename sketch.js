
// Video do projeto: 
// https://youtu.be/IJeOAW8MPFE


// variáveis do jogo //
var xSquare, ySquare, colidiu, colidiuMeta, pontos, pontos2, timer, timerf2, bateuSquare;
timer = 0;
timer_fase = 0;
timerf2 = 0;
xSquare = 200;
ySquare = 200;
colidiu = false;
colidiuMeta = false;
pontos = 0;
pontos2 = 0;
xyellowcircle = 250;
yyellowcircle = 450;
// circulo 2 //
x2yellowcircle = 250;
y2yellowcircle = 30;

// quadrado 2, 3 e 4 //
var x2Square, y2Square, x3Square, y3Square, x4Square, y4Square;
x2Square = 200;
y2Square = 350;
x3Square = 400;
y3Square = 400;
x4Square = 200;
y4Square = 100;

// coordenadas dos botões //
var X1button, Y1button;
var X2button, Y2button;
var X3button, Y3button;
// coordenadas do cursor //
var Xcursor, Ycursor;
// variável de estado //
var estado;
// ver onde está o cursor //
var pos_cursor;
// --------------------- //
var backgroundimg;
var pi;
var sombola;
function preload(){
  bateuSquare = loadSound("https://raw.githubusercontent.com/rudsondant/boxban/master/hitHurt.mp3");
   backgroundimg = loadImage("foto.jpg")
   pi = loadImage("pi-1453836_1280.jpg")
  sombola = loadSound("powerUp.mp3")
  

}
function setup() {
  createCanvas(500,500);
  X1button = 120;
  Y1button = 130;
  
  X2button = 120;
  Y2button = 230;
  
  X3button = 120;
  Y3button = 330;
  
  Xcursor = 120;
  Ycursor = 130;
  
  estado = 1;
  pos_cursor = 1;
}

function draw() {
 if(estado==1){
   menu();
 }else if(estado==2){
   start();
 }else if(estado==3){
   instructions();
 }else if(estado==4){
   credits();
 }else if(estado==5){
   perdeu();
 }else if(estado==6){
   venceu_fase1();
 }else if(estado==7){
   fase2();
 }else if(estado==8){
   venceu_fase2();
 }
}
function keyPressed(){
if(keyCode == UP_ARROW){
    Ycursor = Y1button;
    pos_cursor = 1;
  } else if(keyCode == DOWN_ARROW && Ycursor === Y1button){
    Ycursor = Y2button;
    pos_cursor = 2;
  } else if(keyCode == DOWN_ARROW && Ycursor === Y2button){
    Ycursor = Y3button;
    pos_cursor = 3;
  }
  if(keyCode == ENTER){
  if(pos_cursor===1){
    estado = 2;
  }else if(pos_cursor===2){
    estado = 3;
  }else if(pos_cursor===3){
    estado = 4;
  }
}
  if(keyCode == ESCAPE){
    estado = 1;
  }
  if(keyCode == RIGHT_ARROW && estado === 6){
    estado = 7
  }
}
function menu(){
  strokeWeight(2)
  background(30);
  // desenho do menu principal //
  stroke(1)
  fill(75)
  rect(100,80,300,350, 5);
  // desenho do botão 1 //
  fill(120)
  rect(X1button, Y1button, 260, 70, 5);
  textSize(40);
  fill(255)
  text("Iniciar", X1button+80, Y1button+46);
  // desenho do botão 2 //
  fill(120)
  rect(X2button, Y2button, 260, 70, 5);
  textSize(40);
  fill(255)
  text("Instruções", X2button+40, Y2button+46);
  // deesenho do botão 3 //
  fill(120)
  rect(X3button, Y3button, 260, 70, 5);
  textSize(40);
  fill(255)
  text("Créditos", X3button+60, Y3button+46);
  // desenho do cursor //
  noFill();
  stroke(255)
  rect(Xcursor, Ycursor, 260, 70, 5);
  textSize(10)
  fill(255)
  stroke(0)
  text("Obs: use CIMA e BAIXO para escolher o menu e Enter para selecionar", 100, 450)
  textSize(25)
   text("Catch the Circle", 160, 50)
}
function start(){

  frameRate(30);
  background(0);
  
  fill("orange");
  circle(mouseX, mouseY, 50);
  
  fill("red");
  square(xSquare, ySquare, 50)
  xSquare = xSquare - 6;
  if(xSquare<0){xSquare = 500;}
  
  //hora da colisão
  colidiu = collideRectCircle(xSquare, ySquare, 50, 50, mouseX, mouseY, 50);
  if(colidiu == true && timer > 1){fill("white");text("Game Over", 200, 200); estado = 5; pontos = 0, timer = 0; bateuSquare.play()}
 
  // circulo amarelo de pontos //
  fill("yellow")
  circle(xyellowcircle, yyellowcircle, 50);
  yyellowcircle = yyellowcircle - 5
  if(yyellowcircle<0){yyellowcircle = 500}
  colidiuMeta = collideCircleCircle(xyellowcircle, yyellowcircle, 50, mouseX, mouseY, 50);
  if(colidiuMeta == true){pontos++; sombola.play()}
  textSize(20)
  fill(0)
  stroke(255)
  text("Score: "+ pontos, 40, 50)
  if(pontos>=200 && estado === 2){estado = 6; pontos = 0; timer = 0}
  text("Fase 1", 400, 50)
  if(frameCount % 30 == 0){timer++}
  text(timer, 240, 50)
  
 
}
function instructions(){
  background(30)
  fill(255)
  stroke(0)
  textSize(17)
  text("Mova-se usando o mouse;", 130, 100);
  text("Você irá perder se encostar no quadrado;", 100,120)
  text("Você deve colidir com o circulo amerelo para ganhar pontos;", 30,140)
  text("Você irá ganhar quando atingir 200 pontos.", 100,160)
  text("Use o botão Esc para voltar ao menu inicial.", 100,180)
}
function credits(){
  background(30)
  textSize(17)
  text("PEDRO GUILHERME DE SOUZA SILVA", 130, 100)
  text("RUMMENIGGE RUDSON DANTAS", 130, 130)
}
function perdeu(){
  background(30)
  textSize(40)
  text("VOCÊ PERDEU!", 100, 100)
  textSize(20)
  text("Pressione 'ESC' para voltar ao menu", 100, 200)
  textSize(15)
  fill(255, 0, 12)
  text("Um quadrado é um retângulo com quatro lados iguais", 100, 300)
  text("e quatro ângulos retos (90 graus)!", 100, 320)
  text("A área de um retângulo é: Área = Base x Altura", 100, 350)
}
function venceu_fase1(){
  image(backgroundimg, height/8, width/8, 360, 360)
  textSize(30)
  frameRate(30)
  text("Você venceu a primeira fase!", 60, 100)
  textSize(20)
  text("Pressione 'ESC' para voltar ao menu", 100, 200)
  textSize(18)
  text("Ou aperte 'SETA DIREITA' p/ prox fase", 100, 230)
  textSize(15)
  fill(0, 190, 12)
  text("Um círculo é uma figura geométrica plana formada por", 20, 300)
  text("todos os pontos equidistantes de um ponto central, chamado de centro.", 20, 320)
  text("A distância do centro a qualquer ponto do círculo é o raio", 20, 350)
  text("A área de um circulo é: Área = π × r²", 20, 370)
  text("Onde π é igual a 3,14159 e r² é o raio do circulo elevado ao quadrado", 20, 390)
  
}
function fase2(){
  frameRate(30);
  background(0);
  
  if(frameCount % 30 == 0){timerf2++}
  text(timerf2, 240, 50)
  
  fill("orange");
  circle(mouseX, mouseY, 50);
  
   fill("red");
  square(xSquare, ySquare, 50)
  xSquare = xSquare - 6;
  if(xSquare<0){xSquare = 500;}
  
  colidiu = collideRectCircle(xSquare, ySquare, 50, 50, mouseX, mouseY, 50);
  if(colidiu == true && timerf2 > 1){fill("white");text("Game Over", 200, 200); estado = 5; pontos = 0, timerf2 = 0; bateuSquare.play()}
  
    fill("red");
  square(x2Square, y2Square, 50)
  x2Square = x2Square + 6;
  if(x2Square>500){x2Square = 0;}
  
  var colidiu2 = collideRectCircle(x2Square, y2Square, 50, 50, mouseX, mouseY, 50)
  if(colidiu2 == true && timerf2 > 1){estado = 5; pontos = 0, timerf2 = 0; bateuSquare.play()}
  
  
    fill("red");
  square(x3Square, y3Square, 50)
  x3Square = x3Square + 6;
  if(x3Square>500){x3Square = 0;}
  
  var colidiu3 = collideRectCircle(x3Square, y3Square, 50, 50, mouseX, mouseY, 50)
  if(colidiu3 == true && timerf2 > 1){estado = 5; pontos = 0, timerf2 = 0; bateuSquare.play()}
  
   fill("red");
  square(x4Square, y4Square, 50)
  x4Square = x4Square + 6;
  if(x4Square>500){x4Square = 40;}
  
   var colidiu4 = collideRectCircle(x4Square, y4Square, 50, 50, mouseX, mouseY, 50)
  if(colidiu4 == true && timerf2 > 1){estado = 5; pontos = 0, timerf2 = 0; bateuSquare.play()}
  
  
  
   fill("yellow")
  circle(x2yellowcircle, y2yellowcircle, 50);
  y2yellowcircle = y2yellowcircle + 5
  if(y2yellowcircle>520){y2yellowcircle = 30}
  
  var colidiuMeta2 = collideCircleCircle(x2yellowcircle, y2yellowcircle, 50, mouseX, mouseY, 50);
  if(colidiuMeta2 == true){pontos2++; sombola.play()}
   if(pontos2>=200){estado = 8, timerf2 = 0, pontos2 = 0}
  
 
  textSize(20)
  fill(0)
  stroke(255)
  text("Score: "+ pontos2, 40, 50)
  if(pontos>=200){estado = 6}
  text("Fase 2", 400, 50)
  
}
function venceu_fase2(){
   image(pi, height/8, width/8, 370, 360)
  textSize(30)
  text("Você venceu o jogo!", 115, 100)
  textSize(20)
  text("Pressione 'ESC' para voltar ao menu", 100, 200)
  textSize(15)
  fill(0, 190, 12)
  text("A área de uma esfera define-se por: Área = 4 × π × r² ",90, 300)
  text("E o volume de uma esfera é: Volume = (4 × π × r³)/3 ", 90, 320)
  text("Uma esfera é um objeto tridimensional onde todos", 90, 350)
  text("os pontos da superfície estão equidistantes do centro.", 90, 370)
}