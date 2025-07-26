# 🎫 Raspa da Sorte

Sistema completo de raspadinhas online com autenticação, banco de dados e API REST.

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - Framework React
- **Tailwind CSS** - Estilização
- **TypeScript** - Tipagem

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

## 🔧 Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/raspa-da-sorte.git
cd raspa-da-sorte
```

### 2. Configurar Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Acessos

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **API Health:** http://localhost:3001/api/health

## 📁 Estrutura

```
raspa/
├── frontend/          # Next.js App
│   ├── src/
│   │   ├── app/      # Páginas
│   │   └── services/ # API Services
│   └── public/       # Assets
├── backend/           # Node.js API
│   ├── prisma/       # Schema DB
│   └── index.js      # Servidor
└── README.md
```

## 🚀 Deploy

### Frontend (Vercel)
1. Conectar repositório no Vercel
2. Configurar variável `NEXT_PUBLIC_API_URL`
3. Deploy automático

### Backend (Railway)
1. Conectar repositório no Railway
2. Configurar variáveis de ambiente
3. Deploy automático

## 📊 Funcionalidades

- ✅ Cadastro e Login
- ✅ Sistema de Créditos
- ✅ Jogo de Raspadinha
- ✅ Histórico de Prêmios
- ✅ Painel do Usuário
- ✅ API REST Completa

## 🔐 Variáveis de Ambiente

### Backend (.env)
```
DATABASE_URL="file:./dev.db"
JWT_SECRET=sua_chave_secreta
PORT=3001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📝 Licença

Este projeto é privado e proprietário. 