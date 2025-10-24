# Access Control API

API RESTful para controle de acesso com autenticação JWT, desenvolvida com NestJS, PostgreSQL e Docker.

## 🚀 Funcionalidades

- **Cadastro de Usuários**: Criação de usuários com perfis (admin, user)
- **Autenticação JWT**: Sistema de login com tokens seguros
- **Controle de Acesso**: Apenas admins podem listar usuários
- **Logs de Acesso**: Registro de todos os logins com IP e timestamp
- **Documentação Swagger**: API documentada automaticamente
- **Testes TDD**: Testes unitários e e2e implementados

## 🛠️ Tecnologias

- **Node.js 18+**
- **NestJS** - Framework Node.js
- **PostgreSQL** - Banco de dados (Docker)
- **Redis** - Cache (Docker)
- **TypeORM** - ORM
- **JWT** - Autenticação
- **Docker** - Containerização (apenas bancos)
- **Jest** - Testes
- **Swagger** - Documentação

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Docker e Docker Compose
- Git

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd access-control-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=access_control
JWT_SECRET=your-super-secret-jwt-key-change-in-production
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Inicie os serviços de banco de dados
```bash
# Inicia apenas PostgreSQL e Redis
docker-compose up -d postgres redis
```

### 5. Execute as migrations
```bash
npm run migration:run
```

### 6. Execute a aplicação
```bash
# Modo desenvolvimento (com hot reload)
npm run start:dev

# Ou modo produção
npm run start:prod
```

**Nota:** A API roda diretamente no terminal para facilitar o debug e visualização dos logs. Os serviços de banco de dados (PostgreSQL e Redis) continuam rodando no Docker.

## 💻 Desenvolvimento

### Fluxo de desenvolvimento
1. **Inicie os bancos**: `docker-compose up -d postgres redis`
2. **Execute migrations**: `npm run migration:run`
3. **Inicie a API**: `npm run start:dev`
4. **Acesse a documentação**: http://localhost:3000/api/docs

### Vantagens desta abordagem
- ✅ Logs da aplicação visíveis no terminal
- ✅ Hot reload automático durante desenvolvimento
- ✅ Debug mais fácil com breakpoints
- ✅ Bancos isolados em containers
- ✅ Fácil reinicialização dos bancos

## 🗄️ Migrations

### Comandos de Migration
```bash
# Gerar nova migration
npm run migration:generate -- src/database/migrations/NomeDaMigration

# Executar migrations
npm run migration:run

# Reverter última migration
npm run migration:revert

# Sincronizar schema (apenas desenvolvimento)
npm run schema:sync
```

## 📚 Documentação da API

Após iniciar a aplicação, acesse:
- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000

## 🔐 Endpoints

### Autenticação
- `POST /auth/login` - Fazer login
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Usuários
- `POST /users` - Criar usuário (público)
  ```json
  {
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

- `GET /users` - Listar usuários (apenas admin)
  - Headers: `Authorization: Bearer <token>`

### Logs de Acesso
- `GET /access-logs` - Listar logs (apenas admin)
  - Headers: `Authorization: Bearer <token>`

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar testes e2e
```bash
npm run test:e2e
```

### Executar testes com cobertura
```bash
npm run test:cov
```

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **DDD**:

```
src/
├── auth/                 # Módulo de autenticação
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards de autorização
│   ├── strategies/      # Estratégias de autenticação
│   └── auth.service.ts  # Lógica de autenticação
├── users/               # Módulo de usuários
│   ├── dto/             # DTOs de usuário
│   ├── entities/        # Entidades do banco
│   └── users.service.ts # Lógica de usuários
├── access-logs/         # Módulo de logs
│   ├── dto/             # DTOs de log
│   ├── entities/        # Entidade AccessLog
│   └── access-logs.service.ts
└── main.ts              # Ponto de entrada
```

## 🔒 Segurança

- **Senhas**: Hash com bcrypt
- **JWT**: Tokens com expiração de 24h
- **Validação**: DTOs com class-validator
- **CORS**: Configurado para desenvolvimento
- **Guards**: Proteção de rotas sensíveis

## 📊 Banco de Dados

### Entidades

**User**
- `id` (UUID)
- `name` (string)
- `email` (string, unique)
- `password` (string, hashed)
- `role` (enum: admin, user)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**AccessLog**
- `id` (UUID)
- `timestamp` (timestamp)
- `userId` (UUID, FK)
- `ipAddress` (string)
- `userAgent` (string)
- `status` (string: success, failed)

## 🐳 Docker

### Serviços (apenas bancos de dados)
- **postgres**: Banco PostgreSQL (porta 5432)
- **redis**: Cache Redis (porta 6379)

### Comandos úteis
```bash
# Ver logs dos serviços de banco
docker-compose logs postgres redis

# Parar todos os serviços
docker-compose down

# Reiniciar apenas os bancos
docker-compose restart postgres redis
```

**Nota:** A aplicação NestJS roda diretamente no terminal, não em container, para facilitar o desenvolvimento e debug.

## 🚀 Deploy

### Variáveis de ambiente para produção
```env
NODE_ENV=production
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_NAME=access_control
JWT_SECRET=your-super-secret-jwt-key
```

### Build para produção
```bash
npm run build
npm run start:prod
```

## 📝 Exemplos de Uso

### 1. Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 3. Listar usuários (apenas admin)
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer <seu-token-jwt>"
```
