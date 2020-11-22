let games_list= [
    {
        "name": "Snake",
        "image": "images/games/snake.png",
        "src" : '<iframe width="100%" height="100%" src="https://www.addictinggames.com/embed/html5-games/18478" scrolling="no"></iframe>',
        "selected": false,
        "played": false,
    },
    {
        "name": "Asteroid",
        "image": "images/games/asteroid.png",
        "src": "#",
        "selected": false,
        "played": false,
    },
    {
        "name": "Frogger",
        "image": "images/games/frogger.png",
        "src": "#",
        "selected": false,
        "played": false,
    },
    {
        "name": "Youtube",
        "image": "images/games/youtube.png",
        "src": "https://www.youtube.com/",
        "selected": false,
        "played": false,
    },
    {
        "name": "Netflix",
        "image": "images/games/netflix.png",
        "src": "https://www.netflix.com/",
        "selected": false,
        "played": false,
    },
    {
        "name": "Hulu",
        "image": "images/games/hulu.png",
        "src": "https://www.hulu.com/",
        "selected": false,
        "played": false,
    },
    {
        "name": "Custom",
        "image": "images/games/custom.png",
        "src": "#",
        "selected": false,
        "played": false,
    },
    {
        "name": "None",
        "image":  "images/games/none.png",
        "src": "#",
        "selected": false,
        "played": false,
    }
];

console.log(localStorage.getItem("gameset"));

if(localStorage.getItem("gameset") === null || localStorage.getItem("gameset") === 'undefined' || localStorage.getItem("gameset") === false){
    console.log("reset")
    localStorage.setItem("games", JSON.stringify(games_list));
    localStorage.setItem("gameset", "true");
}
