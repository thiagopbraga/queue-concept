# 📦 Projeto RabbitMQ com Node.js

Este projeto demonstra dois cenários de uso do **RabbitMQ** com Node.js:

* **Load Balancing**: vários consumidores conectados a uma única fila, mensagens distribuídas entre eles.
* **Broadcast (Fanout)**: uma exchange fanout envia cópias da mesma mensagem para todos os consumidores.

---

## 🚀 Pré-requisitos

* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
* [Node.js](https://nodejs.org/) (versão 14 ou superior)

---

## 🐇 Subindo o RabbitMQ

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

* Painel do RabbitMQ disponível em: [http://localhost:15672](http://localhost:15672)

  * Usuário: `guest`
  * Senha: `guest`

---

## 📂 Estrutura do projeto

```
.
├── docker-compose.yml
├── README.md
├── load_balancing
│   ├── producer_lb.js
│   └── consumer_lb.js
└── broadcast
    ├── producer_bc.js
    └── consumer_bc.js
```

---

## 📥 Instalando dependências

Na raiz do projeto:

#### 1. Instalar dependências
```bash
npm install
```

#### 2. Subir o RabbitMQ
```bash
docker-compose up -d
```

---

## ⚡ Cenário 1 – Load Balancing

Mensagens são distribuídas entre os consumidores (round-robin).

### 1. Rodar consumidores (cada um em um terminal separado)

```bash
node load_balancing/consumer_lb.js
```

### 2. Enviar mensagens com o produtor

```bash
node load_balancing/producer_lb.js
```

📌 Resultado esperado:
As mensagens são **divididas entre os consumidores**.

---

## 📡 Cenário 2 – Broadcast (Fanout)

Cada consumidor recebe uma cópia de todas as mensagens.

### 1. Rodar consumidores (cada um em um terminal separado)

```bash
node broadcast/consumer_bc.js
```

### 2. Enviar mensagens com o produtor

```bash
node broadcast/producer_bc.js
```

📌 Resultado esperado:
As mensagens são **recebidas por todos os consumidores**.

---

## 🛑 Parando o ambiente

```bash
docker-compose down
```
