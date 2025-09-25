const amqp = require("amqplib");

async function sendBroadcastMessages() {
  try {
    // Conectar ao RabbitMQ
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // Nome da exchange fanout para broadcast
    const exchange = "broadcast_exchange";

    // Criar a exchange do tipo fanout
    await channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    console.log("🚀 Produtor Broadcast iniciado!");
    console.log("📡 Enviando mensagens via exchange fanout:", exchange);

    // Enviar 5 mensagens
    for (let i = 1; i <= 5; i++) {
      const message = `Broadcast ${i} - Mensagem para TODOS os consumidores - ${new Date().toLocaleTimeString()}`;

      // Publicar na exchange (routing key vazia para fanout)
      channel.publish(exchange, "", Buffer.from(message));

      console.log(`📢 Broadcast enviado: ${message}`);

      // Aguardar 2 segundos entre mensagens
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.log("🏁 Todas as mensagens broadcast foram enviadas!");

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
sendBroadcastMessages();
