var game = jogotesteState = {
	preload:precarregar, create:criar, update: atualizar};

var estrela;
var redstar;
var estrela2;
var estrelas;
var estrelasazuis;
var plataformas;
var cursors;
var texto;
var texto2;
var vencedor2;
var textoplayer1;
var bluestar;
var velocidadep1 = 150;
var velocidadep11 = -150;
var velocidadep2 = 150;
var velocidadep22 = -150;




function precarregar(){
game.load.image("ceu","assets/fundo2.png");
game.load.image("plataforma","assets/platform.png");
game.load.image("estrela",'assets/star.png');
game.load.image("redstar",'assets/stared.png');
game.load.image("bluestar","assets/bluestar.png");
game.load.image("greenstart","assets/greenstart.png");
game.load.image("orangestar","assets/orangestar.png");
game.load.image("diamante", 'assets/diamond.png');
game.load.spritesheet("dude", 'assets/dude.png', 32, 48);
game.load.spritesheet("dude2", 'assets/dude2.png', 32, 48);
game.load.image("win2","telas/vencedor2.png");
game.load.image("revanche","assets/revanche.png");
game.load.image("menu","assets/menu.png");
}
function criar(){


	cursors = game.input.keyboard.createCursorKeys();
	A = game.input.keyboard.addKey(Phaser.Keyboard.A);
	D = game.input.keyboard.addKey(Phaser.Keyboard.D);
	W = game.input.keyboard.addKey(Phaser.Keyboard.W);


	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,"ceu");




	plataformas = game.add.group();
	plataformas.enableBody = true;

	var chao = plataformas.create(0, game.world.height-35, 'plataforma');


	chao.body.immovable = true;
	chao.scale.setTo(2, 2);






	personagem = game.add.sprite(32,game.world.height -150, 'dude');
	personagem2 = game.add.sprite(732,game.world.height -150, 'dude2');

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
	textoplayer1 = game.add.text(306,20,'Player 1',{fontSize:'20px',fill:'black'});
	textoplayer2 = game.add.text(406,20,'Player 2',{fontSize:'20px',fill:'black'});
	texto = game.add.text(330,50,'400',{fontSize:'30px',fill:'blue'});
	texto2 = game.add.text(430,50,'400',{fontSize:'30px',fill:'red'});

	estrelas = game.add.group();
	estrelas.enableBody = true;

	estrelasazuis = game.add.group();
	estrelasazuis.enableBody = true;




	game.time.events.repeat(Phaser.Timer.SECOND * 1, 40, loadingEstrelas, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(20 - 10) + 10, 1, carregarStarBlue, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(50 - 40) + 15, 1, carregarStarBlue, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(70 - 60) + 45, 1, carregarStarBlue, this);

}

function atualizar(){
////////////////////////////////personagem 1 ////////////////////////////////////////////////
	var colideplataforma = game.physics.arcade.collide(personagem, plataformas);
	var colideestrela = game.physics.arcade.collide(personagem, estrelas, pegarEstrela, null, this);
	var colideestrelas = game.physics.arcade.collide(estrelas, plataformas);
	var colidestar = game.physics.arcade.collide(personagem, estrelasazuis, pegarBlueStar, null, this);

	var colidebluestar2 = game.physics.arcade.collide(estrelasazuis, plataformas);

////////////////////////////////////////personagem 2 /////////////////////////////////////////////
	var colideplataforma2 = game.physics.arcade.collide(personagem2, plataformas);
	var colideestrela = game.physics.arcade.collide(personagem2, estrelas, pegarEstrela2, null, this);
	var colideestrelas = game.physics.arcade.collide(estrelas, plataformas);
	var colidestar = game.physics.arcade.collide(personagem2, estrelasazuis, pegarBlueStar2, null, this);


/////////////////////////////////////~~~~~~~~~~////////////////////////////////////////////////

	if(A.isDown){
		personagem.body.velocity.x = velocidadep11;

		personagem.animations.play("left");
	}
	else if(D.isDown){
		personagem.body.velocity.x = velocidadep1;
		personagem.animations.play("right");
	}
	else if(W.isDown && colideplataforma){
		personagem.body.velocity.y = -350;
		personagem.animations.play("up");
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
	else if(cursors.right.isDown){
		personagem2.body.velocity.x = velocidadep2;
		personagem2.animations.play("right");
	}
	else if(cursors.up.isDown && colideplataforma2){
		personagem2.body.velocity.y = -350;
		personagem2.animations.play("up");
	}
	else{
		personagem2.body.velocity.x = 0;
		personagem2.animations.play("parado");
		}
}
//////////////////////////////////////////////////////////////////////////////////
function pegarEstrela(personagem, estrela){
	if (estrela.kill()){
	texto.text = texto.text - 20;
	}
	if(parseInt(texto.text) == 0){
		personagem.body.moves = false;
		personagem.kill();

	}
}

function pegarEstrela2(personagem2, estrela){
	if (estrela.kill()){
		texto2.text = texto2.text - 20;
	}
	if(parseInt(texto2.text) == 0){
		personagem2.body.moves = false;
		personagem2.kill();
	}

}

function pegarBlueStar(personagem, bluestar){
	if (bluestar.kill()){
		velocidadep1 = velocidadep1 + 100;
		velocidadep11 = velocidadep11 + -100;
		}
}

function pegarBlueStar2(personagem2, bluestar){
	if (bluestar.kill()){
		velocidadep2 = velocidadep2 + 100;
		velocidadep22 = velocidadep22 + -100;
	}
}




////////////////////////////////////Carregar assets/////////////////////////////////////////////
function carregarStarBlue(){
	for(var i=0; i<1; i++){
		var e = estrelasazuis.create(Math.random() * 700, Math.random() *100*-8, 'bluestar');
		e.body.gravity.y = 250;
		e.body.collideWorldBounds = true;
		e.body.velocity.x = Math.random()*(100 - (-100)) + (-100);
		e.body.bounce.setTo(0.9);
	}
}
function loadingEstrelas(){
	for(var i=0; i<1; i++){
		var e = estrelas.create(Math.random() * 700, Math.random() *100*-8, 'estrela');
		e.body.gravity.y = 270;
		e.body.collideWorldBounds = true;
		e.body.velocity.x = Math.random()*(100 - (-100)) + (-100);
		e.body.bounce.setTo(1,0.9);
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
