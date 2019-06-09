var game = jogoState = {
	preload:precarregar, create:criar, update: atualizar};

var estrela;
var redstar;
var estrela2;
var estrelas;
var plataformas;
var cursors;
var diamante;
var texto;
var texto2;
var vencedor2;
var textoplayer1;
var estrelasazuis;
var bluestar;
var velocidade_personagem1 = 170;
var velocidade_personagem11 = -170;
var velocidade_personagem2 = 170;
var velocidade_personagem22 = -170;




function precarregar(){
game.load.image("ceu","assets/fundo22.png");
game.load.image("plataforma","assets/platform2.png");
game.load.image("div1","assets/faixa.png");
game.load.image("button1","assets/botaomenu.png");
game.load.image("estrela",'assets/star.png');
game.load.image("redstar",'assets/stared.png');
game.load.image("bluestar","assets/bluestar.png");
game.load.image("greenstart","assets/greenstart.png");
game.load.image("orangestar","assets/orangestar.png");
game.load.image("diamante", 'assets/diamond.png');
game.load.spritesheet("dude", 'assets/dudefire.png', 32, 48);
game.load.spritesheet("dude2", 'assets/icedude.png', 32, 48);
game.load.image("win","telas/vencedor1.png");
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
	game.add.sprite(0,0,"div1");
	game.add.sprite(0,0,"button1");




	plataformas = game.add.group();
	plataformas.enableBody = true;

	var chao = plataformas.create(0, game.world.height-40, 'plataforma');


	chao.body.immovable = true;
	chao.scale.setTo(2, 2);

	var bloco = plataformas.create(190,400,'plataforma');
	bloco.body.immovable = true;
	bloco = plataformas.create(-150,250,'plataforma');
	bloco.body.immovable = true;

	var bloco2 = plataformas.create(460,220,'plataforma');
	bloco2.body.immovable = true;
	bloco2 = plataformas.create(-150,250,'plataforma');
	bloco2.body.immovable = true;



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
	texto = game.add.text(330,50,'0',{fontSize:'30px',fill:'blue'});
	texto2 = game.add.text(430,50,'0',{fontSize:'30px',fill:'red'});


	estrelas = game.add.group();
  estrelas.enableBody = true;

	redstar = game.add.group();
  redstar.enableBody = true;

	estrelasazuis = game.add.group();
	estrelasazuis.enableBody = true;

	game.time.events.repeat(Phaser.Timer.SECOND * 1, 32, carregarEstrelas, this);

	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(20 - 10) + 10, 1, carregarStarAzul, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(70 - 55) + 55, 1, carregarStarAzul, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(100 - 80) + 80, 1, carregarStarAzul, this);

	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(30 - 20) + 20, 1, carregarStar, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(35 - 25) + 25, 1, carregarStar, this);
	game.time.events.repeat(Phaser.Timer.SECOND * Math.random()*(50 - 45) + 45, 1, carregarStar, this);






}

function atualizar(){
////////////////////////////////personagem 1 ////////////////////////////////////////////////
	var colideplataforma = game.physics.arcade.collide(personagem, plataformas);
	var colideestrela = game.physics.arcade.collide(personagem, estrelas, getEstrela, null, this);
	var colideestrelas = game.physics.arcade.collide(estrelas, plataformas);
	var colidediamante = game.physics.arcade.collide(personagem, diamante, getDiamante, null, this);
	var colidestar = game.physics.arcade.collide(personagem, redstar, getStar, null, this);
	var colidbluestar = game.physics.arcade.collide(personagem, estrelasazuis, pegarBlueStar, null, this);

	var colidediamante2 = game.physics.arcade.collide(diamante,plataformas);
	var colidestar = game.physics.arcade.collide(redstar, plataformas);
	var colidebluestar2 = game.physics.arcade.collide(estrelasazuis, plataformas);


////////////////////////////////////////personagem 2 /////////////////////////////////////////////
	var colideplataforma2 = game.physics.arcade.collide(personagem2, plataformas);
	var colideestrela = game.physics.arcade.collide(personagem2, estrelas, getEstrela2, null, this);
	var colideestrelas = game.physics.arcade.collide(estrelas, plataformas);
	var colidediamante = game.physics.arcade.collide(personagem2, diamante, getDiamante2, null, this);
	var colidestar = game.physics.arcade.collide(personagem2, redstar, getStar2, null, this);
	var colidbluestar2 = game.physics.arcade.collide(personagem2, estrelasazuis, pegarBlueStar2, null, this);



/////////////////////////////////////~~~~~~~~~~////////////////////////////////////////////////
if(A.isDown){
	personagem.body.velocity.x = velocidade_personagem11;

	personagem.animations.play("left");
}
else if(D.isDown){
	personagem.body.velocity.x = velocidade_personagem1;
	personagem.animations.play("right");
}
else if(W.isDown && colideplataforma){
	personagem.body.velocity.y = -380;
	personagem.animations.play("up");
}
else{
	personagem.body.velocity.x = 0;
	personagem.animations.play("parado");
	}
//////////////////////////personagem 2////////////////////////////////////////////
if (cursors.left.isDown){
	personagem2.body.velocity.x = velocidade_personagem22;
	personagem2.animations.play("left");
}
else if(cursors.right.isDown){
	personagem2.body.velocity.x = velocidade_personagem2;
	personagem2.animations.play("right");
}
else if(cursors.up.isDown && colideplataforma2){
	personagem2.body.velocity.y = -380;
	personagem2.animations.play("up");
}
else{
	personagem2.body.velocity.x = 0;
	personagem2.animations.play("parado");
	}
}

