# Block Chain

## Descrição do Projeto

Projeto de uma Blockchain implementada com Nest e MongoDB, com o intuito de aplicar em uma Supply Chain para a matéria de Desenvolvimento de Software.

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Rodando o projeto

1. Clone o repositório:

```bash
...
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o MongoDB:

```bash
docker-compose -f 'docker-compose-dev.yml' up -d
```

4. Inicie o servidor:

```bash
npm run start:dev
```

## Rotas

### GET /blockchain

Retorna a blockchain.

### POST /blockchain/add-block

Adiciona um bloco na blockchain. Caso seja o primeiro bloco, um bloco de gênese será criado.

### GET /blockchain/validate

Valida a blockchain.
