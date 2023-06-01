//定義一個bullet物件的class

class Bullet{
  constructor(args){
    this.r = this.r || 20 
    this.p = args.p || shipP.copy()   //createVector(width/2,height/2)
    this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
    this.color = args.color || "#fb8b24"
  }
  draw(){
    push()
    translate(this.p.x,this.p.y)
    fill(this.color)
    noStroke()
    // 設定寶特瓶的顏色
    fill(0, 128, 255);

    // 畫出寶特瓶的主體
    beginShape();
    vertex(80, 50);
    vertex(90, 40);
    vertex(110, 40);
    vertex(120, 50);
    vertex(120, 100);
    vertex(110, 110);
    vertex(90, 110);
    vertex(80, 100);
    endShape();

    // 畫出寶特瓶的蓋子
    fill(255);
    beginShape();
    vertex(80, 50);
    vertex(90, 40);
    vertex(110, 40);
    vertex(120, 50);
    vertex(110, 60);
    vertex(90, 60);
    vertex(80, 50);
    endShape(CLOSE);
    pop()
  }
  
  update(){ //計算出移動後的位置
    this.p.add(this.v)
  }

}