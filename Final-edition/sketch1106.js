var aviao1 = {//aviao principal
    x:220,
    y:450    
};
var aviao2 = {//primeiro aviao inimigo 
    x:40,
    y:50    
};
var aviao3 = {//primeiro aviao inimigo 
    x:0,
    y:50    
};
var aviao4 = {//primeiro aviao inimigo 
    x:-40,
    y:50    
};
var bala = {
    x:aviao2.x+45,
    y:aviao2.y+40
};

var drop;

var img,img2,vida=3,song,auxiliar,menu=true,level=0,pontos=0,limite=0,scorevida=3,estadobala=true,ndead=true,menuini,dificuldade=3,inimigovelocidadex=4,balax,balay,inimigovelocidadey=4,menucounter=1,img3,img4,img5,imgat,imgfundo,ini0,ini1,estado=false,la=aviao1.x,lu=aviao1.y,ini2,ini3,z=-1000,img0,baner,w=0,r=0,q=0,score,scoredown,song,value=0,speed=6,counter=0,counter2=0,counter3=0,h=40,j=500,counter4=0;

function preload() {
    
    img = loadImage('https://i.imgur.com/UgyM7W1.png');
    imgat= loadImage('https://i.imgur.com/5pXKgxO.png');
    imgfundo= loadImage('https://i.imgur.com/W3l1HDU.png');
    img2= loadImage('https://i.imgur.com/ByZpJpk.png');
    img3= loadImage('https://i.imgur.com/T4zwKeM.png');
    img4= loadImage('https://i.imgur.com/eyhTvHD.png');
    img5= loadImage('https://i.imgur.com/UAQ5DlR.png');
    ini1= loadImage('https://i.imgur.com/pECNfhS.png');
    ini2= loadImage('https://i.imgur.com/oJzXHL5.png');
    ini3= loadImage('https://i.imgur.com/58J4hXH.png');
    //score= loadImage('https://i.imgur.com/iL4mwNK.png');
    score= loadImage('https://i.imgur.com/lS6P7WN.png');
    auxiliar=score;
    score2= loadImage('https://i.imgur.com/Z66rHvQ.png');
    score1= loadImage('https://i.imgur.com/rCiSSKV.png');
    scoredown= loadImage('https://i.imgur.com/oHsSO2F.png');
    //baner= loadImage('https://i.imgur.com/QI4ORyz.png');
    //song=loadSound('space.mp3');
    menu1= loadImage('https://i.imgur.com/DZwlR9T.png');
    menu2= loadImage('https://i.imgur.com/q9mzYwG.png');
    menu3= loadImage('https://i.imgur.com/Vrjdgd0.png');
    menu4= loadImage('https://i.imgur.com/WCMqkte.png');
    gameoverimg=loadImage('https://i.imgur.com/Pj9Q6kK.png');
    zerou=loadImage('https://i.imgur.com/z02IUDe.jpg');
   // song= loadSound('som/sound.mp3');

}



function setup() {
    createCanvas(650,650);
    //song.play();
  
    function timeIt(){
        counter++;
    }
    setInterval(timeIt,1000);
      
     
}

