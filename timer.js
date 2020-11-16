let timer = {
    template: `
    <div class = 'tomato-container' v-bind:style="{ height: decrement }">
    </div>
    `,
    props:['time', 'set_time'],
    computed: {
        decrement () {
            console.log(this.time / this.set_time);
            let mult = this.time / this.set_time
            return mult * 175 + 'px'
        }
    },
}

let tomato = {
    template: `
    <div>
    <h3>{{time | clockify}}</h3>
    <div class = "timer-container">
        <timer v-bind:time="time" v-bind:set_time="set_time" ref = "timer"></timer>
    </div>
    </div>`,
    props: ['time', 'set_time'],
    filters: {
        clockify : function(input) {
               let time = parseInt(input);
               let hours = parseInt(time / 3600);
               let minutes = parseInt((time - hours) / 60);
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

}

Vue.component('tomato', tomato);

let app = new Vue({
	el:"#app",
	components: {
         'timer':timer,
         'tomato': tomato
	},
	data: {
         isRunning: false,
         set_time: 05,
		 time:05,
		 timer:null,
		 sound:new Audio("http://s1download-universal-soundbank.com/wav/nudge.wav")
    },
    filters: {
        clockify : function(input) {
               let time = parseInt(input);
               let hours = parseInt(time / 3600);
               let minutes = parseInt((time - hours) / 60);
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
	methods: {
		 start () {
             this.time = this.set_time;
			 this.isRunning = true
			 if (!this.timer) {
				  this.timer = setInterval( () => {
						if (this.time > 0) {
                             this.time--;
						} else {
							 clearInterval(this.timer)
							 this.sound.play()
							 this.reset()
						}
				  }, 1000 )
			 }
		 },
		 stop () {
			 this.isRunning = false
			 clearInterval(this.timer)
			 this.timer = null
		 },
		 reset () {
			  this.stop()
			  this.time = this.set_time;
		 }
	}
})