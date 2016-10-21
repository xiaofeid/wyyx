$(function () {
	if($.cookie("cart")){
		var obj = JSON.parse($.cookie("cart"));
		var shopnum=0;
		var str="";
		var tmoney=0;
		$.each(obj,function(key,value){
			shopnum+=value;
		})
			$.get("js/info.json",function(data){
				var data=data.result;
				$.each(data,function(index,value1){
						
					for(var i=0;i<value1.product_list_show.length;i++){
						$.each(obj,function(key,value){
							if(value1.product_list_show[i].product_id==key){
								tmoney+=(value1.product_list_show[i].product_price)*value
								str+="<div class='row item_list'>"+
									"<div class='col-md-2 first'>"+
										"<input type='checkbox' checked='checked' class='one_check'>"+
										"<a href=''><img src='images/all_product/"+value1.product_list_show[i].info.menu_name+"/"+value1.product_list_show[i].info.small_show_img[0]+"' alt=''></a>"+
									"</div>"+
									"<a class='col-md-2 pro_name' href=''>"+value1.product_list_show[i].product_name+"</a>"+
									"<p class='col-md-2 one_price'>￥"+value1.product_list_show[i].product_price+"</p>"+
									"<div class='col-md-2 num_box_wrap'>"+
										"<div class='num_box'>"+
											"<span class='reduce' data-id='"+value1.product_list_show[i].product_id+"'><i>-</i></span>"+
											"<input type='text' value='"+value+"'>"+
											"<span class='add' data-id='"+value1.product_list_show[i].product_id+"'><i>+</i></span>"+
										"</div>"+
									"</div>"+
									"<p class='col-md-2 tot_price'>￥"+((value1.product_list_show[i].product_price)*value)+"</p>"+
									"<div class='col-md-2'></div>"+
								"</div>"
							}
						})
						//else{continue;}
								
					}
			})
			$(".line1 span").html("￥"+tmoney);
			$(".line4 span").html("￥"+tmoney)
			$(".cart_group").html(str);
			$(".chose_num i").html(shopnum);
			$(".reduce").each(function(){
				$(this).on("click",function(){
					$(this).parent(".num_box").parent(".num_box_wrap").siblings('.first').children('input').prop("checked",true);
					$('.item_list input:checkbox').each(function(){
						if(!($(this).prop("checked"))){
							$(".all_check").prop("checked",false)
						}
						else{
							$(".all_check").prop("checked",true)
						}
					})
					var prodId = $(this).attr("data-id");
					//console.log(prodId)
					if(obj[prodId]==1){
						obj[prodId]=1;
						//return false;
					}
					if(obj[prodId]>1){
						//console.log($(this).index())
						var re=$(".item_list").eq($(this).index()).children(".one_price").html().charAt(0);
						var one_price=$(this).parent(".num_box").parent(".num_box_wrap").siblings('.one_price').html().replace(re,"");			
						obj[prodId]--;					
						var objTostr = JSON.stringify(obj);
						$.cookie("cart",objTostr,{expires:7,path:"/"});
						$(this).siblings("input").val(obj[prodId]);
						$(this).parent(".num_box").parent(".num_box_wrap").siblings('.tot_price').html("￥"+(one_price*obj[prodId]));
						// var totprice=$(".line1 span").html().replace("￥","")-one_price;
						// $(".line1 span").html("￥"+totprice);
						// $(".line4 span").html("￥"+totprice);
						// var totnum=$(".chose_num i").html();
						// $(".chose_num i").html(totnum-1)
						var money=0;
						var num=0;
						$('.item_list input:checkbox:checked').each(function(){
							num+=parseInt($(this).parent(".first").siblings(".num_box_wrap").children(".num_box").children("input").val());
							money+=parseInt($(this).parent(".first").siblings(".tot_price").html().replace("￥",""));
						})
						$(".chose_num i").html(num)
						$(".line1 span").html("￥"+money);
						$(".line4 span").html("￥"+money);
						}

				})
			})
			
			$(".add").each(function(){
				$(this).on("click",function(){
					$(this).parent(".num_box").parent(".num_box_wrap").siblings('.first').children('input').prop("checked",true);
					$('.item_list input:checkbox').each(function(){
						if(!($(this).prop("checked"))){
							$(".all_check").prop("checked",false)
						}
						else{
							$(".all_check").prop("checked",true)
						}
					})
					
					var prodId = $(this).attr("data-id");
					var one_price=$(this).parent(".num_box").parent(".num_box_wrap").siblings('.one_price').html().replace("￥","");			
					obj[prodId]++;					
					var objTostr = JSON.stringify(obj);
					$.cookie("cart",objTostr,{expires:7,path:"/"});
					$(this).siblings("input").val(obj[prodId]);
					$(this).parent(".num_box").parent(".num_box_wrap").siblings('.tot_price').html("￥"+(one_price*obj[prodId]));
					// var totprice=parseInt($(".line1 span").html().replace("￥",""))+parseInt(one_price);
					// $(".line1 span").html("￥"+totprice);
					// $(".line4 span").html("￥"+totprice);
					// var totnum=parseInt($(".chose_num i").html());
					// $(".chose_num i").html((totnum+1))
					var money=0;
					var num=0;
					$('.item_list input:checkbox:checked').each(function(){
						num+=parseInt($(this).parent(".first").siblings(".num_box_wrap").children(".num_box").children("input").val());
						money+=parseInt($(this).parent(".first").siblings(".tot_price").html().replace("￥",""));
					})
					$(".chose_num i").html(num)
					$(".line1 span").html("￥"+money);
					$(".line4 span").html("￥"+money);

				})
			})
					
			//check
			$('.item_list input:checkbox').each(function(index,value){

				$(this).click(function(){
					if(!($(this).prop("checked"))){
						$(".all_check").prop("checked",false)
					}
					if($('.item_list input:checkbox:checked').length==$('.item_list input:checkbox').length)
					{
						$(".all_check").prop("checked",true)
					}
					// else{
					// 	$(".all_check").prop("checked",true)
					// }
					var money=0;
					var num=0;
					$('.item_list input:checkbox:checked').each(function(){
						num+=parseInt($(this).parent(".first").siblings(".num_box_wrap").children(".num_box").children("input").val());
						money+=parseInt($(this).parent(".first").siblings(".tot_price").html().replace("￥",""));
					})
					$(".chose_num i").html(num)
					$(".line1 span").html("￥"+money);
					$(".line4 span").html("￥"+money);
				})				
			})

			$(".all_check").click(function(){
				if($(this).prop("checked")){
					$('input:checkbox').prop("checked",true);
					var money=0;
					var num=0;
					$('.item_list input:checkbox').each(function(index,value){
						num+=parseInt($(this).parent(".first").siblings(".num_box_wrap").children(".num_box").children("input").val());
						money+=parseInt($(this).parent(".first").siblings(".tot_price").html().replace("￥",""));
					})
					$(".chose_num i").html(num)
					$(".line1 span").html("￥"+money);
					$(".line4 span").html("￥"+money);		
				}
				else{
					$(".chose_num i").html(0)
					$('input:checkbox').prop("checked",false);
					$(".line1 span").html("￥0.00");
					$(".line4 span").html("￥0.00");
				}
			})
			
	//json结束					
		})		
	
	}
	else{
		var obj={}
		$(".cart_group").html("");
	}
	
});