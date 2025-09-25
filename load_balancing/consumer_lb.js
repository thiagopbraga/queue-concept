const amqp = require("amqplib");

async function startConsumer() {
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

    // Configurar QoS para processar uma mensagem por vez
    channel.prefetch(1);

    // Gerar ID único para o consumidor
    const consumerId = `Consumer-${Math.random().toString(36).substr(2, 5)}`;

    console.log(`🔥 ${consumerId} iniciado!`);
    console.log(`📥 Aguardando mensagens da fila: ${queue}`);
    console.log("⏹️  Para sair, pressione CTRL+C");

    // Consumir mensagens
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          console.log(`\n📨 ${consumerId} recebeu: ${content}`);

          // Simular processamento (tempo aleatório entre 1-3 segundos)
          const processingTime = Math.floor(Math.random() * 3000) + 1000;
          console.log(
            `⚙️  ${consumerId} processando por ${processingTime}ms...`
          );

          setTimeout(() => {
            console.log(`✅ ${consumerId} finalizou o processamento!`);

            // Confirmar que a mensagem foi processada
            channel.ack(msg);
          }, processingTime);
        }
      },
      {
        noAck: false, // Requer confirmação manual
      }
    );

    // Tratar encerramento gracioso
    process.on("SIGINT", () => {
      console.log(`\n🛑 ${consumerId} encerrando...`);
      channel.close();
      connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

// Iniciar o consumidor
startConsumer();
