var game = new Phaser.Game(800,600,Phaser.AUTO);
game.state.add('load', loadingState);
game.state.add('menu', menuState);
game.state.add('jogo', jogoState);
game.state.add('fim', fimState);
game.state.add('tutorial', tutorialState);
game.state.add('modos', modosState);
game.state.add('modo1x1', modoXState);



//define estado inicial

game.state.start('menu');
