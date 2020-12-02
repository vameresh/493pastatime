let games_list= [
    {
        "name": "Invaders",
        "image": "images/games/invaders.png",
        "src" : '<iframe src="https://funhtml5games.com?embed=spaceinvaders" style="width:800px;height:550px;border:none;" frameborder="0" scrolling="no"></iframe>',
        "selected": false,
        "played": false,
        "type": "game"
    },
    {
        "name": "Tetris",
        "image": "images/games/tetris.png",
        "src": '<iframe src="https://funhtml5games.com?embed=tetris" style="width:800px;height:490px;border:none;" frameborder="0" scrolling="no"></iframe>',
        "selected": false,
        "played": false,
        "type": "game"
    },
    {
        "name": "Frogger",
        "image": "images/games/frogger.png",
        "src": '<iframe src="https://funhtml5games.com?embed=frogger" style="width:420px;height:520px;border:none;" frameborder="0" scrolling="no"></iframe>',
        "selected": false,
        "played": false,
        "type": "game"
    },
    {
        "name": "Youtube",
        "image": "images/games/youtube.png",
        "src": "https://www.youtube.com/",
        "selected": false,
        "played": false,
        "type": "break"
    },
    {
        "name": "Netflix",
        "image": "images/games/netflix.png",
        "src": "https://www.netflix.com/",
        "selected": false,
        "played": false,
        "type": "break"
    },
    {
        "name": "Hulu",
        "image": "images/games/hulu.png",
        "src": "https://www.hulu.com/",
        "selected": false,
        "played": false,
        "type": "break"
    },
    {
        "name": "Custom",
        "image": "images/games/custom.png",
        "src": "#",
        "selected": false,
        "played": false,
        "type": "break"
    },
    {
        "name": "None",
        "image":  "images/games/none.png",
        "src": "#",
        "selected": false,
        "played": false,
        "type": "break"
    }
];

console.log(localStorage.getItem("gameset"));

if(localStorage.getItem("gameset") === null || localStorage.getItem("gameset") === 'undefined' || localStorage.getItem("gameset") === false){
    console.log("reset")
    localStorage.setItem("games", JSON.stringify(games_list));
    localStorage.setItem("gameset", "true");
}
