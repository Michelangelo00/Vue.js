<script setup>

import { ref, onMounted } from 'vue'

const transcript = ref('')
const isRecording = ref(false)

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

onMounted (() => {
	sr.continuous = true
	sr.interimResults = true

	sr.onstart = () => {
		console.log('SR Started')
		isRecording.value = true
	}

	sr.onend = () => {
		console.log('SR Stopped')
		isRecording.value = false
	}

  sr.onresult = (evt) => {
    //console.log(evt);

    for(let i = 0; i < evt.results.length; i++){
      const result = evt.results[i];

      if(result.isFinal) CheckForCommand(result);
    }

    const t = Array.from(evt.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
    transcript.value = t;
  }
})

const CheckForCommand = (result) => {
  if(result[0].transcript.includes('stop recording')){
    sr.stop();
  }
  else if(result[0].transcript.includes('what is the time') ||
          result[0].transcript.includes('what\'s the time'))
          {
            sr.stop();
            alert(new Date().toLocaleTimeString());
            setTimeout(() => sr.start(), 100);
          }
}

const ToggleMic = () => {
	if (isRecording.value) {
		sr.stop()
	} else {
		sr.start()
	}
}

</script>

<template>

  <div class="app">
    <button :class="`mic`" @click="ToggleMic">Record</button>
    <div class="transcript" v-text="transcript"></div>
  </div>

</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
  }

  body{
    background: #281936;
    color: #fff;
  }
</style>
