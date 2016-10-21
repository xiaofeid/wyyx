$(function () {
	var userName=window.location.search.replace("?","");
	if(userName){
		$(".user_cont input").val(userName)
	}
	function login(userID,passWord){
		$.ajax({
			url: 'http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+userID+'&password='+passWord,
			type: 'POST',
		}).done(function(data){
			console.log("data="+data)
			if(data==0){
				$(".warn").css("display","block");
				$(".warn").html("用户名不存在");
				return false;
			}
			else if(data==2){
				$(".warn").css("display","block");
				$(".warn").html("用户名密码不符");
				return false;
			}
			else{
				var data=$.parseJSON(data);
				window.location="index.html";
				//var d=new Date();
				$.cookie("username",data.userID);
				
			}
		})
		
	}
	
	$(".btn_login").click(function(){
		var userID=$(".user_cont input").val();
		var passWord=$(".pass_cont input").val();
		login(userID,passWord);
		return false;
	})




	$(".inputbox input").keydown(function(){
		$(this).siblings("span").css("visibility","visible")
	})
	$(".cancel").click(function(){
			$(this).parent().children("input").val("");
			$(this).css("visibility","hidden");
			$(".warn").css("display","none");
		})
});