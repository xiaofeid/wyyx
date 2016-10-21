	$(function () {
		var re1=/^1[34578]\d{9}$/;
		var re2=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var re3=/^[a-zA-Z]\w{5,15}$/;
		var flag1=flag2=flag3=flag4=false;
		//用户名
		$(".username input").blur(function(){	
			var username=$(".username input").val();		
			if(!re1.test(username)&&!re2.test(username)){

				$(".username .warnning").html("账号不符合要求");
				$(".username .warnning").css({
					"background":"url(images/wrong.png) no-repeat 0 30px",
					"visibility":"visible"
				})
				$(".username .warnning").addClass('animated shake');
			}
			else{
				flag1=true;
				$(".username .warnning").html("");
				$(".username .warnning").css({
					"background":"url(images/yes.png) no-repeat 0 30px",
					"visibility":"visible"
				})
			}
		})
		//密码
		$(".password input").blur(function(){
			var password=$(".password input").val();			
			if(!re3.test(password)&&password!=""){
				$(".password .warnning").html("密码不符合要求");
				$(".password .warnning").css({
					"background":"url(images/wrong.png) no-repeat 0 30px",
					"visibility":"visible"
				})
				$(".password .warnning").addClass('animated shake');
			}
			else if(password!=""){
				flag2=true;
				$(".password .warnning").html("");
				$(".password .warnning").css({
					"background":"url(images/yes.png) no-repeat 0 30px",
					"visibility":"visible"
				})
			}
		})
		//确认密码
		$(".re_pass input").blur(function(){
			var re_pass=$(".re_pass input").val();
			var password=$(".password input").val();
			if(password!=re_pass){
				$(".re_pass .warnning").html("密码不一致");
				$(".re_pass .warnning").css({
					"background":"url(images/wrong.png) no-repeat 0 30px",
					"visibility":"visible"
				})
				$(".re_pass .warnning").addClass('animated shake');
			}
			else if(password!=""&&re_pass!=""){
				flag3=true;
				$(".re_pass .warnning").html("");
				$(".re_pass .warnning").css({
					"background":"url(images/yes.png) no-repeat 0 30px",
					"visibility":"visible"
				})
			}
			else{
				$(".re_pass .warnning").html("");
				$(".re_pass .warnning").css({
					"visibility":"hidden"
				})
			}
		})
		//手机号
		$(".phone input").blur(function(){
			var phone=$(".phone input").val();
			if(phone==""){
				$(".phone .warnning").html("");
				$(".phone .warnning").css({
					"visibility":"hidden"
				})
			}
			else if(!re1.test(phone)){
				$(".phone .warnning").html("手机号不符合要求");
				$(".phone .warnning").css({
					"background":"url(images/wrong.png) no-repeat 0 30px",
					"visibility":"visible"
				})
				$(".phone .warnning").addClass('animated shake');
			}
			else{
				flag4=true;
				$(".phone .warnning").html("");
				$(".phone .warnning").css({
					"background":"url(images/yes.png) no-repeat 0 30px",
					"visibility":"visible"
				});
				$(".btn_getmes").css({
					"opacity":"1",
					"filter": "alpha(opacity = 100)"
				})
			}
		})
		//验证码点击
		$(".btn_getmes").click(function(){
			var phone=$(".phone input").val();
			if(!re1.test(phone)){
				$(".phone .warnning").html("请输入手机号");
				$(".phone .warnning").css({
					"background":"url(images/wrong.png) no-repeat 0 30px",
					"visibility":"visible"
				})
				$(".phone .warnning").addClass('animated shake');
			}
		})
		$(".u_input input").keydown(function(){
				$(this).siblings(".cancel_wrap").children(".cancel").css("visibility","visible")
		})
		$(".phone input").keydown(function(){
			if($(".username input").val()==""){
					$(".username .warnning").html("请先输入账号");
					$(".username .warnning").css({
					"background":"url(images/wrong.png) no-repeat 0 30px",
					"visibility":"visible"
				})
				$(".username .warnning").addClass('animated shake');
			}				
		})
		$(".cancel").click(function(){
			$(this).parent().parent().children("input").val("");
			$(this).css("visibility","hidden");
			$(this).parent().parent().children(".warnning").css("visibility","hidden");
		})
		//注册点击
		$(".u_input input").blur(function(){
			if(flag1==true&&flag2==true&&flag3==true&&flag4==true){
				$(".btn_sub").removeProp('disabled');
				$(".btn_sub").css({
					"opacity": "1",
					"filter":"alpha(opacity=100)"
				})
			}
		})
		function register(userID,passWord){
			$.ajax({
				url: 'http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID='+userID+'&password='+passWord,
				type: 'POST',
			})
			.done(function(data) {
				if(data==1){
					window.location="login.html?"+userID;
				}
				if(data==0){
					flag1=false;
					$(".btn_sub").prop('disabled',true);
					$(".btn_sub").css({
						"opacity": "0.6",
						"filter":"alpha(opacity=60)"
					})
					$(".username .warnning").html("该账户已被注册");
					$(".username .warnning").css({
						"background":"url(images/wrong.png) no-repeat 0 30px",
						"visibility":"visible"
					})
					$(".username .warnning").addClass('animated shake');
				}
			})
		
		}
		$(".btn_sub").click(function(){
			var userID=$(".username input").val();
			var passWord=$(".password input").val();
			register(userID,passWord);
			return false;
		})
		// (re1.test($(".username input").val())||re2.test($(".username input").val()))&&(re3.test($(".password input").val()))&&($(".password input").val()==$(".re_pass input").val())&&(re1.test($(".phone input").val()))
	});	
