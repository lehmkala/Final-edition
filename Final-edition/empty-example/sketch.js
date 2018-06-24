var aviao1 = {//aviao principal
    x:220,
    y:450    
};
var aviao2 = {//primeiro aviao inimigo 
    x:40,
    y:50    
};

//declarando variaveis necessaria para a animação do tiro do aviao principal
var anima; 
var imgsAndando = [];
var contFrame = 0; 
//declarando variaveis necessaria para a animação do tiro do aviao secundario
var animatiroinimigo; 
var imgsAndando2 = [];
//declarando variaveis necessaria para a animação da explosão
var imgsAndando3 = [];
//segundo aviao inimigo
var seginimigo;
var seginianima=[];
//terceiro aviao inimigo
var teginimigo;
var teginianima=[];

var percurso=1;
//declaração das variaveis necessarias para o movimento do coração
var vx = []; 
var vy = [];
var vdx = []
var vdy = []
var qt = 2;
//declaração das variaveis necessarias para o movimento do coração
var vxx = []; 
var vyy = [];
var vdxx = []
var vdyy = []
var booleancaveira=[true,true,true,true,true];
var qtt = 5; 

var framecountt=0;//contador auxiliar para ajudar na animação da explosão


var timex=-40,timey=-30,tempoparado=true,itemtimerespawn=0,itemtempoduracao=0;//variaveis do item 'tempo'//(itemtimecounter)medidor de tempo para spawn do item 'tempo'//(itemtempoduracao) é quem conta os 8 segundos de duração

var velocidadebalainimiga=9,inimigovelocidadey=4,inimigovelocidadex=4,balax,balay;//variaveis a respeito do inimigo

var la=aviao1.x,lu=aviao1.y,speed=6;//variaveis do tiro do avião principal

var img,img2,img3,imgfundo,img0;//declaração das variaveis das imagens

var scoredown,score,score1,score2,auxiliar,scorevida=3;//declaração das imagens da interface grafica ingame//score's e auxiliar ajudando no hp

var menu=true,scorestatus=true,estadobala=true,ndead=true,menuini,dificuldade=3,menucounter=1,estado=false,w=0,r=0,q=0,score,h=40,j=500;

var level=0;

var pontos=0,limite=0;

var counter=0,counter2=0,counter3=0,counter4=0;// declaração de variaveis do relogio

var ini0,ini1,ini2,ini3,z=-100;//declaração das variaveis das imagens da animação do avião principal
/*
speed é a velocidade com que o avião se move
counter são as variaveis que formam o relogio
timex e timey são as coordenadas do item 'tempo'
tempoparado=true é uma variavel booleana utilizada para entrar e sair no 'espaço temporal'

*/


function preload() {
    
    for (i = 0; i < 4; i++) {//carregando animações do tiro do avião principal
    imgsAndando[i] =loadImage("bala"+i+".png");
    }
    
     for (i = 0; i < 4; i++) {//carregando animações do tiro do avião inimigo
    imgsAndando2[i] =loadImage("bala2"+i+".png");
    }
    
    for (i = 0; i < 5; i++) {//carregando animações do tiro do avião inimigo
    imgsAndando3[i] =loadImage("explodir"+i+".png");
    }
     
    for (i = 0; i < 4; i++) {//carregando animações do tiro do avião inimigo
    seginianima[i] =loadImage("sinimigo"+i+".png");
    }
    
    for (i = 0; i < 4; i++) {//carregando animações do tiro do avião inimigo
    teginianima[i] =loadImage("tinimigo"+i+".png");
    }
    
    
    img = loadImage('https://i.imgur.com/UgyM7W1.png');
    imgfundo= loadImage('https://i.imgur.com/W3l1HDU.png');
    img2= loadImage('https://i.imgur.com/ByZpJpk.png');
    img3= loadImage('https://i.imgur.com/T4zwKeM.png');
    img4= loadImage('https://i.imgur.com/eyhTvHD.png');
    img5= loadImage('https://i.imgur.com/UAQ5DlR.png');
    ini1= loadImage('https://i.imgur.com/pECNfhS.png');
    ini2= loadImage('https://i.imgur.com/oJzXHL5.png');
    ini3= loadImage('https://i.imgur.com/58J4hXH.png');
    score= loadImage('https://i.imgur.com/lS6P7WN.png');
    auxiliar=score;
    score2= loadImage('https://i.imgur.com/Z66rHvQ.png');
    score1= loadImage('https://i.imgur.com/rCiSSKV.png');
    scoredown= loadImage('https://i.imgur.com/eeNXg76.png');
    menu1= loadImage('mainmenu.png');
    gameoverimg=loadImage('https://image.ibb.co/fHTWX8/gameover.png');
    zerou=loadImage('https://i.imgur.com/z02IUDe.jpg');
    kokoro= loadImage('https://i.imgur.com/wCUZkj7.png');
    caveira= loadImage('https://i.imgur.com/uN1mDO6.png');
    time=loadImage('stoptime.png');

}



