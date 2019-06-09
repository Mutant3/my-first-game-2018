var game = modoXState = {
	preload:precarregar, create:criar, update: atualizar};

var estrelasazuis;
var plataformas;
var cursors;
var texto;
var texto2;
var vencedor2;
var textoplayer1;
var bluestar;
var velocidadep1 = 220;
var velocidadep11 = -220;
var velocidadep2 = 220;
var velocidadep22 = -220;
var bullets;
var bullet1;
var fireRate1 = 250;
var nextFire1 = 0;
var bullets2;
var fireRate2 = 250;
var nextFire2 = 0;
var municao1 = 50;
var municao2 = 50;
var textop1life2;
var blocks;
var plataformkill;
var plataformkills;
var blackstars;
var blackstar;
var tiro;

function precarregar(){
game.load.image("ceu","assets/fundo33.png");
game.load.image("plataforma","assets/plataform3.png");
game.load.image("block","assets/block3.png");
game.load.image("bluestar","assets/bluestar.png");
game.load.image("blackstar","assets/starkill.png");
game.load.image("bullet","assets/orangestar.png");
game.load.image("diamante", 'assets/diamond.png');
game.load.spritesheet("dude", 'assets/dude33.png', 32, 48);
game.load.spritesheet("dude2", 'assets/golddude.png', 32, 48);
game.load.image("win2","telas/vencedor2.png");
game.load.image("revanche","assets/revanche.png");
game.load.image("menu","assets/menu.png");
game.load.audio("tiro","sounds/laser2.mp3");
}
function criar(){


	cursors = game.input.keyboard.createCursorKeys();
	A = game.input.keyboard.addKey(Phaser.Keyboard.A);
	D = game.input.keyboard.addKey(Phaser.Keyboard.D);
	W = game.input.keyboard.addKey(Phaser.Keyboard.W);
	R = game.input.keyboard.addKey(Phaser.Keyboard.R);
	P = game.input.keyboard.addKey(Phaser.Keyboard.P);




	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,"ceu");

	tiro = game.add.audio('tiro');



	plataformas = game.add.group();
	plataformas.enableBody = true;

	blocks = game.add.group();
	blocks.enableBody = true;


	var chao = plataformas.create(750, game.world.height-155, 'plataforma');
	var chao2 = plataformas.create(-750, game.world.height-155, 'plataforma');



	chao.body.immovable = true;
	chao.scale.setTo(2, 2);

	chao2.body.immovable = true;
	chao2.scale.setTo(2, 2);

	var bloco1 = plataformas.create(190,470,'plataforma');
	bloco1.body.immovable = true;

	var bloco2 = plataformas.create(540,220,'plataforma');
	bloco2.body.immovable = true

	var bloco3 = plataformas.create(-195,200,'plataforma');
	bloco3.body.immovable = true;


	var block1 = blocks.create(220, 350, 'block');
	block1.body.immovable = true;

	var block2 = blocks.create(400, 350, 'block');
	block2.body.immovable = true;

	var block3 = blocks.create(400, 100, 'block');
	block3.body.immovable = true;







	personagem = game.add.sprite(10,game.world.height -220, 'dude');
	personagem2 = game.add.sprite(760,game.world.height -220, 'dude2');


//////////////////////////////////////////////////////////////////////////////////////

	game.physics.arcade.enable(personagem);
	personagem.body.bounce.y = 0.3;
	personagem.body.gravity.y = 400;
	personagem.body.collideWorldBounds = true;
	personagem.animations.add('left', [0, 1, 2, 3], 10, true);
	personagem.animations.add('right', [5, 6, 7, 8], 10, true);
	personagem.animations.add('parado', [4], true);

	game.physics.arcade.enable(personagem2);
	personagem2.body.bounce.y = 0.3;
	personagem2.body.gravity.y = 400;
	personagem2.body.collideWorldBounds = true;
	personagem2.animations.add('left', [0, 1, 2, 3], 10, true);
	personagem2.animations.add('right', [5, 6, 7, 8], 10, true);
	personagem2.animations.add('parado', [4], true);




/////////////////////////////////////////////////////////////////////////////////////////
textoplayer1 = game.add.text(300,10,'Player 1',{fontSize:'20px',fill:'#00FF09'});
textop1life = game.add.text(300,34,'Life:',{font:'20px Arial',fill:'black'});
texto = game.add.text(340,30,'400',{fontSize:'25px',fill:'#0022FF'});

textoplayer2 = game.add.text(425,10,'Player 2',{fontSize:'20px',fill:'#00FF09'});
textop2life = game.add.text(425,34,'Life:',{font:'20px Arial',fill:'black'});
texto2 = game.add.text(465,30,'400',{fontSize:'25px',fill:'#FF4D00'});



	estrelasazuis = game.add.group();
	estrelasazuis.enableBody = true;


	//game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(20 - 10) + 10, 1, carregarStarBlue, this);
	//game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(50 - 40) + 15, 1, carregarStarBlue, this);
	//game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(70 - 60) + 45, 1, carregarStarBlue, this);


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(municao1, 'bullet');

		bullets2 = game.add.group();
    bullets2.enableBody = true;
    bullets2.physicsBodyType = Phaser.Physics.ARCADE;
		bullets2.createMultiple(municao2, 'bullet');



		setTimeout(carregarBlackStar, 1000);
}

