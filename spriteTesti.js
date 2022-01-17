var canvas = null;
var context = null;
var image1 = null;
var backImage = null;

var audio = new Audio("audio/musa.mp3");

var askeinenX = 0;
var askeinenY = 0;

var W = null;
var H = null;

var VEL = 1;

console.log("JOO");

var deadCounter = 0;
var dead = false;
var wiiner = false;
var wiinerCount = 0;

var voitit = null;
var joulua = null;
var kortti = null;
var yrita = null;

function initCanvas() {
  audio.play();
  // Etsitään Canvas-elementti, ja haetaan sen 2d-konteksti
  canvas = document.querySelector( "canvas" );
  context = canvas.getContext( "2d" );
  
  
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  
  // Ei aloiteta peliä, jos selain ei tue 2d-piirtämistä
  var contextIsSupported = context !== null;
  if (contextIsSupported) {
    console.log("CONTEXT SUPPORED");
    loadImage1();
  }
  runGame();
}

function loadImage1() {
  backImage = new Image();
  backImage.src = 'img/hiihtotausta1.png';
  console.log("LOADED")
}

function jumpOrStruggle() {
  if (!player.test) player.jump(); else player.setAccY(-0.125);
}

function runGame() {
  var setXY = null;
  yrita = document.getElementById("yrita");

  requestAnimationFrame(gameLoop);
    
  function listenToKeyboard() {

    // key 0 == keycode 48
    $(document).keydown(function(e) {
      
      if (!dead) {
        if (setXY==null) {
          if (e.keyCode == 88) {
            // X painettu
            setXY = "x";
          } else if (e.keyCode == 89) {
            // Y painettu
            setXY = "y";

          }
        } else if (e.keyCode > 47 && e.keyCode< 48+10) {
          if (setXY=="x") {
            player.setSpriteX(e.keyCode - 48);
          } else {
            player.setSpriteY(e.keyCode - 48);
          }

          setXY = null;
        }
        if (e.keyCode == 37 && player.test) { player.setAccX(-0.125); }
        if (e.keyCode == 39 && player.test) { player.setAccX(0.125); }
        if (e.keyCode == 38 ) { jumpOrStruggle(); }//player.AccY = -0.125; }
        if (e.keyCode == 40 ) { player.setAccY(0.125); }
        if (e.keyCode == 32) { lineToConsole(); }
        if (e.keyCode == 66) { player.VelX = 0; player.VelY =0; }
        if (e.keyCode == 84) { player.testNot(); }
        if (e.keyCode == 67) { logCoords(); }
        if (e.keyCode == 68) { dead = !dead;}
        //if (e.keyCode == 87) { oletWiineri(); }

      } else {
        dead = false;
        player.recover();
        player.X = 400;
        player.Y = 400;
        player.tuettu = true;
        player.Xoffset = 0;
        player.Yoffset = 0;
        player.VelX = 0;
      }

    });
    $(document).keyup(function(e) {
      
      if (!dead) {
        if (e.keyCode == 37 || e.keyCode == 39) { player.AccX = 0; } 
        else if ((e.keyCode == 40 || e.keyCode == 38) && player.test) { player.setAccY(0); }
      }
    });
  }

  function listenToTouchscreen() {
    $(document).on({ 'touchstart' : function() {
      jumpOrStruggle();
    }});
    $(document).on({ 'touchend' : function() {
      if(player.test) {
        player.setAccY(0);
      }
    }});
  }
  console.log(W)
  
  function gameLoop(time) {
    drawGame();
    requestAnimationFrame(gameLoop);
  }

  function logCoords () {
    var asd = "X : " + player.X + " ; Y : "+ player.Y;
    console.log(asd); 
  }
  
  function drawGame() {
    clearCanvas();
    if (!dead) {
      player.move();
      context.drawImage(backImage,0,0,10502,5715,-150-player.Xoffset,-150-player.Yoffset,10502*2,5715*2);
      player.draw();
      suihku.draw();
      wiinerTest();
      player.checkDead();
    } else {
      drawDead();
    }
  }

  // Check whether the player has won the game
  function wiinerTest() {
      if (player.X> 20609.05873973346 && player.Y < 11141.100369542128 && !wiiner) { 
        oletWiineri(); 
      } else if (wiiner) {
        wiinerCount += 1;
        //voitit pelin
        if (wiinerCount < 420) {
          voitit.style.opacity = Math.min(1.0, wiinerCount/70);
        } else if (wiinerCount < 609) {
          //lahjakortti
          joulua.style.opacity = Math.min(1.0, (wiinerCount-420)/70);
        } else if (wiinerCount<1500) {
          kortti.style.opacity = Math.min(1.0, (wiinerCount-609)/70);
        // hyvää joulua

      }
    }
  }

  function oletWiineri() {
    wiiner = true;
    voitit = document.getElementById("voitit");
    joulua = document.getElementById("joulua");
    kortti = document.getElementById("kortti");
  }

  function drawDead() {
    if (dead) {
      deadCounter += 1;
      var shade = 1-0.6*((Math.max(deadCounter,100) ) / 100 );
      ctx.fillStyle = 'rgb(' + Math.floor(70*shade) + ',' + Math.floor(50*shade) + ',' + Math.floor(shade*220) + ')';;
      ctx.fillRect(0,0,W,H);
    }
  }

  function lineToConsole() {
    console.log( '['+askeinenX+ ',' +askeinenY +',' +(player.Y-askeinenY)/(player.X-askeinenX)+','+player.X+'],' ) ;
    askeinenX = player.X;
    askeinenY = player.Y;
  }

  function clearCanvas() {
    context.clearRect(0, 0, W, H); // clear canvas
  }

  listenToKeyboard();
  listenToTouchscreen();
}