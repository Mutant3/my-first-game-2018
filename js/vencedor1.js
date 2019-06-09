var vencedor1State = {preload:precarregar, create:criar};

function precarregar(){
  game.load.image("win","telas/vencedor1.png");
}

function criar(){
  game.add.sprite(0,0,"win");
}
