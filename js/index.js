$(function(){
	var $container=$('#container'),
		$title=$container.children('.title'),
		$result=$container.children('.result'),
		$button=$container.children('.button'),
		$menu=$container.children('.menu');
	var data=["火锅","烧烤","烤鱼","肉蟹煲","黄焖鸡","大盘鸡","饺子","炸鸡","烤鸭","羊肉汤","麻辣香锅","烤牛蛙","麻辣烫","馄饨","猪蹄","猪肘","汉堡","披萨","粥","水果","西北风"],
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
