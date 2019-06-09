	var fimState = { create:criar}

	function criar()

	{

		texto = game.add.text(140,30,'0',{fontSize:'25px',fill:'blue'});

		var texto2 = game.add.text(350, 250, "JOGAR NOVAMENTE", {fill: 'white'});
		texto2.inputEnabled = true;
		texto2.events.onInputDown.add(inicio, this);

	}
	function inicio()
	{
		game.state.start('inicio');
	}
