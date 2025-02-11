import * as amqp from 'amqplib';

import { IJobEvent } from 'src/shared';

async function main() {
  try {
    const { MQ_URI, queueName } = process.env;
    const connection = await amqp.connect(MQ_URI);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    process.on('message', async (job: IJobEvent) => {
      const resource = JSON.stringify({
        uid: job.uid,
        image: job.image,
      });

      await channel.sendToQueue(queueName, Buffer.from(resource), { persistent: true });
    });
  } catch (error) {
    console.error('Worker error:', error);
  }
}

main();
