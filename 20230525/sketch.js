let points = [[0, 2], [-2,2], [-4, 0],[-6,-2],[-4,-2],[-6,-4],[-4,-4],[-2,-2],[0,-2],[2,-4],[4,-4],[2,-2],[4,0],[6,0],[6,2],[4,2], [2,0], [0, 2],[-2,2]]; //list資料，
var fill_colors ="dad7cd-a3b18a-588157-3a5a40-344e41".split("-").map(a=>"#"+a)
var line_colors ="dad7cd-a3b18a-588157-3a5a40-344e41".split("-").map(a=>"#"+a)




var ball //目前要處理的物件，暫時放在ball變數內
var balls=[] //把產生的"所有"的物件

var bullet //目前要處理的物件，暫時放在ball變數內
var bullets=[] //把產生的"所有"的物件

var monster //目前要處理的物件，暫時放在ball變數內
var monsters=[] //把產生的"所有"的物件

var shipP

var score=0


function preload(){
  t_sound = loadSound("sound/y1211.wav")
  bullet_sound = loadSound("sound/11270.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)
  for(var i=0;i<10;i=i+1){ //i=0,1,2,3,4,.....,8,9
    ball=new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內 
 }
 for(var i=0;i<20;i=i+1){ //i=0,1,2,3,4,.....,8,9
    monster=new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內 
 }
}
function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball=balls[j]
  //   ball.draw()
  //   ball.update()
  //}
  if (monsters.length === 0) {
    textSize(50);
    text("遊戲結束", width/2-150, height/2);
    return;
  }
//砲台
  if(keyIsPressed){
  if(key=="ArrowLeft" || key=="a"){
    shipP.x = shipP.x -5
  }
  if(key=="ArrowRight" || key=="d"){
    shipP.x = shipP.x +5
  }
  if(key=="ArrowUp" || key=="w"){
    shipP.y = shipP.y -5  
  }
  if(key=="ArrowDown" || key=="s"){
    shipP.y = shipP.y +5
  }
}
  
//烏龜的顯示
for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
{
   ball.draw()
   ball.update()
   for(let bullet of bullets){
    if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
    {
      balls.splice(balls.indexOf(ball),1)
      bullets.splice(bullets.indexOf(bullet),1)
      score = score - 1
      t_sound.play()
      
    }
   }
 }

//飛彈的顯示
 for(let bullet of bullets) //只要是陣列的方式，都可以利用此方式處理
{
   bullet.draw()
   bullet.update()
 }

//怪物的顯示
 for(let monster of monsters) {  //只要是陣列的方式，都可以利用此方式處理
  if(monster.dead == true && monster.timenum>4){
  monsters.splice(monsters.indexOf(monster),1)
 }
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))
      {
        score = score + 1
        monsters.splice(monsters.indexOf(monster),1)
        monster.dead = true
        bullets.splice(bullets.indexOf(bullet),1)
        
        
        
      }
     }
   }
  

 textSize(50)
 text(score,50,50) //在座標為(50,50)上，顯示score分數內容
 push() //重新規劃原點(0,0)
 let dx = mouseX - width/2
 let dy = mouseY - height/2
 let angle = atan2(dy,dx)

 translate(shipP.x,shipP.y) 
 fill("#e36414")
 noStroke()
 rotate(angle)
// 畫出手掌
fill(255, 200, 200);
ellipse(100, 100, 80, 100);
// 畫出眼睛
fill(0);
ellipse(80, 80, 10, 20);
ellipse(120, 80, 10, 20);

// 畫出手指
fill(255, 200, 200);
beginShape();
vertex(80, 100);
vertex(60, 80);
vertex(40, 70);
vertex(30, 80);
vertex(45, 95);
vertex(60, 100);
endShape(CLOSE);
beginShape();
vertex(120, 100);
vertex(140, 80);
vertex(160, 70);
vertex(170, 80);
vertex(155, 95);
vertex(140, 100);
endShape(CLOSE);
// 畫出手腕
fill(255, 200, 200);
rect(70, 140, 60, 20);
 pop() //恢復原本設定，原點(0,0)在視窗的左上角

}

function mousePressed(){

  //+++++++++++產生一個物件
   ball=new Obj({
    p:{x:mouseX,y:mouseY}
   }) //在滑鼠按下的地方，產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內 (丟到倉庫)
  //+++++++++++++++++++++++++++++++

  //在物件上按下滑鼠，物件消失不見
  for(let ball of balls){ //檢查每一個物件
    if(ball.isBallInRanger(mouseX,mouseY)){
      balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編數(balls.indexOf(ball))，只取一個
      score=score+0
    }
  }
  bullet = new Bullet({})
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //放下空白建，發射飛彈
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  
}
}
