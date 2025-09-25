const amqp = require("amqplib");

async function sendMessages() {
  try {
    // Conectar ao RabbitMQ
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // Nome da fila para load balancing
    const queue = "task_queue";

    // Garantir que a fila existe
    await channel.assertQueue(queue, {
      durable: true, // A fila sobrevive a reinicializações do servidor
    });

    console.log("🚀 Produtor Load Balancing iniciado!");
    console.log("📤 Enviando mensagens para a fila:", queue);

    // Enviar 10 mensagens
    for (let i = 1; i <= 10; i++) {
      const message = `Mensagem ${i} - Load Balancing - ${new Date().toLocaleTimeString()}`;

      channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true, // Mensagem sobrevive a reinicializações
      });

      console.log(`✅ Enviada: ${message}`);

      // Aguardar 1 segundo entre mensagens
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("🏁 Todas as mensagens foram enviadas!");

    // Fechar conexão após um tempo
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

// Executar o produtor
sendMessages();
