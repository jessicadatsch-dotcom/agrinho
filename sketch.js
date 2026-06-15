// Variáveis principais
let trator;
let plantações = [];
let colhidas = 0;
let pontos = 0;
let combustivel = 100;
let tempo = 90; // segundos
let obstaculos = [];

function setup() {
  createCanvas(900, 600);
  frameRate(60);
  
  // Trator
  trator = { x: width/2, y: height-80, size: 40 };
  
  // Plantações iniciais
  for (let i = 0; i < 10; i++) {
    plantações.push(createVector(random(width), random(height-200)));
  }
  
  // Obstáculos iniciais
  for (let i = 0; i < 5; i++) {
    obstaculos.push(createVector(random(width), random(height-200)));
  }
}

function draw() {
  background(180, 230, 150);
  
  // Mostrar trator
  fill(200, 0, 0);
  rect(trator.x, trator.y, trator.size, trator.size);
  
  // Movimento do trator
  if (keyIsDown(LEFT_ARROW)) trator.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) trator.x += 5;
  if (keyIsDown(UP_ARROW)) trator.y -= 5;
  if (keyIsDown(DOWN_ARROW)) trator.y += 5;
  
  trator.x = constrain(trator.x, 0, width - trator.size);
  trator.y = constrain(trator.y, 0, height - trator.size);
  
  // Mostrar plantações
  fill(0, 200, 0);
  for (let i = 0; i < plantações.length; i++) {
    ellipse(plantações[i].x, plantações[i].y, 30, 30);
    if (dist(trator.x, trator.y, plantações[i].x, plantações[i].y) < 30) {
      pontos += 10;
      colhidas++;
      combustivel -= 2;
      plantações[i] = createVector(random(width), random(height-200));
    }
  }
  
  // Mostrar obstáculos
  fill(100);
  for (let i = 0; i < obstaculos.length; i++) {
    rect(obstaculos[i].x, obstaculos[i].y, 30, 30);
    if (dist(trator.x, trator.y, obstaculos[i].x, obstaculos[i].y) < 30) {
      pontos -= 5;
      combustivel -= 5;
      obstaculos[i] = createVector(random(width), random(height-200));
    }
  }
  
  // HUD
  fill(0);
  textSize(18);
  text("Pontos: " + pontos, 10, 20);
  text("Colhidas: " + colhidas, 10, 40);
  text("Combustível: " + combustivel, 10, 60);
  text("Tempo: " + int(tempo), 10, 80);
  
  // Contagem regressiva
  if (frameCount % 60 == 0 && tempo > 0) {
    tempo--;
    combustivel -= 1; // consome combustível com o tempo
  }
  
  // Condições de fim
  if (tempo <= 0 || combustivel <= 0) {
    gameOver();
  }
}

function gameOver() {
  background(0);
  fill(255);
  textSize(40);
  text("GAME OVER!", width/2 - 120, height/2);
  textSize(20);
  text("Colheitas: " + colhidas + " | Pontos: " + pontos, width/2 - 120, height/2 + 40);
  noLoop();
}
