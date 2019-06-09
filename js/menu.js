var menuState = { preload:precarregar, create:criar};

	function precarregar(){
		game.load.audio('musicmenu','musics/zombienick.mp3');
		game.load.image('fundo','assets/fundomenu.png');
		game.load.image('button','assets/playgame.png');
		game.load.image('button2', 'assets/comojogar.png');
		game.load.image('button3', 'assets/modos.png');

	}
	var musica;
function criar(){

	  musica = game.add.audio('musicmenu');
	  musica.play();

		game.add.sprite(0,0,'fundo');

		button = game.add.button(game.world.centerX -115, 150, 'button', vaiJogar);
		button2 = game.add.button(game.world.centerX +81, 390, 'button2', tutorial);
		button3 = game.add.button(game.world.centerX -271, 388, 'button3', teste);



}

function vaiJogar(){
	 musica.volume = 0.2
		game.state.start('jogo');
	}

function tutorial(){
		game.state.start('tutorial');

	}

	function teste(){
		musica.volume = 0.3;
		game.state.start('modos');
	}
