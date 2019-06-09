var modosState = {
	preload:precarregar, create:criar};

	function precarregar(){
		game.load.image("mods",'assets/mods.png');
	}

	function criar(){

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0,0,"mods");

	var modo1 = game.add.text(90,130,'MODO PRINCIPAL',{fontSize:'30px',fill:'black'});
	modo1.inputEnabled = true;
	modo1.events.onInputDown.add(jogar, this);

	var modo2 = game.add.text(510,130,'MODO 1X1',{fontSize:'30px',fill:'black'});
	modo2.inputEnabled = true;
	modo2.events.onInputDown.add(jogarx1, this);

	var modo3 = game.add.text(255,400,'Em Desenvolvimento',{fontSize:'30px',fill:'blue'});


	}
	function jogar(){
		game.state.start('jogo');
	}

	function jogarx1(){
		game.state.start('modo1x1');
	}
