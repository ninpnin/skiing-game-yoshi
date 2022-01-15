// Animate snow coming from the skis

var suihku = {
	mp : 250, //max particles
	particles : [],
	
	speed : 1,
	//Lets draw the flakes
	draw : function ()
	{


		var xS = 73;
		var yS = 80;


		if (player.tuettu && player.rockCounter === 0) {
			this.particles.push({
				x: player.X + xS+Math.random()*10-5, //x-coordinate
				y: player.Y + yS+Math.random()*10-5, //y-coordinate
				r: Math.random()*(player.VelX)+1, //radius
				d: Math.random()*Math.PI/2 +Math.PI*5/6, //density
				v: ((1 + Math.random()) / 2)
			});
		} else if (player.tuettu) {

			this.particles.push({
				x: player.X + xS+3+Math.random()*16-8, //x-coordinate
				y: player.Y + yS-7+Math.random()*22-11, //y-coordinate
				r: Math.random()*(player.VelX+2)+3, //radius
				d: Math.random()*Math.PI/2 +Math.PI*5/6, //density
				v: ((1 + Math.random()) / 2)
			});
		}

		context.fillStyle = "rgba(255, 255, 255, 0.8)";
		context.beginPath();
		for(var i = 0; i < this.particles.length; i++)
		{
			var p = this.particles[i];
			context.moveTo(p.x-player.Xoffset, p.y-player.Yoffset);
			if (p.r> 0) context.arc(p.x-player.Xoffset, p.y-player.Yoffset, p.r, 0, Math.PI*2, true);
		}
		context.fill();
		this.update();
	},
	

	update : function () {
		
		for(var i = 0; i < this.particles.length; i++)
		{
			var p = this.particles[i];
			var sine = Math.sin(p.d);
			var cosine = Math.cos(p.d);
			var DX = this.speed * p.v*cosine;
			var DY = this.speed * p.v*sine;

			p.r += -0.02;
			if (p.d > Math.PI/2) p.d += -0.1;
			if (p.r < 0.4)
				{ this.particles.splice(i) }
			else { 
				
				p.x = p.x + DX;
				p.y = p.y + DY;
			}
			
		}
		
	},

	land : function () {

		var xS = 73;
		var yS = 80;
		console.log("Particles.size " + this.particles.length);
		for (var i = 0; i < 30; i++) 
		{
			this.particles.push({
				x: player.X + xS+Math.random()*10-5, //x-coordinate
				y: player.Y + yS+Math.random()*10-5, //y-coordinate
				r: Math.random()*(6)+2, //radius
				d: Math.random()*Math.PI/2 +Math.PI*5/6, //density
				v: ((1 + Math.random()) / 2)
			});
		}
		console.log("Particles.size " + this.particles.length);
	},
}