//////////////////////////////////////////////////////////////////////////////////
function getEstrela(personagem, estrela){
	if (estrela.kill()){
	texto.text ++;
}

if(estrelas.countDead() == 32){
	carregarDiamond();

	}
}

function getEstrela2(personagem2, estrela){
	if (estrela.kill()){
		texto2.text ++;
	}

	if(estrelas.countDead() == 32){
		carregarDiamond();

	}
}

function getDiamante(personagem, diamante){
	if(diamante.kill()){
		texto.text ++;
		texto.text ++;
		texto.text ++;
	}
	if(parseInt(texto.text) > parseInt(texto2.text)){  ////////////////////
	  	personagem.body.moves = false;
			personagem2.body.moves = false;
		  game.add.sprite(0,0,"win");
			ravanche = game.add.button(game.world.centerX +340, 10, 'revanche', reload);
			gomenu = game.add.button(game.world.centerX -400, 10, 'menu', goMenu);

	}
	if(parseInt(texto2.text) > parseInt(texto.text)){  ////////////////////
		personagem.body.moves = false;
		personagem2.body.moves = false;
		game.add.sprite(0,0,"win2");
		ravanche = game.add.button(game.world.centerX +340, 10, 'revanche', reload);
		gomenu = game.add.button(game.world.centerX -400, 10, 'menu', goMenu);
	}
}

function getDiamante2(personagem2, diamante){
	if(diamante.kill()){
		texto2.text ++;
		texto2.text ++;
		texto2.text ++;
	}
	if(parseInt(texto2.text) > parseInt(texto.text)){  ////////////////////
		personagem.body.moves = false;
		personagem2.body.moves = false;
		game.add.sprite(0,0,"win2");
		ravanche = game.add.button(game.world.centerX +330, 15, 'revanche', reload);
		gomenu = game.add.button(game.world.centerX -400, 10, 'menu', goMenu);
	}
	if(parseInt(texto.text) > parseInt(texto2.text)){  ////////////////////
		personagem.body.moves = false;
		personagem2.body.moves = false;
		  game.add.sprite(0,0,"win");
			ravanche = game.add.button(game.world.centerX +340, 10, 'revanche', reload);
			gomenu = game.add.button(game.world.centerX -400, 10, 'menu', goMenu);
	}
}

function getStar(personagem, redstar){
	if(redstar.kill()){
		texto.text --;
	}
}

function getStar2(personagem2, redstar){
	if(redstar.kill()){
		texto2.text --;
	}
}

function pegarBlueStar(personagem, bluestar){
	if (bluestar.kill()){
		velocidade_personagem1 = velocidade_personagem1 + 90;
		velocidade_personagem11 = velocidade_personagem11 + -90;
		}
}

function pegarBlueStar2(personagem2, bluestar){
	if (bluestar.kill()){
		velocidade_personagem2 = velocidade_personagem2 + 90;
		velocidade_personagem22 = velocidade_personagem22 + -90;
	}
}



////////////////////////////////////Carregar assets/////////////////////////////////////////////
function carregarStar(){
	for(var i=0; i<1; i++){
		var s = redstar.create(Math.random()*(800 - 0) + 0, Math.random()*(500 - 0) + 0, 'redstar');
		s.body.gravity.y = 100;
		s.body.bounce.y = 0.6;
		s.body.velocity.x = Math.random()*(270 - (-270)) + (-270);
		s.body.collideWorldBounds = true;
		s.body.bounce.setTo(1,1)
	}
}

function carregarDiamond(){
	diamante = game.add.group();

	diamante.enableBody = true;

	for(var i=0; i<1; i++){
		var d = diamante.create(Math.random()*(800 - 0) + 0, Math.random()*(500 - 0) + 0, 'diamante');
		d.body.gravity.y = 100;
		d.body.velocity.x = Math.random()*(270 - (-270)) + (-270);
		d.body.collideWorldBounds = true;
		d.body.bounce.setTo(1,0.9)


	}
}
function carregarEstrelas(){

	for(var i=0; i<1; i++){
		var e = estrelas.create(Math.random()*(800 - 0) + 0, Math.random()*(500 - 0) + 0, 'estrela');
		e.body.gravity.y = Math.random()*(100 - 60) + 60;
		e.body.collideWorldBounds = true;
		e.body.velocity.x = Math.random()*(270 - (-270)) + (-270);
		e.body.bounce.setTo(1, 1);

	}
}

function carregarStarAzul(){
	for(var i=0; i<1; i++){
		var e = estrelasazuis.create(Math.random()*(800 - 0) + 0, Math.random()*(500 - 0) + 0, 'bluestar');
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
