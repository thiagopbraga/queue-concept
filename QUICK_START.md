# 🚀 Guia Rápido de Execução

## ✅ Status: Sistema Funcionando!
- ✅ RabbitMQ rodando no Docker
- ✅ Dependências instaladas
- ✅ Todos os arquivos criados e formatados

## 1. Subir o RabbitMQ
```bash
docker-compose up -d
```

## 2. Instalar dependências
```bash
npm install
```

## 3. Testar Load Balancing

### Terminal 1 - Consumidor 1:
```bash
node load_balancing/consumer_lb.js
```

### Terminal 2 - Consumidor 2:
```bash
node load_balancing/consumer_lb.js
```

### Terminal 3 - Produtor:
```bash
node load_balancing/producer_lb.js
```

**Resultado**: Mensagens distribuídas entre os consumidores (round-robin)

---

## 4. Testar Broadcast

### Terminal 1 - Consumidor 1:
```bash
node broadcast/consumer_bc.js
```

### Terminal 2 - Consumidor 2:
```bash
node broadcast/consumer_bc.js
```

### Terminal 3 - Produtor:
```bash
node broadcast/producer_bc.js
```

**Resultado**: Todos os consumidores recebem todas as mensagens

---

## 5. Painel RabbitMQ
- URL: http://localhost:15672
- Usuário: `guest`
- Senha: `guest`

## 6. Parar o ambiente
```bash
docker-compose down
```
