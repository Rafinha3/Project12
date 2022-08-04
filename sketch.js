var coelho, coelhoImg, jardim, jardimImg, bordas;
var score = 0;
var cenoura, cenouraImg, red, redImg;
var grupoRed;
var grupoCenoura;
var grupoFolha;

function preload(){
    jardimImg = loadImage("garden.png");
    coelhoImg = loadImage("coelho.png");
    cenouraImg = loadImage("carrot.png");
    redImg = loadImage("redImage.png");
    folhaImg = loadImage("leaf.png");
}

function setup(){
    createCanvas(400, 400);
    jardim = createSprite(200, 200);
    jardim.addImage(jardimImg);
    coelho = createSprite(200, 300)
    coelho.addImage(coelhoImg)
    coelho.scale = 0.1
    bordas = createEdgeSprites();
    grupoRed = new Group();
    grupoCenoura = new Group();
    grupoFolha = new Group();
}

function gerarCenoura(){
    cenoura = createSprite(random(50, 350),0, 10, 10);
    cenoura.addImage(cenouraImg);
    cenoura.scale = 0.07;
    cenoura.velocityY = 3;
    cenoura.lifetime = 150;
    grupoCenoura.add(cenoura);
}

function gerarRed(){
    red = createSprite(random(50, 350),0, 10, 10);
    red.addImage(redImg);
    red.scale = 0.07;
    red.velocityY = 3;
    red.lifetime = 150;
    grupoRed.add(red);
}

function gerarFolha(){
    folha = createSprite(random(50, 350),0, 10, 10);
    folha.addImage(folhaImg);
    folha.scale = 0.07;
    folha.velocityY = 3;
    folha.lifetime = 150;
    grupoFolha.add(folha);
} 

function draw(){
    background("blue");
    coelho.x = mouseX;
    coelho.collide(bordas);
    var sorteio = Math.round(random(1, 3));
    if(frameCount % 80 == 0){
        if(sorteio == 1){
            gerarCenoura();
        }else if(sorteio == 2){
            gerarFolha();
        }else{
            gerarRed();
        }
    }
    if(coelho.isTouching(grupoRed)){
        coelho.scale -= 0.01;
        score -= 1;
        red.destroy();
    }
    if(coelho.isTouching(grupoCenoura)){
        coelho.scale += 0.01;
        score += 1;
        cenoura.destroy();
    }
    if(coelho.isTouching(grupoFolha)){
        coelho.scale += 0.01;
        score += 0.5;
        folha.destroy();
    }
    drawSprites();
    fill("white");
    text("Score: " + score, 180, 30);
}