const q = require('q');
const mqtt = require('mqtt');
const events = require('events');
const util = require('util');


function ClientFactory(options){
    const topicState= `stat/${options.name}/POWER`;
    const topicPower = `cmnd/${options.name}/power`;

    events.EventEmitter.call(this);

    const self = this;
    const client  = mqtt.connect(options.host,{
        port: options.port,
        username: options.username,
        password: options.password,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    });

    client.on('connect', function () {

        client.subscribe(topicState);
        client.subscribe(topicPower);
        self.emit('connect');
        client.on('message', function (topic, message) {

            if(topicPower == topic && message.toString() == 'ON'){
                self.emit('toggleON');

            }else if(topicPower == topic && message.toString() == 'OFF'){
                self.emit('toggleOFF')
            }

        });

    });

    this.toggleOn = function(){
        client.publish(topicPower,'ON');
    };

    this.toggleOff = function(){
        client.publish(topicPower,'OFF');
    };


	 /* promise get state implementation */
    this.getState = function(){
        const deferred = q.defer();
        client.publish(topicPower,'');

        client.on('message', function (topic, message) {
           if(topicState == topic){
               deferred.resolve(message.toString());
           }

        });
        return deferred.promise;
    }

}
util.inherits(ClientFactory, events.EventEmitter);

module.exports = ClientFactory;
