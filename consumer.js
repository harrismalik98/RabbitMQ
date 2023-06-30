const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection)=>{
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;
        }
        let queueName = "Technical";
        channel.assertQueue(queueName,{
            durable:false
        });

        channel.consume(queueName, (msg) => {  // Consume the msg from queueName = "Technical".
            // console.log(`Recieved: ${msg.content.toString()}`); // content will hold the message, the message is in Buffer, we use toString() to convert that to String.

            const jsonString = msg.content;
            const jsonObject = JSON.parse(jsonString); //Getting data in JSON so converting that to JavaScript Object.
            console.log(jsonObject);

            channel.ack(msg); // Acknowledging the "msg" to queue so that it didn't send us a msg again and it drop the msg from queue.
        });

    })
})