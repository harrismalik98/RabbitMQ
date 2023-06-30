const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection)=>{  // Connecting to RabbitMQ Server.
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => { // RabbitMQ channel that you are using to communicate with the RabbitMQ server.
        if(err){
            throw err;
        }
        let queueName = "Technical";
        // let message = "This is Muhammad Harris";
        let message = {id:179, name:"Muhammad Harris"};
        channel.assertQueue(queueName,{  // Creating a queue in a server.
            durable:false

            // durable: false, the queue will be deleted if RabbitMQ server is restarted or if the queue is no longer in use. When the publisher sends a message to the consumer after the server restarts, RabbitMQ will automatically recreate the queue with default settings, including any default exchange that is specified.
            // durable: true, the queue will not be deleted if RabbitMQ server is restarted or if the queue is no longer in use. The metadata of the queue (such as its name, durability setting, and other properties) will be persisted to disk. This means that when the server restarts, the queue will be recreated with the same metadata, including its durability setting.

            // When the server restarts, any messages that are currently in the queue will be lost in both cases, whether the queue is durable or not. This is because the messages are only stored in memory and are not persisted to disk.
            // The queue will be created in both cases whether durable is true or false, when a publisher sends a message to it. RabbitMQ will automatically create the queue with default settings if it does not already exist.
        });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message))); // In AMQP (Advanced Message Queuing Protocol), messages are sent as binary data. Passing message as a Buffer to queue.
        // console.log(`Message: ${message}`);
        console.log(message);

        setTimeout(()=>{
            connection.close();
        }, 1000);
    })
})











// RabbitMQ Youtube Tutorials: https://www.youtube.com/watch?v=AMC2p0h0LJE&list=PLrwNNiB6YOA3Z3JfOUMKE6PmnpmVAJgTK&index=2
// Send and Receive Messages with RabbitMQ using Nodejs: https://www.youtube.com/watch?v=Dcz8L1DAvQM
// Exchange Types with RabbitMQ Server: https://www.youtube.com/watch?v=IGuVVElY-DY