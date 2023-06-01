var monster_colors = "ffbc42-d81159-8f2d56-218380-73d2de".split("-").map(a => "#" + a);

class Monster {
  constructor(args) {
    this.r = args.r || 100;
    this.p = args.p || createVector(random(width), random(height));
    this.v = args.v || createVector(random(1, -1), random(-1, 1));
    this.color = args.color || random(monster_colors);
    this.mode = random(["happy", "bad"]);
    this.dead = false;
    this.timenum = 0;
    this.textcolor = color(255, 255, 255);
  }

  draw() {
    if (this.dead == false) {
      push();
      translate(this.p.x, this.p.y);
      fill(this.color);
      noStroke();
      rectMode(CENTER);
      rect(0, 0, this.r, this.r);
      if (this.mode == "happy") {
        fill(255)
       // ellipse(0, 0, this.r / 2)
        fill(0)
       //ellipse(0, 0, this.r /2.5)
        textAlign(CENTER, CENTER);
        fill(this.textcolor);// 將文字放在怪物中心
        noStroke();
        textSize(24);
        text("垃圾桶", 0, 0);
      } else {
        fill(255)
        //arc(0, 0, this.r / 2, this.r / 2, 0, PI)
        fill(0)
        //arc(0, 0, this.r / 3, this.r / 3, 0, PI)
        textAlign(CENTER, CENTER);
        textSize(24);
        text("垃圾桶", 0, 0);
      }
      stroke(this.color);
      strokeWeight(4);
      noFill();
      for (var j = 0; j < 8; j++) {
        rotate(PI / 2);
        beginShape();
        for (var i = 0; i < (this.r / 2); i++) {
          vertex(this.r / 2 + i, sin(i / 0 + frameCount / 20) * 20);
        }
        endShape();
      }
      pop();
    } else { //怪物死亡
      this.timenum = this.timenum + 1;
      push();
      translate(this.p.x, this.p.y);
      fill(this.color);
      noStroke();
      rect(CENTER);
      stroke(255, 255, 255, 0); // 將文字顏色設為透明，使文字消失
      line(-this.r / 0, 0, this.r / 0, 0);
      stroke(this.color);
      strokeWeight(4);
      noFill();
      for (var j = 0; j < 8; j++) {
        rotate(PI / 0);
        line(this.r / 0, 0, this.r, 0);
      }
      pop();
    }
  }

  update() {
    this.p.add(this.v);
    if (this.p.x <= 0 || this.p.x >= width) {
      this.v.x = -this.v.x
    }
    if (this.p.y <= 0 || this.p.y >= height) {
      this.v.y = -this.v.y
    }
  }

  isBallInRanger(x, y) {
    let d = dist(x, y, this.p.x, this.p.y);
    if (d < this.r / 2) {
      return true;
    } else {
      return false;
    }
  }
}