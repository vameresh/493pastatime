var settings_open = false;

let tomatoSetup = {
    template:`
    <div>
        <label>{{label}}:</label>
        <div @click = "redirect" class= "timer-input">
            {{hours | digitify }}H {{minutes | digitify }}M {{seconds | digitify}}S
        </div>
        <input type="number" v-model="input"  @change= "commit" @input="update" class="hidden-input" ref="input"></input>
    </div>
    `,
    props: ["type"],
    data: function(){
        return{
            seconds: 0,
            minutes: 0,
            hours: 0,
            input:null,
            label: null,
        }
    },
    methods: {
        redirect(){
            this.$refs.input.focus();
        },
        update(){
            if(this.input.length > 6){
                this.input = this.input.slice(1);
            }
            if(this.input.length > 4){
                this.hours = this.input.slice(0, this.input.length-4);
                this.minutes = this.input.slice(this.input.length-4, this.input.length-2);
                this.seconds = this.input.slice(this.input.length-2, this.input.length);
            }
            else if(this.input.length > 2){
                this.hours = 0;
                this.minutes = this.input.slice(0, this.input.length-2);
                this.seconds = this.input.slice(this.input.length-2, this.input.length);
            }
            else if(this.input.length > 0){
                this.hours = 0;
                this.minutes = 0;
                this.seconds = this.input.slice(0, this.input.length);
            }
            else{
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
            }
            this.commit();
        },
        commit(){
            let time = this.hours * 3600 + this.minutes * 60 + this.seconds * 1;
            if(this.type === "work"){
                localStorage.setItem("work-time", time);
            }
            if(this.type === "break"){
                localStorage.setItem("break-time", time);
            }
            
        }
    },
    created(){
        this.label = (this.type === "work") ? "Work Time" : "Break Time";

        if(this.type === "work"){
            if (localStorage.getItem("work-time") !== null) {
                let time = localStorage.getItem('work-time');
                let hours = parseInt(time / 3600);
                let minutes = parseInt((time % 3600) / 60);
                let seconds = parseInt(time % 3600 % 60)
                this.hours = hours;
                this.minutes = minutes;
                this.seconds = seconds;
                return;
            }
        }

        if(this.type === "break"){
            if (localStorage.getItem("break-time") !== null) {
                let time = localStorage.getItem('break-time');
                let hours = parseInt(time / 3600);
                let minutes = parseInt((time % 3600) / 60);
                let seconds = parseInt(time % 3600 % 60)
                this.hours = hours;
                this.minutes = minutes;
                this.seconds = seconds;
                return;
            }
        }
        this.minutes = (this.type == "work") ? 25 : 5;
    },
    filters: {
        digitify(input){
            if(!input){
                return "00";
            }
            if(input.length < 2){
                return  "0" + input;
            }
            return input;
        }
    }
}

let tomatoTimer = {
    template: `
        <div :class="divSize">
            <div :class="countdownLoc">{{time | clockify}}</div>
            <img :class="size" class="fill" src="images/tomatoFill.svg" />
            <div :class="size" class = "cover" v-bind:style="{ height: increment }" />
            <img :class="size" class="outline"  src="images/tomatoOutline.svg" />   
            <div :class="buttonLoc">
                <input type="image" src="images/home.svg" @click="home" />
                <input type="image" src="images/play.svg" v-if="!is_running" @click="start" />
                <input type="image" src="images/pause.svg" v-if="is_running"  @click="pause" />
                <input type="image" src="images/restart.svg" @click="restart" />
                <input type="image" src="images/skip.svg" @click="skip" />
            </div>
        </div>
    `,
    props:["size", "type"],
    data: function(){
        return {
            is_running: false,
            timer: null,
            time: 0,
            set_time: 0
        }
    },
    computed:{
        countdownLoc(){
            return (this.size == "small") ? "countdown-left" : "countdown-mid";
        },
        buttonLoc(){
            return (this.size == "small") ? "buttons-right" : "buttons-bottom";
        },
        divSize(){
            return (this.size == "small") ?  "wide" : this.size;
        },
        increment(){
            let percent = 1- this.time / this.set_time;
            return percent * 100 + '%';
        }
    },
    created() {
        if(this.type === "work"){
            if (localStorage.getItem("work-time") !== null){
                this.set_time = localStorage.getItem('work-time');
            }
            else{
                this.set_time = 1500;
            }
        }

        if(this.type === "break"){
            if (localStorage.getItem("break-time") !== null){
                this.set_time = localStorage.getItem('break-time');
            }
            else{
                this.set_time = 300;
            }
        }
        this.time = this.set_time;
        this.start();
    },
    methods: {
        start(){
            this.is_running = true;

            this.timer = setInterval(()=>{
                if(this.time > 0){
                    --this.time;
                }
                else{
                    this.restart();
                    this.done();
                }
            },1000)
        },
        pause(){
            this.is_running = false;
            clearInterval(this.timer);
        },
        restart(){
            this.pause();
            this.timer = null;
            if(this.type === "work"){
                if (localStorage.getItem("work-time") !== null){
                    this.set_time = localStorage.getItem('work-time');
                }
                else{
                    this.set_time = 1500;
                }
            }
    
            if(this.type === "break"){
                if (localStorage.getItem("break-time") !== null){
                    this.set_time = localStorage.getItem('break-time');
                }
                else{
                    this.set_time = 300;
                }
            }
            this.time = this.set_time;
        },
        skip(){
            this.restart();
            if(this.type === "work"){
                window.location.href = "game.html";
            }
            if(this.type === "break"){
                window.location.href = "work.html";
            }
        },
        done(){
            this.restart();
        },
        home(){
            this.restart();
            window.location.href = "index.html";
        }
    },
    filters: {
        clockify: function(input){
            let time = parseInt(input);
            let hours = parseInt(time / 3600);
            let minutes = parseInt((time % 3600) / 60);
            let seconds = parseInt(time % 3600 % 60)
            if(hours < 10){
                hours = "0" + hours;
            }
            if(minutes < 10){
                minutes = "0" + minutes;
            }
            if(seconds < 10){
                seconds = "0" + seconds;
            }
            return hours + "H " + minutes + "M " + seconds + "S";
        }
    }
}

