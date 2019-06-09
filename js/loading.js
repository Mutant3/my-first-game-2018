/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


	var loadingState = { preload:precarregar, create:criar}

function precarregar()
        {
            game.load.image('ceu', 'assets/fundo2.png');
            game.load.image('plataforma', 'assets/platform.png');
            game.load.image('estrela', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

        }
	function criar()
{
		game.state.start('menu');

	}
