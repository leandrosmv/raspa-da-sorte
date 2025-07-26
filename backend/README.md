# Backend - Raspa da Sorte

Backend completo para o sistema de raspadinhas online com autenticação, banco de dados e API REST.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp env.example .env
   ```
   Edite o arquivo `.env` com suas configurações.

3. **Configurar banco de dados:**
   ```bash
   npx prisma migrate dev
   ```

4. **Gerar cliente Prisma:**
   ```bash
   npx prisma generate
   ```

5. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

## 📊 Banco de Dados

### Modelos

- **User** - Usuários do sistema
- **Transaction** - Transações de créditos
- **Prize** - Prêmios ganhos
- **GameSession** - Sessões de jogo

### Migrações

Para criar uma nova migração:
```bash
npx prisma migrate dev --name nome_da_migracao
```

## 🔌 Endpoints da API

### Autenticação

- `POST /api/register` - Cadastrar usuário
- `POST /api/login` - Fazer login
- `GET /api/user` - Obter dados do usuário

### Jogo

- `POST /api/game/play` - Jogar raspadinha
- `POST /api/credits/purchase` - Comprar créditos

### Histórico

- `GET /api/prizes` - Histórico de prêmios
- `GET /api/transactions` - Histórico de transações

### Saúde

- `GET /api/health` - Status do servidor

## 🔐 Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer <token>
```

## 💰 Prêmios

O sistema simula prêmios aleatórios:
- 70% - Sem prêmio
- 20% - R$ 5,00
- 7% - R$ 10,00
- 2% - R$ 50,00
- 1% - R$ 100,00

## 🚀 Deploy

Para produção, configure:
- Variáveis de ambiente
- Banco de dados PostgreSQL
- Gateway de pagamento
- SSL/TLS

## 📝 Licença

Este projeto é privado e proprietário. 