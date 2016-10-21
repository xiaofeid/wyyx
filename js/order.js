$(function () {
	//var arr=
	var pid=window.location.search.replace(/\?/,"").split("&")[0];
	var num=window.location.search.replace(/\?/,"").split("&")[1];
	var img=window.location.search.replace(/\?/,"").split("&")[2];
	$.get("js/info.json",function(data){
		var data=data.result;
		$.each(data,function(index,value){
			for(var i=0;i<value.product_list_show.length;i++){
				if(value.product_list_show[i].product_id==pid){
					var str="";
					if(img){
						str="<td>"+
								"<div>"+
									"<img src='"+img+"' alt='' class='left'>"+
									"<div class='left name'>"+
										"<h4>"+value.product_list_show[i].product_name+"</h4>"+
									"</div>"+
									
								"</div>"+
							"</td>"+
							"<td class='order_price'>￥"+value.product_list_show[i].product_price+"</td>"+
							"<td class='order_num'>"+num+"</td>"+
							"<td class='order_totprice'>￥"+Number((value.product_list_show[i].product_price*num))+"</td>"+
							"<td class='order_realprice'>￥"+(value.product_list_show[i].product_price*num)+"</td>";
					}
					else{
						str="<td>"+
								"<div>"+
									"<img src='images/all_product/"+value.product_list_show[i].info.menu_name+"/"+value.product_list_show[i].info.small_show_img[0]+"' alt='' class='left'>"+
									"<div class='left name'>"+
										"<h4>"+value.product_list_show[i].product_name+"</h4>"+
									"</div>"+
									
								"</div>"+
							"</td>"+
							"<td class='order_price'>￥"+value.product_list_show[i].product_price+"</td>"+
							"<td class='order_num'>"+num+"</td>"+
							"<td class='order_totprice'>￥"+(value.product_list_show[i].product_price*num)+"</td>"+
							"<td class='order_realprice'>￥"+(value.product_list_show[i].product_price*num)+"</td>";
					}
					
					$("tbody tr").html(str);
					$(".line1 span").html("￥"+(value.product_list_show[i].product_price*num))
					$(".line4 span").html("￥"+(value.product_list_show[i].product_price*num))

				}
			}
		})
	})	
});