function atualizar(){
////////////////////////////////personagem 1 ////////////////////////////////////////////////
	var colideplataforma = game.physics.arcade.collide(personagem, plataformas);
	var colideblock = game.physics.arcade.collide(personagem, blocks);
	var colideestrela = game.physics.arcade.collide(personagem, bullets, pegarOrange, null, this);
	var colideblackstar = game.physics.arcade.collide(personagem, blackstars, getBlackStar, null, this);


	var colidebullets = game.physics.arcade.collide(bullets, plataformas);
	var colidebluestar2 = game.physics.arcade.collide(estrelasazuis, plataformas);
	var colidebulletsblocks = game.physics.arcade.collide(bullets, blocks);

////////////////////////////////////////personagem 2 /////////////////////////////////////////////
	var colideplataforma2 = game.physics.arcade.collide(personagem2, plataformas);
	var colideblock2 = game.physics.arcade.collide(personagem2, blocks);
	var colideestrela = game.physics.arcade.collide(personagem2, bullets, pegarOrange2, null, this);
	var colideblackstar = game.physics.arcade.collide(personagem2, blackstars, getBlackStar2, null, this);



/////////////////////////////////////~~~~~~~~~~////////////////////////////////////////////////

	if(W.isDown && colideplataforma || W.isDown && colideblock){
		personagem.body.velocity.y = -350;
		personagem.animations.play("up");
	}
	else if(A.isDown){
		personagem.body.velocity.x = velocidadep11;

		personagem.animations.play("left");
	}
/////////////////tiro//////////////////////////////////////
	else if(R.isDown){
			fire();
			tiro.play();

	}
	else if(D.isDown){
		personagem.body.velocity.x = velocidadep1;
		personagem.animations.play("right");
	}
	else{
		personagem.body.velocity.x = 0;
		personagem.animations.play("parado");
		}
//////////////////////////personagem 2////////////////////////////////////////////
	if (cursors.left.isDown){
		personagem2.body.velocity.x = velocidadep22;
		personagem2.animations.play("left");
	}
	else if(P.isDown){
			fire2();
			tiro.play();
	}
	else if(cursors.right.isDown){
		personagem2.body.velocity.x = velocidadep2;
		personagem2.animations.play("right");
	}
	else if(cursors.up.isDown && colideplataforma2 || cursors.up.isDown && colideblock2){
		personagem2.body.velocity.y = -350;
		personagem2.animations.play("up");
	}
	else{
		personagem2.body.velocity.x = 0;
		personagem2.animations.play("parado");
		}
}
//////////////////////////////////////////////////////////////////////////////////
function pegarOrange(personagem, orange){
	if (orange.kill()){
	texto.text = texto.text - 20;
	}
	if(parseInt(texto.text) == 0){
		personagem.body.moves = false;
		personagem.kill();

	}
}

function pegarOrange2(personagem2, orange){
	if (orange.kill()){
		texto2.text = texto2.text - 20;
	}
	if(parseInt(texto2.text) == 0){
		personagem2.body.moves = false;
		personagem2.kill();
	}

}


function getBlackStar(personagem, blackstar){
	if(blackstar.kill()){
		personagem.kill();
		texto.text = 'Morreu';
	}
}

function getBlackStar2(personagem2, blackstar){
	if(blackstar.kill()){
		personagem2.kill();
		texto2.text = 'Morreu';
	}0
}



function fire() {
if (game.time.now > nextFire1 && bullets.countDead() > 0){
        nextFire1 = game.time.now + fireRate1;

        var bullet1 = bullets.getFirstDead();
				bullet1.enableBody = true;

        bullet1.reset(personagem.x - 8, personagem.y - 8);

				if(personagem.position.x - personagem2.position.x > 10){
					bullet1.body.velocity.x = -250;
					bullet1.body.gravity.y = 30;
					bullet1.body.bounce.setTo(0.8)
				}

				else if(personagem.position.x - personagem2.position.x < 0){
					bullet1.body.velocity.x = 250;
					bullet1.body.gravity.y = 30;
					bullet1.body.bounce.setTo(0.8)
				}


    }
}
function fire2() {
if (game.time.now > nextFire2 && bullets2.countDead() > 0){
        nextFire2 = game.time.now + fireRate2;

        var bullet2 = bullets.getFirstDead();
				bullet2.enableBody = true;

        bullet2.reset(personagem2.x, personagem2.y);

				if(personagem.position.x - personagem2.position.x > 10){
					bullet2.body.velocity.x = 250;
					bullet2.body.gravity.y = 30;
					bullet2.body.bounce.setTo(0.8)
				}

				else if(personagem.position.x - personagem2.position.x < 0){
					bullet2.body.velocity.x = -250;
					bullet2.body.gravity.y = 30;
					bullet2.body.bounce.setTo(0.8)
				}

    }
}


////////////////////////////////////Carregar assets/////////////////////////////////////////////
function carregarBlackStar(){
	blackstars = game.add.group();
	blackstars.enableBody = true;


	for(var i=0; i<45; i++){
		var b = blackstars.create(i*90, 590,"blackstar");
		b.body.collideWorldBounds = true;
		b.body.velocity.x = 400;
		b.body.bounce.setTo(1,1);
	}
}
function carregarStarBlue(){
	for(var i=0; i<1; i++){
		var e = estrelasazuis.create(Math.random() * 700, Math.random() *100*-8, 'bluestar');
		e.body.gravity.y = 250;
		e.body.collideWorldBounds = true;
		e.body.velocity.x = Math.random()*(100 - (-100)) + (-100);
		e.body.bounce.setTo(0.9);
	}
}

function goMenu(){
	game.state.start('menu');
}
function reload(){
	game.state.start('jogo');
}
function acabouJogo(){
	game.state.start('fim');
}
//////////////////////////////////////////////////////////////////////////////////////////////
///ass Luidy.///
