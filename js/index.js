$(function(){
	var $container=$('#container'),
		$title=$container.children('.title'),
		$result=$container.children('.result'),
		$button=$container.children('.button'),
		$menu=$container.children('.menu');
	var data=["麻辣烫","饺子","麻辣香锅","黄焖鸡","蛋炒饭","米线","粥","馄饨","肯德基","麦当劳","德克士","汉堡王","螺蛳粉","凉皮","烧烤","寿司","酸辣粉","煲仔饭","面包","重庆小面","炸酱面","打卤面","冒菜","沙县","烤鱼","煎饼果子","火锅","烤冷面","沙县小吃","包子","炸鸡","黄焖鸡米饭","披萨","便当","麻婆豆腐","回锅肉","牛奶","肉夹馍","小笼包","呷哺呷哺","木桶饭","拉面","石锅拌饭","咖喱饭","汉堡","盖浇饭","水果","西北风"],
		userData=[],
		index=-1;
	function random(a,b){
        a=a||0;b=b||0;
        var max=Math.max(a,b),
            min=Math.min(a,b);
        if(max===min)
            return max;
        return min+~~(Math.random()*(max-min));
	}
	function getRandomNotIndex(len){
		var t=random(len);
		return t===index?getRandomNotIndex(len):t;
	}
	var timer={
		el:0,
		time:25,
		start:function(){
			var menu=userData.length?userData:data;
			this.end();
			this.el=setInterval(function(){
				index=getRandomNotIndex(menu.length);
				$result.html(menu[index]||'');
			},25);
		},
		end:function(){
			clearInterval(this.el);
			this.el=0;
		}
	};

	$button.on('click',function(){
		if(timer.el===0){
			timer.start();
			$button.html('停止');
		}else{
			timer.end();
			$button.html('开始');
		}
	});

	function menu(){
		var $button=$menu.children('button'),
			$user=$menu.children('.user'),
			$textarea=$user.children('textarea'),
			$confirm=$user.find('.confirm'),
			$cancel=$user.find('.cancel');
		$button.on('click',function(){
			if(timer.el===0)
				$user.show();
		});
		$confirm.on('click',function(){
			var sVal=$textarea.val().trim();
			if(sVal!==''){
				userData=sVal.split(' ');
			}else{
				userData.length=0;
			}
			$user.hide();
		});
		$cancel.on('click',function(){
			userData.length=0;
			$textarea.val('');
			$user.hide();
		});
	}
	menu();
});