function draw() {
	if(level>1){image(zerou,24,0);}else
    if(menu){
        if(scorevida<1){menuini=gameoverimg}else
        if(menucounter==1){menuini=menu1}else if(menucounter==2){menuini=menu2}else if(menucounter==3){menuini=menu3}else if(menucounter==4){menuini=menu4}//else
           
        image(menuini,0,0);
         if (keyIsDown(UP_ARROW)) {
            if(menucounter==2||menucounter==4){
              menucounter--;}
  }
         if (keyIsDown(DOWN_ARROW)) {
            if(menucounter==1||menucounter==3){
              menucounter++;}
    
  }
        
    }else{
        if(scorevida<1){scorevida=3;score=auxiliar;}
    background(0);
    
    z=z+100;//contador para animar avião
    fill(255);
  
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
        
  if(aviao1.x>=545){aviao1.x-=speed;}//delimitando o campo direito do jogo
  if(aviao1.x<-37){aviao1.x+=speed;}//delimitando o campo esquerdo do jogo
  if(aviao1.y>510){aviao1.y-=speed;}//delimitando o campo inferior do jogo
  if(aviao1.y<2){aviao1.y+=speed;}//delimitando o campo superior do jogo
    
    z++;
  if(z<-500){//animaçao do aviao
    img0=img;ini0=ini1;}else if(z>-500&&z<200){img0=img2;ini0=ini2;}else if(z>200&&z<900){img0=img3;ini0=ini3;z=-1000}
  //song.play();
	
  image(imgfundo,0,0);//background
  image(img0, aviao1.x, aviao1.y);//aviao principal
  image(ini0,aviao2.x,aviao2.y);//primeiro aviao inimigo
        //image(ini0,aviao3.x,aviao3.y);
        //image(ini0,aviao4.x,aviao4.y);
  //segundo aviao image(ini0,u+95,t+35);
  //image(baner,0,0)
  
  if(aviao2.x<750&&ndead==true){aviao2.x+=inimigovelocidadex;aviao2.y+=inimigovelocidadey;}else{aviao2.x=random(-200);aviao2.y=random(-250);ndead=true;}//se inimigo nao tiver sido atingido ou ainda estiver dentro da tela movimente senão de respawn em origem randomica
 	
        if((dist(la,lu,aviao2.x+70,aviao2.y+60)<40)){
    ndead=false;lu-=1000,pontos+=50}//se tiver colisao da bala do aviao com inimigo set status de vivo para falso, dessa forma ele liga o respawn
       
       nu=dist(balax,balay,aviao1.x+70,aviao1.y+60);
        na=dist(aviao1.x,aviao1.y,aviao2.x,aviao2.y);
       
        if(nu<40||na<40){
    aviao1.x+=1000;scorevida--;if(na<40){aviao2.y+=1000;}}
        
        stroke(255, 204, 0,59);
        line(aviao1.x+70,aviao1.y+65,aviao2.x+70,aviao2.y+65);
        
        if(aviao2.y>-10&&estadobala){
        balax=aviao2.x+95;
        balay=aviao2.y+95;
        }
        if(estadobala&&aviao2.y>-10){//qd aviao estiver na tela e o estado false atira, qd sai da tela estado fica true ele pega novas coordenadas e seta o estado para falso para atirar de novo.
             
            
            estadobala=false;
        }else{
            fill(14,147,15);
             ellipse(balax,balay,10,10);
            balay+=15;
            if(balay>650){estadobala=true;}
           
        }
        fill(255);
 
   // if(value==1){
      // ellipse(bala.x,bala.y,15,15);//}///se alguma tecla for pressionada desenhar bala//erro só desenhar nao "cria"
    //bala.y-=6;
 
    if(bala.y<30){bala.y=aviao1.y+40;bala.x=aviao1.x+45;value=0;}//quando a bala sair da tela, disparar nova bala(problema=1 bala de vez)   
    // stroke(255,0,123);// line(cxb,g,u+70,t+60);//linha para vizualizar distancia da bala do alvo.

   
    
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
        if(pontos>limite+100){level++;limite=limite+100}
        
        
    
     text(level,334,643);//speed
     text(pontos,528,643);//power
   
        if(lu<50){//só permite desenhar nova bala depois q sai tela ou acerta alvo
            estado=false;
        }
       if(estado){//desenha bala se true
		
           ellipse(la,lu,5,15);
		lu-=10;
		}
    }
    gameover();
}
    

function teclaPraBaixo(){//aperta espaço para atirar
    if(!estado){

		if(keyIsDown(32)){
		estado=true;
		la=aviao1.x+35;
		lu=aviao1.y+30;
		}
}
}
    
function keyPressed() {//aperta enter para  menu
  if (keyCode === 13) {
    if(menucounter==1){menu=!menu;}else if(menucounter==2){menucounter=dificuldade;}else if(menucounter==3){menucounter=2;dificuldade=3;inimigovelocidadex=4;inimigovelocidadey=4;}else if(menucounter==4){menucounter=2;dificuldade=4;inimigovelocidadex=4;inimigovelocidadey=5;}else if(menucounter==5){menucounter=2;}
      if(scorevida<1){scorevida=3;menucounter=1;score=auxiliar;}
  }
}

function gameover(){
    if(scorevida<1){
        menu=true;
    }
}
 


/////////DUVIDAS////////////////////////////////////
 /*(1)Som não está carregando, bugando o jogo, pq?*/

/*bala[0]=ellipse(aviao1.x,aviao1.y+speed,20,20); tentativa de criar bala*/
