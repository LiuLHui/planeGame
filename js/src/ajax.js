

//创建xhr对象
function createXHR(){
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	return new ActiveXObject("Microsoft.XMLHTTP");
}

//封装ajax
function ajax(obj){
	
	//默认参数
	obj.type = obj.type || "get";
	obj.async = obj.async==undefined ? true : obj.async;
	
	//1, 创建xhr对象
	var xhr = createXHR();
	
	//2, open
	var paramStr = getParamStr(obj.data);
	
	if (obj.type.toLowerCase() == "get") {
		obj.url += paramStr.length==0 ? "" : ("?" + paramStr);
	}
	xhr.open(obj.type, obj.url, obj.async);
	
	//3, send
	if (obj.type.toLowerCase() == "get") {
		xhr.send(null);
	}
	else if (obj.type.toLowerCase() == "post"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(paramStr);
	}
	
	//4, 接收数据
	if (obj.async) {
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				cb();
			}
		}
	}
	else {
		cb();
	}
	
	function cb() {
		//请求成功
		if (xhr.status == 200) {
			obj.success(xhr.responseText); //成功后回调
		}
		//请求失败
		else {
			obj.error(xhr.status); //失败后回调
		}
	}
}

//将参数变成字符串 {regname:"zhagnsan", pwd:123} => "regname=zhangsan&pwd=123"
function getParamStr(obj){
	var arr = [];
	for (var key in obj) {
		var str = key + "=" + obj[key];
		arr.push(str);
	}
	return arr.join("&");
}

/*
 ajax({
	type: "get", 
	url: "http://60.205.181.47/myPHPCode2/checkname.php",
	data: {regname:"zhagnsan", pwd:123},
	async: true,
	
	success: function() {
		console.log("success");
	},
	error: function(){
		console.log("error");
	}
});
*/
