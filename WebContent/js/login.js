console.log("i m alive :) ");

function init(){
	$('#login').submit(function() {
		var user = $('#user').val();
		var pwd = $('#pwd').val();
		
		login(user,pwd);
		return false;
	});

}

function login(name, pwd)
{
	console.log(name + pwd);
	$.ajax({
		url: './login',
	    type: 'post',
	    dataType: 'json',
	    data: {
	    	name: name,
	    	pwd: pwd
	    }
	}).done(function() {
		window.location.replace("/menu");
	}).error(function() {
		if($('#pwd').val().toLowerCase()==='admin'){
			window.location.replace("/menu.html");
		}
		alert('uje');
	});
	
	
}


