//敌机

class Enemy extends Base {
	constructor(type) {
		super();
		//属性
		this.ele = null;
		this.hp = 1; //血量
		this.speed = 10; //速度
		this.dieImgs = []; //爆炸时的图片数组
		this.score = 10; //分数
		this.type = type;
	}


	//方法
	init() {

		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);

		//将当前敌机对象加入到数组
		gameEngine.allEnemys.push(this);

		switch (this.type) {
			//大型飞机
			case this.Enemy_Type_Large:
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_Hp_Large;
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
				this.score = 30;
				break;

				//中型飞机
			case this.Enemy_Type_Middle:
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_Hp_Middle;
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
				this.score = 20;
				break;

				//小型飞机
			case this.Enemy_Type_Small:
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
				this.score = 10;
				break;

				//其他
			default:
				alert("没有这种敌机");
		}

		//位置
		this.ele.style.left = parseInt(Math.random() * (gameEngine.ele.offsetWidth - this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";

		return this;
	}

	//移动
	move() {

		let that = this;
		this.timer = setInterval(function () {

			if (that.ele.offsetTop > gameEngine.ele.offsetHeight) {
				clearInterval(this.timer);
				gameEngine.ele.removeChild(that.ele);

				//将当前敌机从数组gameEngine.allEnemys中移除
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(that), 1);
			} else {
				that.ele.style.top = that.ele.offsetTop + that.speed + "px";
			}
		}, 30);
	}

	//受伤
	hurt() {
		this.hp--;

		if (this.hp == 0) {
			this.boom();

			gameEngine.totalScore += this.score;
			//console.log("分数： " + gameEngine.totalScore);
		}
	}

	//爆炸
	boom() {
		//停止移动
		clearInterval(this.timer);

		//动画
		let that = this;
		let i = 0;
		let dieTimer = setInterval(function () {
			if (i >= that.dieImgs.length) {
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(that.ele);

				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(that), 1);

			} else {
				that.ele.style.backgroundImage = "url(" + that.dieImgs[i++] + ")";
			}
		}, 100);

	}
}



//原型
Enemy.prototype.Enemy_Type_Large = 1; //类型
Enemy.prototype.Enemy_Type_Middle = 2;
Enemy.prototype.Enemy_Type_Small = 3;

Enemy.prototype.Enemy_Speed_Large = 2; //速度
Enemy.prototype.Enemy_Speed_Middle = 4;
Enemy.prototype.Enemy_Speed_Small = 6;

Enemy.prototype.Enemy_Hp_Large = 6; //血量
Enemy.prototype.Enemy_Hp_Middle = 3;
Enemy.prototype.Enemy_Hp_Small = 1;