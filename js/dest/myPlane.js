"use strict";var myPlane={ele:null,fireInterval:300,init:function(){return this.ele=document.createElement("div"),gameEngine.ele.appendChild(this.ele),this.ele.className="myplane",this.ele.style.left=(gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px",this.ele.style.top=gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px",this},fire:function(){this.timer=setInterval(function(){(new Bullet).init().move()},this.fireInterval)},move:function(){this.ele.onmousedown=function(e){var t=(e=e||event).offsetX,n=e.offsetY;document.onmousemove=function(e){var i=(e=e||event).pageX-t-gameEngine.ele.offsetLeft;i<0&&(i=0),i>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth&&(i=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth),myPlane.ele.style.left=i+"px",myPlane.ele.style.top=e.pageY-n+"px"},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}}},boom:function(e){clearInterval(this.timer);var t=["images2/me_die1.png","images2/me_die2.png","images2/me_die3.png","images2/me_die4.png"],n=0,i=setInterval(function(){n>=t.length?(clearInterval(i),gameEngine.ele.removeChild(myPlane.ele),e()):myPlane.ele.style.backgroundImage="url("+t[n++]+")"},100)}};