let gameFrame = {
    template: `
    <div v-html = "game.src" id="game-frame" class="game-frame">
    </div>
    `,
    data: function(){
        return{
            game:null
        }
    },
    created(){
        let found = false;
        let games = JSON.parse(localStorage.getItem("games"));
        games.forEach(game => {
            if(game.selected){
                if(!game.played && !found){
                    game.played = true;
                    this.game = game;
                    found=true;
                }
                else{
                    game.played = false;
                }
            }
        });
        if(!found){
        games.forEach(game => {
            if(!game.played && !found){
                game.played = true;
                this.game = game;
                found=true;
            }
        });
        }
        $("#game-frame").html(this.game.src);
        localStorage.setItem("games", JSON.stringify(games));
    },
    methods:{
        find_game(){
            
        }
    }
}

let gameList = {
    template: `
    <div class="game-list">
        <label>Select Break:</label>
        <div class="row" v-for="i in Math.ceil(games.length / 2)">
            <div class="col-sm-6" v-for="game in games.slice((i - 1) * 2, i * 2)">
            <p :class="'class-'+ game.name">{{game.name}}</p>
            <img :class="game.name" class= "game-thumbnail" :src=game.image />
            </div>
        </div>
    </div>`,
    created(){
        this.games = JSON.parse(localStorage.getItem("games"));
    },
    data: function(){
        return {
            games: null
        }
    }
}

let gameGrid = {
    template: `
    <div id="game-grid" class="game-grid">
        <div class="row" v-for="i in Math.ceil(games.length / 4)">
            <div class="col-sm-3" v-for="game in games.slice((i - 1) * 4, i * 4)">
            <p :class="'class-'+ game.name">{{game.name}}</p>
            <img :class="game.name" class= "game-thumbnail" :src=game.image />
            </div>
        </div>
    </div>`,
    props:["display"],
    created(){
        this.games = JSON.parse(localStorage.getItem("games"));
    },
    data: function(){
        return {
            games: null
        }
    }
}

var app = new Vue({
    el:"#app",
    components: {
        "tomato-timer": tomatoTimer,
        "tomato-setup": tomatoSetup,
        "game-grid": gameGrid,
        "game-list": gameList,
        "game-frame": gameFrame,
    }
});


function closeSettings(){
    settings_open = false;
    $("#settings-panel").animate({left: '-410px'}, 500);
    $("#settings-icon").animate({left: '0px'}, 500);
    $("#settings-icon").css('transform', 'rotate(0deg)')
}

function openSettings(){
    settings_open = true;
    $("#settings-panel").animate({left: '0px'}, 500);
    $("#settings-icon").animate({left: '400px'}, 500);
    $("#settings-icon").css('transform', 'rotate(180deg)')
}

function selectGame(name){
    let id = "." + name;
    let title = ".class-" + name;
    let games = JSON.parse(localStorage.getItem("games"));
    const game = games.filter((game) => { return game.name === name; });
    game[0].selected=true;
    $(id).css({
        "transform": "translateY(4px)",
        "box-shadow": "0 3px black",
    });
    $(title).css({
        "font-weight": "bold"
    });
    if(name==="None"){
        games.forEach(game => {
            if(game.name !== "None"){
                game.selected = false;
                deselectGame(game.name);
            }
        });
    }else{
        games.forEach(game => {
            if(game.name === "None"){
                game.selected = false;
                deselectGame(game.name);
            }
        });
    }
    localStorage.setItem("games", JSON.stringify(games));
}

function deselectGame(name){
    let id = "." + name;
    let title = ".class-" + name;
    let games = JSON.parse(localStorage.getItem("games"));
    const game = games.filter((game) => { return game.name === name; });
    game[0].selected=false;
    $(id).css({
        "transform": "translateY(0px)",
        "box-shadow": "0 7px black",
    });
    $(title).css({
        "font-weight": "normal"
    });
    localStorage.setItem("games", JSON.stringify(games));
}

$

$(document).ready(function (){

    console.log("set")
    //localStorage.setItem("gameset", "false");
    let games = JSON.parse(localStorage.getItem("games"));
    games.forEach(game => {
        if(game.selected){
            selectGame(game.name);
        }
        else{
            deselectGame(game.name);
        }
    });


    $("#settings-done-btn").click(closeSettings);

    $("#settings-icon").click(function(){
    if(settings_open){
        closeSettings();
    }
    else{
        openSettings()
    }

    });
    
    $( "#game-grid").toggle();

    $("#game-button").click(function(){
        console.log("toggle")
        $( "#game-grid" ).slideToggle( "fast", function() {
            // Animation complete.
        });
    })

    $(".game-thumbnail").click(function(){
        let name = $(this).attr('class');
        name = name.split(" ")[1]
        console.log(name)
        let games = JSON.parse(localStorage.getItem("games"));
        const game = games.filter((game) => { return game.name === name; });
        if(game[0].selected){
            deselectGame(name);
        }
        else{
            selectGame(name);
        }
        
    });

    $(document).mousedown(function(e) 
    {
        if (!$("#settings-panel").is(e.target) && $("#settings-panel").has(e.target).length === 0) {
            if (!$("#settings-icon").is(e.target) && $("#settings-icon").has(e.target).length === 0) {
                if(settings_open){
                    closeSettings();
                }
            }
        }
    });
})

