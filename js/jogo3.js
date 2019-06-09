var game = jogotesteState = {
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




	plataformas = game.add.group();
	plataformas.enableBody = true;

	var chao = plataformas.create(0, game.world.height-45, 'plataforma');


	chao.body.immovable = true;
	chao.scale.setTo(2, 2);

	var bloco = plataformas.create(190,380,'plataforma');
	bloco.body.immovable = true;





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

	estrelas = game.add.group();   ///faz as estrelas colledirem
	estrelas.enableBody = true;

	game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, carregarEstrelas, this);

}

function atualizar(){
////////////////////////////////personagem 1 ////////////////////////////////////////////////
	var colideplataforma = game.physics.arcade.collide(personagem, plataformas);
	var colideestrela = game.physics.arcade.collide(personagem, estrelas, pegarEstrela, null, this);
	var colideestrelas = game.physics.arcade.collide(estrelas, plataformas);
	var colidediamante = game.physics.arcade.collide(personagem, diamante, pegarDiamante, null, this);
	var colidestar = game.physics.arcade.collide(personagem, redstar, pegarStar, null, this);

	var colidediamante2 = game.physics.arcade.collide(diamante,plataformas);
	var colidestar = game.physics.arcade.collide(redstar, plataformas);

////////////////////////////////////////personagem 2 /////////////////////////////////////////////
	var colideplataforma2 = game.physics.arcade.collide(personagem2, plataformas);
	var colideestrela = game.physics.arcade.collide(personagem2, estrelas, pegarEstrela2, null, this);
	var colideestrelas = game.physics.arcade.collide(estrelas, plataformas);
	var colidediamante = game.physics.arcade.collide(personagem2, diamante, pegarDiamante2, null, this);
	var colidestar = game.physics.arcade.collide(personagem2, redstar, pegarStar2, null, this);


/////////////////////////////////////~~~~~~~~~~////////////////////////////////////////////////

	if(A.isDown){
		personagem.body.velocity.x = -150;

		personagem.animations.play("left");
	}
	else if(D.isDown){
		personagem.body.velocity.x = 150;
		personagem.animations.play("right");
	}
	else if(W.isDown && colideplataforma){
		personagem.body.velocity.y = -390;
		personagem.animations.play("up");
	}
	else{
		personagem.body.velocity.x = 0;
		personagem.animations.play("parado");
		}
//////////////////////////personagem 2////////////////////////////////////////////
	if (cursors.left.isDown){
		personagem2.body.velocity.x = -150;
		personagem2.animations.play("left");
	}
	else if(cursors.right.isDown){
		personagem2.body.velocity.x = 150;
		personagem2.animations.play("right");
	}
	else if(cursors.up.isDown && colideplataforma2){
		personagem2.body.velocity.y = -390;
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
	texto.text ++;
}

if(estrelas.countDead() == 2){
		carregarStar();
	}

if(estrelas.countDead() == 12){
	carregarDiamond();

	}
}

function pegarEstrela2(personagem2, estrela){
	if (estrela.kill()){
		texto2.text ++;
	}
	if(estrelas.countDead() == 2){
			carregarStar();
		}

	if(estrelas.countDead() == 12){
		carregarDiamond();

	}
}



function pegarDiamante(personagem, diamante){
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

function pegarDiamante2(personagem2, diamante){
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

function pegarStar(personagem, redstar){
	if(redstar.kill()){
		texto.text --;
		carregarStar();
	}
}

function pegarStar2(personagem2, redstar){
	if(redstar.kill()){
		texto2.text --;
		carregarStar();
	}
}



////////////////////////////////////Carregar assets/////////////////////////////////////////////
function carregarStar(){
	redstar = game.add.group();

	redstar.enableBody = true;

	for(var i=0; i<1; i++){
		var s = redstar.create(0, 215, 'redstar');
		s.body.gravity.y = 0;
		s.body.bounce.y = 0.6;
		s.body.velocity.x = 500;
		s.body.collideWorldBounds = true;
		s.body.bounce.setTo(1,1);
	}
}


function carregarDiamond(){
	diamante = game.add.group();

	diamante.enableBody = true;

	for(var i=0; i<1; i++){
		var d = diamante.create(Math.random() * 800, Math.random()*100*-1, 'diamante');
		d.body.gravity.y = 100;
		d.body.velocity.x = Math.random()*(200 - (-200)) + (-200);
		d.body.collideWorldBounds = true;
		d.body.bounce.setTo(0.7)


	}
}
function carregarEstrelas(){
	for(var i=0; i<1; i++){
		var e = estrelas.create(Math.random() * 700, Math.random() *100*-8, 'estrela');
		e.body.gravity.y = Math.random()*(100 - 60) + 60;
		e.body.collideWorldBounds = true;
		e.body.velocity.x = Math.random()*(200 - (-200)) + (-200);
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
