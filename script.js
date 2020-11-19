var settings = {
    break:300,
    work: 1500,
    selected_games: []
}

let tomatoSetup = {
    template:`
    <div>
        <div @click = "redirect" class= "timer-input">
            {{hours | digitify }}H {{minutes | digitify }}M {{seconds | digitify}}S
        </div>
        <input type="number" v-model="input"  @change= "commit" @input="update" class="hidden-input" ref="input"></input>
    </div>
    `,
    props: ["is_work"],
    data: function(){
        return{
            seconds: null,
            minutes: null,
            hours: null,
            input:null,
            settings
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
        },
        commit(){
            let time = this.hours * 3600 + this.minutes * 60 + this.seconds * 1;
            if(this.is_work){
                console.log("updated work")
                this.settings.work = time;
            }
            else{
                console.log("updated work")
                this.settings.break = time;
            }
        }
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
                <input type="image" src="images/play.svg" v-if="!is_running" @click="start" />
                <input type="image" src="images/pause.svg" v-if="is_running"  @click="pause" />
                <input type="image" src="images/restart.svg" @click="restart" />
            </div>
        </div>
    `,
    props:["size", "is_work"],
    data: function(){
        return {
            is_running: false,
            timer: null,
            settings,
            time: 0,
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
            let set_time = this.is_work ? this.settings.work : this.settings.break;
            let percent = 1- this.time / set_time;
            console.log("percent: "+ percent)
            return percent * 100 + '%';
        }
    },
    created() {
        this.time = this.is_work ? this.settings.work : this.settings.break;
        this.start();
    },
    methods: {
        start(){
            this.is_running = true;
            // check settings hasn't updated    

            this.timer = setInterval(()=>{
                if(this.time > 0){
                    --this.time;
                }
                else{
                    this.restart();
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
            this.time = this.is_work ? this.settings.work : this.settings.break;
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

var app = new Vue({
    el:"#app",
    components: {
        "tomato-timer": tomatoTimer,
        "tomato-setup": tomatoSetup
    }
});