$(function () {
	var userName=$.cookie("username");
		if(userName){
			$(".login_regis").html("<a href='' class='login_name'><span>"+userName+"</span><i></i></a>");
		
			if($.cookie("cart")){
				var obj = JSON.parse($.cookie("cart"));
				var shopnum=0;
				$.each(obj,function(key,value){
					shopnum+=parseInt(value);
				})
				$(".shop_num").html(shopnum);
			}
			else{
				var obj = {};
			}
		}else{
			var obj = {};
		}
	//拼字符串啦
	var pid=window.location.search.replace(/\?/,"");
	$(".j_cart").attr("data-id",pid)
	//console.log($(".j_cart").attr("data-id"))
	$.get("js/info.json",function(data){
		var data=data.result;
		$.each(data,function(index,value){
			for(var i=0;i<value.product_list_show.length;i++){
				if(value.product_list_show[i].product_id==pid){
					var str=""
					$(".product_list_tit").html(value.product_list_tit);
					$(".detail_name").html(value.product_list_show[i].product_name);
					$(".view img").attr("src","images/all_product/"+value.product_list_show[i].info.menu_name+"/"+value.product_list_show[i].info.first_show_img);
					//侧边小图
					for(var j=0;j<value.product_list_show[i].info.small_show_img.length;j++)
					{
						str+="<li><a href=''><img src='images/all_product/"+value.product_list_show[i].info.menu_name+"/"+value.product_list_show[i].info.small_show_img[j]+"' alt=''></a></li>";
					}
					$(".list_img ul").html(str);
					$(".intro_tit").html(value.product_list_show[i].product_name);
					$(".detail_intro p").html(value.product_list_show[i].product_introduct);
					$(".j_price").html("<i>￥</i>"+value.product_list_show[i].product_price);
					//颜色值
					if(value.product_list_show[i].info.color_number==0){
						$(".detail_color").html(" ");
					}
					else{
						var str1="";
						for(var j=0;j<value.product_list_show[i].info.color_number;j++){
							if(j+7<10){
								str1+="<li>"+
									"<img src='images/all_product/"+value.product_list_show[i].info.menu_name+"/pic_00"+(j+7)+".png' alt='' title='灰色条纹'>"+
									"<i></i>"+
								"</li>"
							}
							else{
								str1+="<li>"+
									"<img src='images/all_product/"+value.product_list_show[i].info.menu_name+"/pic_0"+(j+7)+".png' alt='' title='灰色条纹'>"+
									"<i></i>"+
								"</li>"
							}				
						}
						$(".detail_color").html("<span class='intro_name'>颜色</span><div class='left'><ul class='chose_col'>"+str1+"</ul></div>");
					}

					//大家都在看
					var str2="";
					for(var j=0;j<8;j++){
						if(value.product_list_show[i].info.color_number+7+j<10){
							str2+="<li>"+
								"<div>"+
									"<a href=''><img class='img' src='images/all_product/"+value.product_list_show[i].info.menu_name+"/pic_00"+(value.product_list_show[i].info.color_number+7+j)+".png' alt=''></a>"+
									"<h3><a href=''>"+value.product_list_show[i].product_name+"</a></h3>"+
									"<p>￥"+value.product_list_show[i].product_price+"</p>"+
								"</div>"+
							"</li>"
						}
						else{
							str2+="<li>"+
								"<div>"+
									"<a href=''><img class='img' src='images/all_product/"+value.product_list_show[i].info.menu_name+"/pic_0"+(value.product_list_show[i].info.color_number+7+j)+".png' alt=''></a>"+
									"<h3><a href=''>"+value.product_list_show[i].product_name+"</a></h3>"+
									"<p>￥"+value.product_list_show[i].product_price+"</p>"+
								"</div>"+
							"</li>"
						}
						
					}
					$(".recommend ul").html(str2);
					//商品介绍
					var str3="";
					for(var j=0;j<value.product_list_show[i].info.introduce_number;j++){
						str3+="<img src='images/all_product/"+value.product_list_show[i].info.menu_name+"/pic_0"+(value.product_list_show[i].info.color_number+15+j)+".jpg' alt=''>"
					}
					$(".img_box").html(str3)			

				}
			}
			
		})
		if($(".detail_color").html()==" "){
			var i=1;
			$(".detail_number .num_box input").val(1);
			$(".detail_number .num_box .reduce").click(function(){
				if(i>1){
					i--;
					$(".detail_number .num_box input").val(i);
				}
			})
			$(".detail_number .num_box .add").click(function(){
					i++;
					$(".detail_number .num_box input").val(i);
			})
			$(".buy").click(function() {
				if(!userName){
					$(".mask").show();
					$(".login_box").show();
				}
				else{
					var num=$(".num_box input").val()
					window.location="order.html?"+pid+"&"+num;
				}
				return false;
			});
				
			$(".j_cart").on("click",function(){
				if(!userName){
					$(".mask").show();
					$(".login_box").show();
				}else{
					var num1 = obj[$(this).attr("data-id")]||0;
					var prodId = $(this).attr("data-id");
					obj[prodId] =num1+parseInt($(".num_box input").val());
					var objTostr = JSON.stringify(obj);
					$.cookie("cart",objTostr,{expires:7,path:"/"});
				}
				var shopnum=0;
				$.each(obj,function(key,value){
					console.log(value)
					shopnum+=parseInt(value);
				})
				$(".shop_num").html(shopnum);
				return false;
			})
		}			
	else{
		$(".detail_color").on("click",".chose_col li",function(){

			var This=$(this).children('img').attr("src");
			$(this).css("border", "2px solid #b4a078");
			$(this).children('i').css("display","block");
			$(this).siblings('li').css("border", "1px solid #ddd");
			$(this).siblings('li').children('i').css("display", "none");
			var img=$(this).children('img').attr("src");
			$(".view img").attr("src",img)
			var i=1;
			$(".detail_number .num_box input").val(1);
			$(".detail_number .num_box .reduce").click(function(){
				if(i>1){
					i--;
					$(".detail_number .num_box input").val(i);
				}
			})
			$(".detail_number .num_box .add").click(function(){
					i++;
					$(".detail_number .num_box input").val(i);
			})
			$(".buy").click(function() {
				if(!userName){
					$(".mask").show();
					$(".login_box").show();
				}
				else{
					var num=$(".num_box input").val()
					window.location="order.html?"+pid+"&"+num+"&"+This;
				}
				return false;
			});
			$(".j_cart").on("click",function(){
				if(!userName){
					$(".mask").show();
					$(".login_box").show();
				}else{
					var num1 = obj[$(this).attr("data-id")]||0;
					var prodId = $(this).attr("data-id");
					obj[prodId] =num1+parseInt($(".num_box input").val());
					var objTostr = JSON.stringify(obj);
					$.cookie("cart",objTostr,{expires:7,path:"/"});
					var shopnum=0;
					$.each(obj,function(key,value){
					shopnum+=parseInt(value);
				})
				}
				
				$(".shop_num").html(shopnum);
				return false;
			})
		});
	}
	}) 
	


	$(".quit").click(function(){
		$(".mask").hide();
		$(".login_box").hide();
	})
	$(".list_img ul").on("mouseover","li a",function(){
		$(this).css("border","2px solid #b4a078")
		$(this).siblings().css("border","1px solid #e8e8e8");
		var img=$(this).children('img').attr("src");
		$(".view img").attr("src",img)
	})
	$(".list_img ul").on("mouseout","li a",function(){
		$(this).css("border","1px solid #e8e8e8");
	})
	//选择颜色，数量，加购物车	

	
	$(".prev").click(function(){
		$(".recommend ul").css("left","0");
	})
	$(".next").click(function(){
		$(".recommend ul").css("left","-960px")
	})
	$(".nav_tab li").click(function(){
		$(this).addClass('change_bor').siblings('li').removeClass('change_bor');
		var index=$(this).index();
		$(".tab").css("display","none");
		$(".tab").eq(index).css("display","block");
		return false;
	})

	// 弹窗登录
	function login_detail(userID,passWord){
		$.ajax({
			url: 'http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+userID+'&password='+passWord,
			type: 'POST',
		})
		.done(function(data) {
			if(data==0){
				$(".warn").css("display","block");
				$(".warn").html("用户名不存在");
				return false;
			}
			if(data==2){
				$(".warn").css("display","block");
				$(".warn").html("用户名密码不符");
				return false;
			}
			else{
				var data=$.parseJSON(data);
				window.location="details.html?"+pid;
				//var d=new Date();
				$.cookie("username",data.userID);
			}
		})
		
	}
	$(".detail_btn_login").on("click",function(){
		var userID=$(".user_cont input").val();
		var passWord=$(".pass_cont input").val();
		login_detail(userID,passWord);
		return false;
	})


});