function setup() {
    
   frameRate(42); 
    createCanvas(650,650);
    
  
    function timeIt(){//Função que quando chamada incrementa em um
        counter++;
    }
    setInterval(timeIt,1000);//define intervalo de 1 seg
      
      for (var i = 0; i < qt; i++) { //
    vx[i] = random(0,150); 
    vy[i] = random(0,150);
    
    vdx[i] = random(1,3);
    vdy[i] = random(1,3);
    
  }
    
    for (var i = 0; i < qtt; i++) { 
    vxx[i] = random(0,150); 
    vyy[i] = random(0,150);
    
    vdxx[i] = random(1,3);
    vdyy[i] = random(1,3);
    
  }
}

function draw() {
  
	if(level>5){//se level superior a 5 exibir imagem que zerou
        image(zerou,24,0);
    }else if(menu){//se menu true exibir imagem do menu, caso contrario exibir jogo em curso
        if(scorevida<1){
            menuini=gameoverimg;
        }else {
            menuini=menu1;
        }
           
        image(menuini,0,0);
        
    }else{
        if(scorevida<1){scorevida=3;score=auxiliar;}
    background(0);
    
    z=z+100;//contador para animar avião
    fill(255);
  
  if(keyIsDown(16)){//enquanto pressionar tecla SHIFT aumenta velocidade do avião
              speed=22;
    
  }else{
      speed=10;
  }
        
  if (keyIsDown(LEFT_ARROW)) {
    aviao1.x -= speed;
    w+=60000;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    aviao1.x += speed;
    w++;
  }
    if (keyIsDown(UP_ARROW)) {
    aviao1.y -= speed;
    r+=6000;
  }
    if (keyIsDown(DOWN_ARROW)) {
    aviao1.y += speed;q++;
    
  }
         
  teclaPraBaixo();
               
        image(time,150,300);
        
        
  anima = imgsAndando[contFrame];
  image( anima, 150, 150);
 
  if ( contFrame > 3 ) {
     contFrame = 0;  
  }
        
          animatiroinimigo = imgsAndando2[contFrame];
  contFrame++;
  if ( contFrame > 3 ) {
     contFrame = 0;  
  }
        
  seginimigo = seginianima[contFrame];
   if ( contFrame > 3 ) {
     contFrame = 0;  
         }    
        
        teginimigo = teginianima[contFrame];
   if ( contFrame > 3 ) {
     contFrame = 0;  
         }   
        
  if(aviao1.x>=545){aviao1.x-=speed;}//delimitando o campo direito do jogo
  if(aviao1.x<-37){aviao1.x+=speed;}//delimitando o campo esquerdo do jogo
  if(aviao1.y>510){aviao1.y-=speed;}//delimitando o campo inferior do jogo
  if(aviao1.y<2){aviao1.y+=speed;}//delimitando o campo superior do jogo
    
    z++;
  if(z<-500){//animaçao do aviao
    img0=img;ini0=ini1;}else if(z>-500&&z<200){img0=img2;ini0=ini2;}else if(z>200&&z<900){img0=img3;ini0=ini3;z=-1000}
	 
  image(imgfundo,0,0);//background
  image(img0, aviao1.x, aviao1.y);//aviao principal
    if(percurso==1){
        image(ini0,aviao2.x,aviao2.y);//primeiro aviao inimigo
    }else if(percurso==2){
        image(seginimigo,aviao2.x,aviao2.y);
    }else if(percurso==3){
        image(teginimigo,aviao2.x,aviao2.y);
    }
  for (var i = 0; i < qt; i++) {//dentro do for para testar todos corações//for para mover e exibir os corações
    
    vx[i] = vx[i] + vdx[i];
    vy[i] = vy[i] + vdy[i]; 
    image(kokoro,vx[i],vy[i]);
               
        if((dist(la,lu,vx[i],vy[i])<40)&&scorestatus==true){//se a bala acertar o coração e estatus for verdadeiro ganhe uma vida, ao ganhar fica falso, só voltando a ser positivo ao atirar de novo
            
            if(scorevida<3){
          
                scorevida+=1;
                scorestatus=false;
                
            }
            
        }
               if(scorevida==3){score=auxiliar}else if(scorevida==2){score=score2}else if(scorevida==1){score=score1}
               
          if(vx[i]>width&&counter>30){vx[i]=random(-250,-100);vy[i]=random(-950,100)}
           }
        
        for (var i = 0; i < qtt; i++) {
   
    vxx[i] = vxx[i] + vdxx[i];
    vyy[i] = vyy[i] + vdyy[i]; 
      image(caveira,vxx[i],vyy[i]);
        
        
               if(scorevida==1){
                   score=score1
               }
            
            
               if((dist(vxx[i]+10,vyy[i]+10,aviao1.x+55,aviao1.y+55)<40)&&booleancaveira[i]){//distancia da caveira para o avião
                   scorevida-=1;
                   booleancaveira[i]=false;
               }
          if(vxx[i]>width){
              vxx[i]=random(-250,-100);vyy[i]=random(-950,100)
              booleancaveira[i]=true;
          }
            line(vxx[i]+10,vyy[i]+10,aviao1.x+55,aviao1.y+55);
           }
  
  if((aviao2.x>-139&&aviao2.x<700)&&ndead==true){
      if(percurso==1){
          aviao2.x+=inimigovelocidadex;aviao2.y+=inimigovelocidadey;
      }else{
          aviao2.x-=inimigovelocidadex;aviao2.y+=inimigovelocidadey;
      }
      }else{
      aviao2.x=random(-200,650);aviao2.y=random(-250,-80);ndead=true;
      if(aviao2.x<250){
          percurso=1;
         }else if(aviao2.x>250&&aviao2.x<500){
             percurso=2;
         }else if(aviao2.x>500){
             percurso=3;
         }
  }//se inimigo nao tiver sido atingido ou ainda estiver dentro da tela movimente senão de respawn em origem randomica
 	
        if((dist(la,lu,aviao2.x+70,aviao2.y+60)<40)){
    ndead=false;lu-=1000,pontos+=50;var explocount=0;}//se tiver colisao da bala do aviao com inimigo set status de vivo para falso, dessa forma ele liga o respawn
       
       if(explocount===0){
           while(framecountt<5){image(imgsAndando3[framecountt],aviao2.x,aviao2.y);framecountt++};
           framecountt=0;
           explocount=1;
       } nu=dist(balax,balay,aviao1.x+70,aviao1.y+60);
        na=dist(aviao1.x,aviao1.y,aviao2.x,aviao2.y);
       
        if(nu<40||na<40){
    aviao1.x+=1000;scorevida--;if(na<40){aviao2.y+=1000;}}
        
        stroke(255, 204, 0,59);
       
         dtempo=dist(aviao1.x+55,aviao1.y+55,timex+5,timey+5);
        if(dtempo<40){inimigovelocidadex=1;inimigovelocidadey=1;velocidadebalainimiga=2;tempoparado=false;}
        if(tempoparado==false){itemtempoduracao++;}
        if(itemtempoduracao>250){tempoparado=true;itemtempoduracao=0}
        line(aviao1.x+70,aviao1.y+65,aviao2.x+70,aviao2.y+65);
        
        if(aviao2.y>-10&&estadobala){
        balax=aviao2.x+95;
        balay=aviao2.y+95;
        }
        if(estadobala&&aviao2.y>-10){//qd aviao estiver na tela e o estado false atira, qd sai da tela estado fica true ele pega novas coordenadas e seta o estado para falso para atirar de novo.
             
            
            estadobala=false;
        }else{
            fill(14,147,15);
             image(animatiroinimigo,balax,balay);
           
            balay+=velocidadebalainimiga;
            if(balay>650){estadobala=true;}
           
        }
        
        //ITEM PARAR TEMPO
        itemtimerespawn++;
        image(time,timex,timey);
            timex+=7;
            if(timex<300){timey+=5;}else{timey-=5;}
        if(itemtimerespawn>500){timex=-20;timey=-30;itemtimerespawn=0}
        ///
        
        fill(255);
 
    /*if(bala.y<30){bala.y=aviao1.y+40;bala.x=aviao1.x+45;value=0;}*///quando a bala sair da tela, disparar nova bala(problema=1 bala de vez)   
   
        
    textSize(8);
    text('( '+aviao1.x+', '+aviao1.y+' )',aviao1.x+85,aviao1.y+100);//coordenadas
        
        if(scorevida==2){score=score2}else if(scorevida==1){score=score1}//diminui graficamente a vida
          image(score,0,0);//interface grafica ingame superior
          image(scoredown,0,0);//interface grafica ingame inferior
          textSize(20);
    
         if(counter<10&&counter4<1000){
             
            text(counter3+""+counter2+":"+"0"+counter,147,643);//relogio 0 a 9 segundos
            counter4++;    
             
         }else{ 
             text(counter3+""+counter2+":"+counter,147,643);//relogio 10 a ...
         }
          
    if(counter>59){
        counter2++;
        counter=0;
    }
    if(counter2>9){
        counter2=0;
        counter3++;
    }
        
        
        
       //ellipse(bala.x,bala.y,5,15);
      //  bala.y+=6;
       /// if(bala.y>650){bala.y=aviao2.y+70;bala.x=aviao2.x+35}
        if(pontos>limite+100){level++;limite=limite+240}
        
        
    
     text(level,334,643);//speed
     text(pontos,528,643);//power
   
     if(lu<50){//só permite desenhar nova bala depois q sai tela ou acerta alvo
            estado=false;
        }
     
     if(estado){//desenha bala se true
		  /*
           ellipse(la,lu,5,15);
           */
           
           image(anima,la,lu);
           
		lu-=10;
		}
    }
    
      if(tempoparado){
    levelf();
      }
    gameover();
    
}
    

