import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "notifications",
    brokers: ["intense-lab-11284-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "aW50ZW5zZS1sYWItMTEyODQkQCpydgVvbskP9wX7BlXKG23W5m9zOQft0hFoxoI",
      password: "d4cc7fdb75e34a15a0af04303e8284ad",
    },
    ssl: true,
  });
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade teste",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

export default bootstrap()
