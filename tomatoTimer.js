let timerSet = {
    template:`   
    <div class = "timer-input">
        <input type=text placeholder="00" v-model="hours" @focus = "focus" ref = "hours"></input>
        <h4>H</h4>
        <input type=text placeholder="25" v-model="minutes" @focus = "focus" ref = "minutes"></input>
        <h4>M</h4>
        <input type=text placeholder="00" v-model="seconds"  @focus = "focus" ref = "seconds" id = "begin"></input>
        <h4>S</h4>
        <input type=text placeholder="00" v-model = "time" @input="update" @change="setTime" ref = "input" id = "time-form" ></input>
    </div>
    `,
    data: function(){
        return{
            hours: null,
            minutes: null,
            seconds: null,
            time: "",
            cursor: null
        }
    },
    methods: {
        update(){

            if(!this.time.match(/[0-9]$/)){;
                this.time = this.time.slice(0, this.time.length-1);
            }

            if(this.time.length > 6){
                this.time = this.time.slice(1);
            }
            if(this.time.length == 6){
                this.hours = this.time.slice(0, 2);
                this.minutes = this.time.slice(2, 4);
                this.seconds = this.time.slice(4, 6);
            }
            if(this.time.length == 5){
                this.hours = this.time.slice(0, 1);
                this.hours = "0" + this.hours;
                this.minutes = this.time.slice(1, 3);
                this.seconds = this.time.slice(3, 5);
            }
            if(this.time.length == 4){
                this.hours = null;
                this.minutes = this.time.slice(0, 2);
                this.seconds = this.time.slice(2, 4);
            }
            if(this.time.length == 3){
                this.hours = null;
                this.minutes = this.time.slice(0, 1);
                this.minutes = "0" + this.minutes;
                this.seconds = this.time.slice(1, 3);
            }
            if(this.time.length == 2){
                this.hours = null;
                this.minutes = null;
                this.seconds = this.time;

            }
            if(this.time.length == 1){
                this.hours = null;
                this.minutes = null;
                this.seconds = this.time;
                this.seconds = "0" + this.seconds;
                this.$refs.minutes.placeholder = "00";
            }
            if(this.time.length == 0){
                this.hours = null;
                this.minutes = null;
                this.seconds = null;
                this.$refs.minutes.placeholder = "25";
            }
        },
        focus(){
            this.$refs.input.focus();
            this.update();
            this.$refs.seconds.style.borderRight = `solid`;
            this.$refs.seconds.style.paddingRight = `0px`;
            this.cursor = setInterval(()=>{
                this.$refs.seconds.style.borderRight = `solid`;
                this.$refs.seconds.style.paddingRight = `0px`;
                setTimeout(()=>{
                    this.$refs.seconds.style.borderRight = `none`;
                    this.$refs.seconds.style.paddingRight = `2px`;
                }, 500)
                
            }, 1000)

        },
        setTime() {
            let seconds  = this.seconds ? this.seconds : 0;
            let minutes  = this.minutes ? this.minutes : 0;
            let hours  = this.hours ? this.hours : 0;
            let sendTime = parseInt(hours * 3600 + minutes * 60 + seconds * 1);
            if (sendTime == 0){
                sendTime = 1500;
            }
            console.log("emitting time: " + sendTime);
            this.$emit('set-time', {time: sendTime});
            clearInterval(this.cursor)
        }
    }
}

let timerGraphic = {
    template: `
    <div class= "timer-container">
        <div class = "tomato outline" />
        <div class = "tomato cover" v-bind:style="{ height: increment }" />
        <div class = "tomato fill" />
    </div>
    `,
    props:['time', 'set_time'],
    computed:{
        increment () {
            let mult = 1 - this.time / this.set_time;
            return mult * 175 + 'px';
        }
    }
}

let app = new Vue({
    el: "#app",
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
               return hours + "H " + minutes + "M " + seconds + "S";
        }
    },
    data:{
        running: false,
        set_time: 1500,
        time: 1500,
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
        },
        set(emit){
            this.set_time = emit.time;
            this.time = emit.time;
        }
    }
});