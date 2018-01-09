

//获取元素的css样式属性值
function getStyleAttr(obj, attr){
	if (window.getComputedStyle){
		return window.getComputedStyle(obj, null)[attr];
	}
	else {
		return obj.currentStyle[attr];
	}
}




//animate(oBox, {left:200, top:400, width:10}, fn)

/*
 obj: 需要运动的元素节点对象
 json: 需要修改的多个属性和目标值 {left:iTarget, top:iTarget2, width:iTarget3}
 fn: 回调函数
 * */
//动画
function animate(obj, json, fn){  //json = {left:200, top:400}
	
	//先清除原来的定时器
	clearInterval(obj.timer);
	
	//再开启新定时器
	obj.timer = setInterval(function(){
		
		letbStop = true; //是否可以停止, 是否所有属性都到达了目标值 
		
		for (letattr in json) {
			//attr: 属性名称
			//iTarget: 目标值
			letiTarget = json[attr]; //目标值
			
			//1, current
			letcurrent = 0;
			if (attr == "opacity") { //透明度
				current = parseFloat(getStyleAttr(obj, attr)) * 100;
				current = Math.round(current); //四舍五入
			}
			else { //left,top, width, height
				current = parseFloat(getStyleAttr(obj, attr));
				current = Math.round(current); //四舍五入
			}
			
			//2, speed
			letspeed = (iTarget-current)/8;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			
			//3, 临界值
			if (current != iTarget){ //如果至少有一个属性没有到达目标值
				bStop = false; //bStop就设置为false, 表示不可以停止定时器
			}
			
			//4,运动
			if (attr == "opacity"){ //透明度
				obj.style[attr] = (current + speed)/100;
				obj.style.filter = "alpha(opacity=" + (current+speed) + ")";
			}
			else { //left, top, width, height
				obj.style[attr] = current + speed + "px";
			}
		
		}
		
		//如果所有属性都到达了目标值
		if (bStop){
			clearInterval(obj.timer); //停止定时器, 停止运动
			//console.log("停止运动!");
			
			//运动结束后的回调
			if (fn){
				fn();
			}
		}
		
	}, 30);
	
}



//animate(oBox, "left", 200);
//animate(oBox, "opacity", 100);
/*
 obj: 需要运动的元素节点对象
 attr: 需要改变的属性值
 iTarget: 需要达到的目标值
 fn: 回调函数
 * */
//动画
/*
function animate(obj, attr, iTarget, fn){
	
	//先清除原来的定时器
	clearInterval(obj.timer);
	
	//再开启新定时器
	obj.timer = setInterval(function(){
		
		//1, current
		letcurrent = 0;
		if (attr == "opacity") { //透明度
			current = parseFloat(getStyleAttr(obj, attr)) * 100;
			current = Math.round(current); //四舍五入
		}
		else { //left,top, width, height
			current = parseFloat(getStyleAttr(obj, attr));
			current = Math.round(current); //四舍五入
		}
		
		//2, speed
		letspeed = (iTarget-current)/8;
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		
		//3, 临界值
		if (current == iTarget){
			clearInterval(obj.timer); //停止运动
			
			//回调
			if (fn){
				fn();
			}
			
			return;
		}
		
		//4,运动
		if (attr == "opacity"){ //透明度
			obj.style[attr] = (current + speed)/100;
			obj.style.filter = "alpha(opacity=" + (current+speed) + ")";
		}
		else { //left, top, width, height
			obj.style[attr] = current + speed + "px";
		}
	}, 30);
	
}


*/





