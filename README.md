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
git clone https://github.com/Tchez/nest-supplychain.git
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

> Documentação mais detalhada (Swagger) disponível em http://localhost:3000/api

### POST /blockchain/create-product

Cria um novo produto na blockchain.

Body de exemplo:

```json
{
  "type": "create_product",
  "data": {
    "id": "relational_product_id",
    "title": "Produto 1",
    "description": "Descrição do Produto",
    "category": "frios"
  }
}
```

### POST /blockchain/invite-supplier/:id

Convida um fornecedor para participar da cadeia de suprimentos de um produto.

Body de exemplo:

```json
{
  "type": "invite_supplier",
  "data": {
    "email": "email_invitation_was_made",
    "name": "supplier_name",
    "cnpj": "supplier_cnpj"
  }
}
```

### POST /blockchain/confirm-supplier/:id

Confirma a participação de um fornecedor na cadeia de suprimentos de um produto.

Body de exemplo:

```json
{
  "type": "confirm_supplier",
  "data": {
    "email": "email_invitation_was_made",
    "name": "supplier_name",
    "cnpj": "supplier_cnpj"
  }
}
```

### POST /blockchain/register-supplier/:id

Registra um fornecedor na cadeia de suprimentos de um produto.

Body de exemplo:

```json
{
  "type": "register_supplier",
  "data": {
    "email": "email_invitation_was_made",
    "name": "supplier_name",
    "cnpj": "supplier_cnpj",
    "relational_supplier_id": "id desse supplier cadatrado no banco relacional",
    "relational_product_id": "id do Produto cadatrado pelo supplier"
  }
}
```

### POST /blockchain/alter-product/:id

Altera um produto na blockchain.

Body de exemplo:

```json
{
  "type": "alter_product",
  "data": {
    "id": "relational_product_id",
    "title": "Produto 1",
    "description": "Descrição modificada do Produto",
    "category": "quentes"
  }
}
```

### GET /blockchain/:id

Retorna a blockchain de um produto.

### GET /blockchain/validate/:id

Valida a blockchain de um produto.

### GET /blockchain/validate-suppliers/:id

Valida os fornecedores de um produto.
