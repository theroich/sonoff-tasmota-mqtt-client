# SONOFF TASMOTA MQTT CLIENT
Easy client for sonoff switch with tasmota firmware through MQTT protocol.

## Install
```
npm install sonoff-tasmota-mqtt-client
```

## Use
```javascript

let Sonoff = require('sonoff-tasmota-mqtt-client');

let sonoff = new Sonoff({
    host:'mqtt://localhost',/*ip or host of mqtt broker*/
    port: 1234/*port*/,
    username:'username',
    password:'pasword',
    name: 'sonoff'/*name of device*/
});


sonoff.on('connect',function(){

    sonoff.getState().then(function(state){
        console.log(`state : ${state}`);
        if(state == 'OFF'){
            sonoff.toggleOn();
        }else{
            sonoff.toggleOff();
        }
    });
});


sonoff.on('toggleON',function(){
   console.log('toggleOn');
});

sonoff.on('toggleOFF',function(){
    console.log('toggleOff');
});

