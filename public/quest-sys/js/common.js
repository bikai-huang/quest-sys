var host = 'https://college-quest-sys-minzuxiwang.c9users.io';

var token = localStorage.getItem('token');

function logout() {
	localStorage.setItem('token', '');
	localStorage.setItem('roleType', '');
	
	location.href='login.html';
}

function getvl(name) {
	var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');
	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, ' '));
	return '';
}


function getHeaderHtml() {
	$.ajax({
		type: 'GET',
		dataType: 'text',
		url: 'header.html',
		success: function(res){
			var dom = $.parseHTML(res);
			var roleType = localStorage.getItem('roleType');
			var login = localStorage.getItem('login');
			if(roleType <= 1) {
				var html = '<a class="user-name" href="user-list.html"><i class="icon questions-icon"><em></em></i><span>用户管理</span></a>';
				$(dom).find('#funMenu').append(html);
				$(dom).find('#ctl01_lblUserName').html(login);
			}
			$('#BS').empty();
			$('#BS').append(dom);
		},
		error: function(){
			console.log('网页抓取失败');
		}
	});
}

//动态创建一个loading弹出层
function setLoadingPage(){
	 var Odiv=document.createElement("div");             //创建一个div
   var Oimg=document.createElement("img");         //创建一个img
   Odiv.style.cssText="position:fixed;top:0;right:0;bottom:0;left:0;background-color:rgba(230,233,235,0.8)!important;filter:Alpha(opacity=50);";    //创建div的css样式
   Odiv.id="box";                            //创建div的id为box
   Odiv.className="Box"; //div的class为Box
   Oimg.src="./css/img/loading.gif"
   Oimg.style.cssText="display:block;margin:0 auto;margin-top:300px;background:rgba(0,0,0,0.8)!important;filter:Alpha(opacity=80);;";
   Odiv.appendChild(Oimg);       //在div内创建一个img
   document.body.appendChild(Odiv); 

        //在body内创建一个div 
}
//删除加载样式
function removeLoading(){
	var box=document.getElementById("#box");
	box.style.display="none";
}