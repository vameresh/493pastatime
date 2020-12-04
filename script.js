var settings_open = false;
var work_time = 0;

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
                console.log(this.input);
            }
            if(this.input.length > 4){
                this.hours = this.input.slice(0, this.input.length-4);
                this.minutes = this.input.slice(this.input.length-4, this.input.length-2);
                this.seconds = this.input.slice(this.input.length-2, this.input.length);
                console.log(this.hours +":" + this.minutes+ ":" + this.seconds);
            }
            else if(this.input.length > 2){
                this.hours = 0;
                this.minutes = this.input.slice(0, this.input.length-2);
                this.seconds = this.input.slice(this.input.length-2, this.input.length);
                console.log(this.hours +":" + this.minutes+ ":" + this.seconds);
            }
            else if(this.input.length > 0){
                this.hours = 0;
                this.minutes = 0;
                this.seconds = this.input.slice(0, this.input.length);
                console.log(this.hours +":" + this.minutes+ ":" + this.seconds);
            }
            else{
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
                console.log(this.hours +":" + this.minutes+ ":" + this.seconds);
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
        <div>
            <div v-if="type=='work'">
                <div class = "row">
                    <div class = "col-sm">
                        <div class="countdown-font">{{time | clockify}}</div>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-sm">
                        <div class="med">
                            <img class="fill med offset-med" src="images/tomatoFill.svg" />
                            <div class = "cover med offset-med" v-bind:style="{ height: increment }" />
                            <img class="outline med offset-med"  src="images/tomatoOutline.svg" /> 
                        </div>
                    </div>
                </div>
                <div class = "row">
                    <div class = "col-sm">
                        <div>
                            <input type="image" src="images/home.svg" @click="home" />
                            <input type="image" src="images/play.svg" v-if="!is_running" @click="start" />
                            <input type="image" src="images/pause.svg" v-if="is_running"  @click="pause" />
                            <input type="image" src="images/restart.svg" @click="restart" />
                            <input type="image" src="images/skip.svg" @click="skip" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class = "row">
                    <div class = "col-sm-9" align="right">
                        <div class="countdown-font">{{time | clockify}}</div>
                    </div>
                    <div class="col-sm-1 small" align="center">
                        <img class="fill small offset-small" src="images/tomatoFill.svg" />
                        <div class = "cover small offset-small" v-bind:style="{ height: increment }" />
                        <img class="outline small offset-small"  src="images/tomatoOutline.svg" /> 
                    </div>
                    <div class = "col-sm-1" align="left">
                        <input type="image" src="images/home.svg" @click="home" />
                        <input type="image" src="images/play.svg" v-if="!is_running" @click="start" />
                        <input type="image" src="images/pause.svg" v-if="is_running"  @click="pause" />
                        <input type="image" src="images/restart.svg" @click="restart" />
                        <input type="image" src="images/skip.svg" @click="skip" />
                    </div>
                </div>
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
        increment(){
            let height = (this.type==="work") ? 270 : 62;
            let percent = 1- this.time / this.set_time;
            return percent * height + 'px';
        }
    },
    created() {
        this.restart();
        this.start();
    },
    methods: {
        start(){
            this.is_running = true;
            if(this.type==="break"){
                $("#game-frame").css("opacity", "100%");
            }

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
            // TODO sound
            this.restart();
            $("#done-buttons").css("display", "block");
            if(this.type==="break"){
                $("#game-frame").css("opacity", "20%");
                if(!document.hasFocus()){
                    alert("Times Up!")
                }
            }
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
    <div v-html = "src" id="game-frame" class="game-frame">
    </div>
    `,
    data: function(){
        return{
            game:null,
            src:null
        }
    },
    created(){
        let found = false;
        let games = JSON.parse(localStorage.getItem("games"));
        games.forEach(game => {
            if(game.selected){
                console.log("scanning " + game.name)
                if(!game.played && !found){
                    console.log("found " + game.name)
                    game.played = true;
                    this.game = game;
                    found=true;
                }
            }
        });
        if(!found){
            games.forEach(game => {
                if(game.selected){
                    console.log("resetting " + game.name)
                    game.played = false;
                }
            });
            games.forEach(game => {
                if(game.selected){
                    console.log("rescanning " + game.name)
                    if(!game.played && !found){
                        console.log("refound " + game.name)
                        game.played = true;
                        this.game = game;
                        found=true;
                    }
                }
            });
        }
        if(this.game.type === "break"){
            this.src = "<h1> Enjoy your break! <h1>";
            if(this.game.name !== "None"){
                var win = window.open(this.game.src, '_blank');
                if (win) {
                    //Browser has allowed it to be opened
                    win.focus();
                } else {
                    //Browser has blocked it
                    alert('Please allow popups for this website and refresh!');
                }
            }
            // source: https://stackoverflow.com/questions/19851782/how-to-open-a-url-in-a-new-tab-using-javascript-or-jquery

        }
        else{
            this.src = this.game.src;
        }
        localStorage.setItem("games", JSON.stringify(games));
    },
}

let gameGrid = {
    template: `
    <div class ="container">
        <div class="row" v-for="i in Math.ceil(games.length / rowsize)">
            <div align="center" :class="'col-sm-' + 12/rowsize" v-for="game in games.slice((i - 1) * rowsize, i * rowsize)">
                <p :class="'class-'+ game.name">{{game.name}}</p>
                <img :class="game.name" class= "game-thumbnail" :src=game.image />
            </div>
        </div>
    </div>`,
    props:["rowsize"],
    created(){
        this.games = JSON.parse(localStorage.getItem("games"));
    },
    data: function(){
        return {
            games: null
        }
    }
}

let settingsPanel = {
    template: `
    <div>
        <div class="settings-panel" id = "settings-panel">
            <div class = "row">
                <div class = "col-sm">
                    <tomato-setup class = "tomato-input" type="work"></tomato-setup>
                </div>
            </div>
            </br>
            <div class = "row">
                <div class = "col-sm">
                    <tomato-setup class = "tomato-input" type="break"></tomato-setup>
                </div>
            </div>
            </br>
            <div class = "row">
                <div class = "col-sm">
                    <label> Select Break: </label>
                    <game-grid rowsize=2 class="game-list" ></game-grid>
                </div>
            </div>
            </br>
            <div class = "row">
                <div class = "col-sm" align="center">
                    <button id="settings-done-btn" class = "primary-button">Done!</button>
                </div>
            </div>
        </div>
        <input type="image" src="images/settings.svg" class = "settings-icon" id = "settings-icon"></input>
    </div>`,
    components: {
        "tomato-setup": tomatoSetup,
        "game-grid": gameGrid,
    },
}

let doneButtons = {
    template: `
    <div class = "done-buttons" id = "done-buttons">
        <button id="reset-button" class="secondary-button" v-html="secondary" ></button>
        </br>
        <a :href="goto"><button id="next-button" class = "primary-button" v-html="primary" ></button></a>
        </br>
    </div>`,
    props: ["type"],
    computed: {
        primary(){
            if (this.type==="work"){
                return "Go to Break!"
            }
            else{
                return "Go to Work!"
            }

        },
        secondary(){
            if (this.type==="work"){
                return "Continue Work!"
            }
            else{
                return "Continue Break!"
            }
        },
        goto(){
            if (this.type==="work"){
                return "game.html"
            }
            else{
                return "work.html"
            }
        }
    },
}

let customModal = {
    template:`
    <div class="modal-dialog">
        <div class="modal-content">
            <div class = "row">
                <div class = "col-sm-12" align="left">
                    <label align = "left" >Custom Link: </label>
                </div>
            </div>
            <div class = "row">
                <div class = "col-sm-12" align="left">
                    <input class="link-input" type="text" v-model="link"> </text>
                </div>
            </div>
            </br>
            <div class = "row">
                <div class = "col-sm-6" align="center">
                    <button :class="check" class="primary-button" v-on:click="save_close">Save!</button>
                </div>
                <div class = "col-sm-6" align="center">
                    <button class="secondary-button"  v-on:click="close">Cancel!</button>
                </div>
            </div>
        </div>
    </div>`,
    data: function(){
        return {
            link: ""
        }
    },
    methods:{
        close(){
            $('#custom_modal').modal('toggle')
            if(this.link===""){
                deselectGame("Custom");
            }
        },
        save_close(){
            if(this.link === ""){
                return;
            }
            games = JSON.parse(localStorage.getItem("games"));
            games[6]["src"] = this.link;
            localStorage.setItem("games", JSON.stringify(games));
            this.close();
        }

    },
    computed:{
        check(){
            if(this.link === ""){
                return "not-ready"
            }
            return ""
        }
    },
    created(){
        games = JSON.parse(localStorage.getItem("games"));
        console.log(games[6]["src"]);
        this.link = games[6]["src"];
    }
}

var app = new Vue({
    el:"#app",
    components: {
        "tomato-timer": tomatoTimer,
        "tomato-setup": tomatoSetup,
        "game-grid": gameGrid,
        "game-frame": gameFrame,
        "settings-panel": settingsPanel,
        "done-buttons": doneButtons,
        "custom-modal": customModal,
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

    if(name==="Custom" && !game[0].selected) {
        $('#custom_modal').modal('toggle')

    }

    game[0].selected=true;
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


$(document).ready(function (){

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

    $("#done-buttons").css("display", "none");

    $("#settings-done-btn").click(closeSettings);

    $("#settings-icon").click(function(){
        if(settings_open){
            closeSettings();
        }
        else{
            openSettings()
        }
    });

    

    $("#game-button").click(function(){
        console.log("toggle")
        $( "#game-grid" ).slideToggle( "medium", function() {
            // Animation complete.
        });
    })

    $("#time-button").click(function(){
        console.log("toggle")
        $( "#timer-grid" ).slideToggle( "medium", function() {
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

    $("#reset-button").click(function(){
        $("#done-buttons").css("display", "none");
        app.$refs.timer.restart();
        app.$refs.timer.start();
    })


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

