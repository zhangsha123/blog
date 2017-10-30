;(function(win,doc){
	var rem = 100/750 * document.documentElement.clientWidth;
	doc.documentElement.style.fontSize = rem + 'px';
	win.onresize=function(){
		var rem = 100/750 * document.documentElement.clientWidth;
	doc.documentElement.style.fontSize = rem + 'px';
	}
})(window,document);
