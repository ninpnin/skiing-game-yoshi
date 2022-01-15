var frameCount = 0;

var iTime = 300;
var isTime = true;

function initBack(){
	//canvas init

	var ohje = document.getElementById("hyppaa");

	console.log("INIT BG");
	var r0 = 255*0.42;
	var g0 = 255*0.5;
	var b0 = 255*0.70;

	var sinus = 0;
	var sinus2 = 0.8;
	var lightness = 1.0;
	var speed = 0.001

	requestAnimationFrame(loopBG);

	function colorValues() {
		lightness = (0.7 - 0.3*sinus);
		sinus = Math.sin(speed*frameCount);
		sinus2 = Math.sin(speed*frameCount+Math.PI/3);
		//console.log(sinus)
		drawBG((0.2+sinus)*50+r0,sinus2*20+g0,-sinus*20+b0);
	}

	function loopBG() {
		if (isTime) checkIsTime();
		frameCount = frameCount + 1;

		colorValues();
    	requestAnimationFrame(loopBG);
	};

	function drawBG(a,b,c) {
		document.body.style.backgroundColor = 'rgb(' + Math.floor(a*lightness) + ',' + Math.floor(b*lightness) + ',' + Math.floor(c*lightness) + ')';
	};
	
	ohje.style.opacity = 1.0;
	
	function checkIsTime () {
		if (iTime>=1) {
			iTime += -1;
		} else {
			ohje.style.opacity = 0.0; 
			iTime = 0;
			itTime = false;
		}
		if (iTime >1 && iTime < 30) {

			ohje.style.opacity = iTime / 30;
		}
	};
}