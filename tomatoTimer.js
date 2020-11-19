let timerSet = {
    template:`   
    <div class = "timer-input">
        <input type=text placeholder=0 v-model="hours" @focus = "redirectToSeconds" @change ="updateHours"></input>
        <h4>H</h4>
        <input type=text placeholder=0 v-model="minutes" @focus = "redirectToSeconds" @change ="updateMinutes"></input>
        <h4>M</h4>
        <input type=text placeholder=0 v-model="seconds" @change ="updateSeconds" ref = "seconds"></input>
        <h4>S</h4>
    </div>
    `,
    data: function(){
        return{
            hours: 0,
            minutes: 0,
            seconds: 0,
            time: 0
        }
    },
    methods: {
        updateHours(){
            console.log("on change hour")
            
        },
        updateMinutes(){
            console.log("on change minutes")
            
        },
        updateSeconds(){
            console.log("on change seconds")
            
        },
        redirectToSeconds(){
            console.log("focused")
            if(this.hours == 0 && this.minutes == 0 && this.seconds == 0){
                this.$refs.seconds.focus();
            }
        }
    }
}

let timerGraphic = {
    template: `
    <div class= "timer-container">
        <div>
            <img id="outline" src="tomatoOutline.svg" alt="tomato outline" />
        </div>
        <div class = "tomato cover" v-bind:style="{ height: increment }" />
        <div class = "tomato">
            <img id="fill" src="tomatoFill.svg" alt="tomato fill" />
        </div>
    </div>
    `,
    props:['time', 'set_time'],
    computed:{
        increment () {
            let mult = 1 - this.time / this.set_time
            console.log(mult);
            return mult * 115 + 'px'
        }
    }
}

let tomatoTimer = new Vue({
    el: "#tomatoTimer",
    components:{
        "timer-graphic" : timerGraphic,
        "timer-set" : timerSet
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
               return hours + ":" + minutes + ":" + seconds;
        }
    },
    data:{
        running: false,
        set_time: 10,
        time: 10,
        timer: null,
    },
    methods: {
        start(){
            this.running = true;
            this.timer = setInterval(() => {
                if(this.time > 0){
                    this.time--;
                }
                else{
                    clearInterval(this.timer)
                    this.stop();
                }
            }, 1000)

        },
        pause(){
            this.running = false;
            clearInterval(this.timer);
        },
        stop(){
            this.pause();
            this.time = this.set_time;
        }
    }
});