function teclaPraBaixo(){//aperta espaço para atirar
    if(!estado){

		if(keyIsDown(32)){
		estado=true;
        scorestatus=true;//fica true qd aperta espaço para só ganhar uma vida por acerto no coração
		la=aviao1.x+35;
		lu=aviao1.y+30;
		}
}
}
    
function keyPressed() {//aperta enter para  menu
  if (keyCode === 13) {
    if(menucounter==1){menu=!menu;}
      if(scorevida<1){scorevida=3;menucounter=1;score=auxiliar;}
  }
    
}

function gameover(){//contantemente checando sua vida para saber se é gameover
    if(scorevida<1){
        menu=true;
    }
}
 
function levelf(){//checando o level para ajudar dificuldade
    if(level==0){
         inimigovelocidadex=3;inimigovelocidadey=3;velocidadebalainimiga=9;
    }
    if(level==1){
        inimigovelocidadex=4;inimigovelocidadey=4;velocidadebalainimiga=12;
    }else if(level==2){
        inimigovelocidadex=5;inimigovelocidadey=5;velocidadebalainimiga=14;
    }else if(level==3){
        inimigovelocidadex=6;inimigovelocidadey=6;
        qt=2;
        velocidadebalainimiga=19;
    }else if(level==4){
        inimigovelocidadex=7;inimigovelocidadey=7;
        velocidadebalainimiga=29;
    }else if(level==5){
        inimigovelocidadex=8;inimigovelocidadey=8;
        qt=3; velocidadebalainimiga=34;
    }
}