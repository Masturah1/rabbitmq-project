const amqplib = require("amqplib");
require("dotenv").config()

class Producer {

    
    // create a constructor
    constructor(){
        // connect/ create connection
        this.createConnection()
    }

    async publishMessage(routingKey, message){
        if(!this.channel){
            this.channel = this.createConnection()
        }

        await this.channel.assertExchange("test-exchange-2", "direct");

        this.channel.publish("test-exchange-2", routingKey, Buffer.from(JSON.stringify(message)))

    }


    createConnection(){
        amqplib.connect("amqp://localhost:5672").then( async ( connection ) => {

        this.channel = await connection.createChannel("test-channel");

        console.log("Channel created: ");
    }).catch(error => {
        console.log("An error just occurred! ", error.message)
    })


    }

    


}

module.exports = Producer