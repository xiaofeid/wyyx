	$(document).ready(function() {
		//用户名显示
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
			}else{
				$(".shop_num").html(0);
				var obj = {};
			}
		}
		
		$(".shop_cart").click(function(){
			window.location="shopping_cart.html";
			return false;
		})

		//最顶部
		$(window).scroll( function() { 
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
			if(scrollTop>200){
				$(".show_wrap").show()
			}
			if(scrollTop<=200){
				$(".show_wrap").hide()
			}
			if(scrollTop>690){
				$(".returnTop").css("display","block");
			}
			if(scrollTop<=690){
				$(".returnTop").css("display","none");
			}
		} );
		//回到顶部
		$(".returnTop").click(function(){
			 $('html,body').animate({
		         scrollTop : '0px'
		         }, 3000);
		})

		//APP下载
			$(".download a").mouseover(function() {
				$(".download_img").css("display","block");
			});
			$(".download a").mouseout(function() {
				$(".download_img").css("display","none");
			});
		//导航栏
			$(".nav_item").mouseover(function() {			
				$(this).siblings().children('.nav_dropdown').css("display","none");
				$(this).children('.nav_dropdown').css("display","block");
			});
			$(".nav_item").mouseout(function() {			
				$(this).children('.nav_dropdown').css("display","none");
			});
		//二级导航数据
			$.get("js/nav_data.json",function(data){
				var data=data.result;			
				var len=$(".nav_dropdown").length;
				$.each(data,function(index,value){		
						for(var i=0;i<len;i++){
							var str="";
							for(var j=0;j<value.img_src.length;j++){
								str+="<li>"+
										"<img src='"+value.img_src[j]+"' alt=''>"+
										"<p><a href=''>"+value.tit[j]+"</a></p>"+
									"</li>"
							}
							$(".tot_tab_nav .nav_dropdown ul").eq(index).html(str);
							$(".show_tab_nav .nav_dropdown ul").eq(index).html(str);
					}
				})
			})

		// 轮播效果
			$("#scroll_box").mouseover(function(){
				$(".slider-nav-wrap").css("display","block");
				$(".slider-nav").css("display","block");
			})
			$("#scroll_box").mouseout(function(){
				$(".slider-nav-wrap").css("display","none");
				$(".slider-nav").css("display","none");
			})
			$.get("js/scrollImg.json",function(data){
				$.each(data,function(index,value){
					$("<li><a href='' style='background:url("+value+") no-repeat center center'></a></li>").appendTo($("#scroll_box ul"));
					$("<a><img src='"+value+"'/></a>").appendTo($(".slider-nav"));
				})
				var $ul = $("#scroll_box ul");
				$("#scroll_box li:first-child").clone().appendTo($("#scroll_box ul"));
				var $li = $("#scroll_box li");
				var len = $li.length;
				var perWidth = $li.outerWidth();
				$ul.css("width",perWidth*len);
				$li.css("width",perWidth);
				var i = 0;
				var timer = setInterval(move,4000);
				function move(){
					i++;
					if(i == len){
						i = 1;
						$("#scroll_box ul").css("margin-left",0);	
					}
					$ul.stop().animate({"margin-left":-perWidth*i});
				}
				
				$(".slider-nav a").hover(function(){
				clearInterval(timer);
					i = $(this).index()-1;
					move()
				},function(){
					timer = setInterval(move,4000);
				})
			})
		// 轮播效果结束
		//品牌制造商
		$(".m_cate ul li").mouseover(function() {
			$(this).find("a").find('.img').css({
				"transition": "all 1s"
			})
			$(this).find("a").find('.img').css("transform", "scale(1.05)");
		});
		$(".m_cate ul li").mouseout(function() {
			$(this).find("a").find('.img').css({
				"transition": "all 1s",
				"transform":"scale(1)"
				})
		});

		//新品首发
		$.get("js/new_products.json",function(data){
				var data=data.result;		
				var str=""	
				var userName=window.location.search.replace(/\?/,"").split("=")[1];
				$.each(data,function(index,value){	
				if(value.new_producer==""){
					str+="<dl>"+
					"<a class='img_wrap' href='details.html?"+value.product_id+"'><img class='img' src='"+value.new_img+"' alt=''></a>"+
					"<dt><a href='details.html?"+value.product_id+"'>"+value.new_title+"</a></dt>"+
					"<dd>"+value.new_price+"</dd>"+
					"</dl>"
				}
				else{
					str+="<dl>"+
					"<a class='img_wrap' href='details.html?"+value.product_id+"'><img class='img' src='"+value.new_img+"' alt=''></a>"+
					"<dt><a href='details.html?"+value.product_id+"'>"+value.new_title+"</a></dt>"+
					"<dd>"+value.new_price+"<span><a href='details.html?"+value.product_id+"'>"+value.new_producer+"</a></span></dd>"+
					"</dl>"
				}	

					$(".new_item").html(str);
				})

			})

		//人气推荐

		$.get("js/hot_products.json",function(data){
				var data=data.result;			
				$.each(data,function(index,value){	
					for(var i=0;i<data.length;i++){
						var str="";						
						str="<a href='details.html?"+value.product_id+"' class='hd'><img class='img' src='"+value.hot_img+"' alt=''></a>"+
							"<dl>"+
								"<dt><a href='details.html?"+value.product_id+"'>"+value.hot_title+"</a></dt>"+
								"<dd>"+value.hot_price+"</dd>"+
							"</dl>";
						$(".m_product").eq(index).html(str);
					}
				})
			})

		//商品列表
		$.get("js/product_list.json",function(data){
				var data=data.result;	
				var str="";	
				var str1="";
				$.each(data,function(index,value){
						$.get("js/nav_data.json",function(data){
							var data1=data.result;								
							for(var j=0;j<data1.length;j++){
								if(j==index){
									str1="";
									for(var k=0;k<data1[j].img_src.length;k++) 
									{
										if(k==data1[j].img_src.length-1){
											str1+="<a href=''><img src='"+data1[j].img_src[k]+"' alt=''>"+data1[j].tit[k]+"</a>"
										}
										else{
											str1+="<a href=''><img src='"+data1[j].img_src[k]+"' alt=''>"+data1[j].tit[k]+"</a><b>/</b>"
										}					
									} 
								}								
							}
						var str2="";
						for(var j=0;j<value.product_list_show.length;j++){
								str2+="<li>"+
							"<div>"+
								"<div class='item_img'>"+
									"<a href='details.html?"+value.product_list_show[j].product_id+"'><img class='img' src='"+value.product_list_show[j].img_src+"' alt=''></a>"+
								"</div>"+
								"<div class='item_intro'>"+
									"<h4><a href='details.html?"+value.product_list_show[j].product_id+"'>"+value.product_list_show[j].product_name+"</a></h4>"+
									"<p class='price'>"+value.product_list_show[j].product_price+"</p>"+
									"<hr/>"+
									"<p class='intro'>"+value.product_list_show[j].product_introduct+"</p>"+
								"</div>"+
							"</div>"+
						"</li>";
						}												
						str+="<div class='products_list'>"+
								"<div class='products_title'>"+
									"<h3 class='left'>"+value.product_list_tit+"<span>"+value.product_list_small_tit+"</span></h3>"+
									"<div class='right subList'>"+str1+
									"</div>"+
								"</div>"+
								"<div class='products_list_item'>"+
									"<ul>"+str2+				
									"</ul>"+
								"</div>"+
								"<div class='more_link'>"+
								"<a href=''><span>"+value.product_link+"</span><i class='link'></i></a>"+
								"</div>"+
							"</div>";
					$(".products").html(str);
					})
				})

			})
		//banner2
		$.get("js/banner2.json",function(data){
			var str="";
			$.each(data,function(index,value) {
				str+="<li>"+
							"<a href=''><img class='img' src='"+value.img_src+"' alt=''></a>"+
							"<div class='bd'>"+
								"<div class='product'>"+
									"<h3 class='left'>"+value.title+"</h3>"+
									"<span class='right'>"+value.price+"</span>"+
								"</div>"+
								"<h5 class='say'>"+value.content+"</h5>"+
								"<p class='user'>"+value.user+"<span>"+value.date+"</span></p>"+
							"</div>"+
					"</li>";
			});			
			$(".comment_con ul").html(str);
			$(".comment_con ul li:first-child").clone().appendTo('.comment_con ul');
			$(".comment_con ul li:nth-child(2)").clone().appendTo('.comment_con ul');
			$(".comment_con ul li:nth-child(3)").clone().appendTo('.comment_con ul');
			$(".comment_con ul li:nth-child(4)").clone().appendTo('.comment_con ul');
					var $ul=$(".comment_con ul");
					var $li=$(".comment_con ul li");
					var len=$li.length;
					var perWidth=$li.eq(0).outerWidth();
					$(".comment_con ul").css("width",len*perWidth);
					$(".comment_con ul li").css("width",perWidth);
					var i=0;
					var timer=setInterval(move, 3000);
					function move(){
						i++;
						if(i==-1){
							i=len-5;
							$ul.css("margin-left",-perWidth*(len-4))
						}
						if(i==len-3){
							i=1;
							$ul.css("margin-left",0)
						}
						if(i==len){
							i=3;
							$ul.css("margin-left",-3*perWidth)
						}
						$ul.stop().animate({"margin-left":-i*perWidth});
					}
					$(".prev").click(function(){
						clearInterval(timer);
						i=i-2;
						move();
						timer=setInterval(move, 3000);
					})
					$(".next").click(function(){
						clearInterval(timer);
						move();
						timer=setInterval(move, 3000);
					})
				})

		
	});
	