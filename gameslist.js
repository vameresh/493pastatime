const gamesListTemplate = document.createElement('template');
gamesListTemplate.innerHTML = `
  <style>
    .game-thumbnail {
        height: 100px;
        width: 125px;
        border-radius: 10px;
        margin: 20px;
        margin-top: 5px;
        border: 1px solid black;
    }

    .game-pic {
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }

    .subscript {
        font-size: 15px;
    }

    .gamesList {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
        padding: 10px;
        justify-content: center;
        align-content: center;
    }

    .gamesList > div {
        text-align: center;
    }
  </style>



<div class = "gamesList">
    <div id = "1">
        <div class="subscript">Infinite Runner</div>
            <div class="game-thumbnail" id="game1">
                <img class="game-pic" src="gameicons/infinite-runner.png" />
            </div>
    </div>
    <div id = "2">
        <div class="subscript">TowerBloxx</div>
            <div class="game-thumbnail" id="game2">
                <img class="game-pic" src="gameicons/towerbloxx.png" />
            </div>
    </div>
    <div id = "3">
        <div class="subscript">128</div>
            <div class="game-thumbnail" id="game3">
                <img class="game-pic" src="gameicons/128.png" />
            </div>
    </div>
    <div id = "4">
        <div class="subscript">Space Invaders</div>
            <div class="game-thumbnail" id="game4">
                <img class="game-pic" src="gameicons/space-invaders.png" />
            </div>
    </div>
</div>
`;

class GamesList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(gamesListTemplate.content);
  }
}

customElements.define('games-list-component', GamesList);

function showGames() {
  var x = document.getElementById("games-list");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

