const amqp = require("amqplib");

async function startBroadcastConsumer() {
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

    // Criar uma fila temporária exclusiva para este consumidor
    const q = await channel.assertQueue("", {
      exclusive: true, // Fila será deletada quando a conexão fechar
    });

    // Gerar ID único para o consumidor
    const consumerId = `Broadcast-Consumer-${Math.random()
      .toString(36)
      .substr(2, 5)}`;

    console.log(`🔥 ${consumerId} iniciado!`);
    console.log(`📡 Conectado à exchange: ${exchange}`);
    console.log(`📥 Fila exclusiva: ${q.queue}`);
    console.log("⏹️  Para sair, pressione CTRL+C");

    // Vincular a fila à exchange (sem routing key para fanout)
    await channel.bindQueue(q.queue, exchange, "");

    // Consumir mensagens
    channel.consume(
      q.queue,
      (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          console.log(`\n📢 ${consumerId} recebeu broadcast: ${content}`);

          // Simular processamento rápido
          setTimeout(() => {
            console.log(`✅ ${consumerId} processou a mensagem!`);
          }, 500);

          // Confirmar que a mensagem foi processada
          channel.ack(msg);
        }
      },
      {
        noAck: false,
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
startBroadcastConsumer();
