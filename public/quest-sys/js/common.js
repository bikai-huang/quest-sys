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