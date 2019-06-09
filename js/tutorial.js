var tutorialState = { preload:precarregar, create:criar}

function precarregar(){

  game.load.image('tutor','telas/Tutorial.png');
  game.load.image("voltar","assets/voltar.png");


}

function criar(){
  game.add.sprite(0,0,"tutor");
  voltar = game.add.button(game.world.centerX -400, 10, 'voltar', goBack);

}

function goBack(){
  game.state.start('menu');
}
