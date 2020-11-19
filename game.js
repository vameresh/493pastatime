let game_2048 = {
  template: '<iframe src="https://funhtml5games.com?embed=2048bit" style="width:530px;height:690px;border:none;" frameborder="0" scrolling="no"></iframe>'
}

let space_invaders = {
  template: '<iframe src="https://funhtml5games.com?embed=spaceinvaders" style="width:800px;height:550px;border:none;" frameborder="0" scrolling="no"></iframe>'
}

let infinite_runner = {
  template: '<iframe src="https://funhtml5games.com?embed=pacmandash" style="width:640px;height:350px;border:none;" frameborder="0" scrolling="no"></iframe>'
}

let tetris = {
  template: '<iframe src="https://funhtml5games.com?embed=tetris" style="width:800px;height:490px;border:none;" frameborder="0" scrolling="no"></iframe>'
}

let games = new Vue({ 
  el: '#games',
  components: {
    "game_2048": game_2048,
    "space_invaders": space_invaders,
    "infinite_runner": infinite_runner,
    "tetris": tetris
  }  
})

