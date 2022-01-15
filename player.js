var player = {
    dead : false,
  
    X : 400,
    Y : 400,
    VelY : 0,
    VelX : 0,
    AccX : 0,
    AccY : 0,
    Xoffset : 0,
    Yoffset : 0,
    tuettu : true,
    maxSpeed : 5,

    test : false,

    width : 100,
    height : 100,

    spriteX : 6,
    spriteY : 0,

    image : new Image(),
    imageloc : 'goodguys1.png',

    setImLoc : function() { this.image.src = this.imageloc; },
    
    setSpriteX : function(X) { this.spriteX = X; },
    setSpriteY : function(Y) { this.spriteY = Y; },  

    mCounter : 0,   



    checkDead : function() {
        var ongo = this.checkFloor(this.X,this.Y,deads);

        if (ongo && !dead) {
            dead = true;
            yrita.style.opacity = 1.0;
        }
    },

    checkFloor : function (tX,tY,floorArray) {
      var ai = null;    //käsiteltävä objekti
      var bi = this.floorHeight(tX,floorArray);  // lattian korkeus pisteessä
      var palautus = false; // [alkuX, kulmakerroin, loppuX]

        if (bi!=null) {
            //console.log("not null");
            palautus = (Math.abs(tY-10-bi)<10);
            if (palautus) { console.log("true"); }
        }
      
      return palautus;
    },

    floorHeight : function (tX,floorArray) {
      var ai = null;    //käsiteltävä objekti
      var palautus = null;
        for (i = 0; i < floorArray.length; i++) {   // [alkuX, kulmakerroin, loppuX]
            ai = floorArray[i];
        if (ai[0]<=tX) {

          if (ai[3]>=tX) {
            //console.log(i);
            palautus = (tX-ai[0]) * ai[2]+ai[1];
          }
        }
        
        }
      return palautus;
    },

    floorAngle : function (tX,floorArray) {
      var ai = null;    //käsiteltävä objekti
      var palautus = null;  // [alkuX, kulmakerroin, loppuX]
        for (i = 0; i < floorArray.length; i++) { 
            ai = floorArray[i];
        if (ai[0]<=tX) {
          if (ai[3]>=tX) {
            palautus = ai[2];
          }
        }
        
        }
      return palautus;
    },

    move : function () {
        if (Math.abs(this.maxSpeed)>=Math.abs(this.AccX+this.VelX)) this.VelX += this.AccX;
        
        if (!this.test) {
            if (this.tuettu) {
                this.nextH = this.floorAngle(this.X,allFloors);
                this.X += this.VelX;
                
                this.AccX = 0.125*(0.125*0.5 + 0.125 * this.floorAngle(this.X,allFloors)/Math.sqrt(Math.abs(this.floorAngle(this.X,allFloors))) - 0.125*0.25*this.VelX);
                this.asd = this.Y;
                this.reqY = this.floorHeight(this.X,allFloors);
                
                if (this.reqY+50<this.Y+this.VelY || this.reqY == null) { this.Y += this.VelY; this.eiTuettu(); } 
                else { this.Y = this.reqY; }

                this.VelY = this.Y-this.asd;

            } else {
                this.X += this.VelX;
                this.Y += this.VelY;
                this.VelX = 0.998 *this.VelX;
                if (Math.abs(this.maxSpeed)>=Math.abs(this.AccY+this.VelY)) { this.VelY += this.AccY; }
                if (this.checkFloor(this.X,this.Y,allFloors) && this.VelY>0) { this.onTuettu(); }
            }
        } else {
            this.X += this.VelX;
            this.Y += this.VelY;

            if (Math.abs(this.maxSpeed)>=Math.abs(this.AccX+this.VelX) ) { this.VelX += this.AccX; }
            if (Math.abs(this.maxSpeed)>=Math.abs(this.AccY+this.VelY) ) { this.VelY += this.AccY; }
        }
        // OFFSETS

        var borderX = (W / 3);
        var borderY = (H / 3);

        if (this.X-this.Xoffset <= borderX ) {
            //console.log("XOFF");
            this.Xoffset = this.X-borderX;
        } else if (this.X-this.Xoffset>= (W-borderX) ) {
            //console.log("XOFF");
            this.Xoffset = (this.X-W+borderX);
        }
        if (this.Y-this.Yoffset<borderY) {
            this.Yoffset = this.Y-borderY;
        } else if (this.Y-this.Yoffset> H-borderY) {
            this.Yoffset = (this.Y-H+borderY);
        }

        //console.log(this.rockCounter);
        if (this.tuettu && this.rockCounter === 0) {
            this.checkRocks(rocks);
        } else if (this.rockCounter <= 1 && this.rockCounter > 0) {
            this.recover();
        } else if (this.rockCounter > 0) {
            this.rockCounter += -1;
        }
    },

    // Functions for detecting whether the character is supported by the floor
    eiTuettu : function () {
        if (this.rockCounter ===0) this.spriteX = 3;
        this.tuettu = false;
        this.AccY = 0.125*0.5;
        this.AccX = 0;
        console.log(this.AccY);
    },

    onTuettu : function () {
        this.spriteX = 6;
        this.tuettu = true;
        this.AccY = 0 ;
        suihku.land();
        console.log(this.AccY);
    },

    draw : function () {
        this.xW = 50;
        this.yH = 50;
        this.xOff = 0;
        this.yOff = 36;

        this.spriteMove();

        context.drawImage(this.image,this.spriteX*this.xW+ this.xOff,this.spriteY*this.yH+ this.yOff,
            this.xW,this.yH,this.X-this.Xoffset,this.Y-this.Yoffset,this.xW*2,this.yH*2);
    },

    counter : 0,

    spriteMove : function() {
        if (this.spriteX== 6 || this.spriteX == 7) {
            if (Math.random()>1-this.VelY/15) {
                this.counter = (this.counter + 1 ) % 3;
                if (this.counter ===0) this.spriteX = (this.spriteX-6 +1 ) % 2 + 6;
            }
        }
    },

    jump : function () {
      if (this.tuettu && this.rockCounter=== 0) {
        this.VelY = Math.min(0,0.5*this.VelY -3);
        this.eiTuettu();
      }
    },   

    testNot : function () { this.test = !(this.test); console.log("TEST = !TEST"); },

    setAccY : function (ACC) { this.AccY = ACC; },
    setAccX : function (ACC) { this.AccX = ACC; },

    rockCounter : 0,
    hitLenght : 100,

    checkRocks : function (rocks) {
        for (i = 0; i < rocks.length; i++) {   // [alkuX, kulmakerroin, loppuX]
            ai = rocks[i];
            if (Math.abs(ai-this.X) <10) {
                console.log("HIT ROCK");
                this.hitRock();
            }
        }
    },
    hitRock : function () {
        this.rockCounter = 130;
        //sprite
        this.spriteX = 4;
    },
    recover : function () {
        yrita.style.opacity = 0.0;
        console.log("RECOVER");
        this.rockCounter = 0;
        //sprite
        this.spriteX = 6;
    }
}

player.setImLoc();