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
- **PostgreSQL** - Banco de dados
- **TypeORM** - ORM
- **JWT** - Autenticação
- **Docker** - Containerização
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

### 4. Execute com Docker (Recomendado)

**Para Windows:**
```cmd
# Opção 1: Script automático
scripts\setup.bat

# Opção 2: PowerShell
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1

# Opção 3: Manual
docker-compose up -d
```

**Para Linux/macOS:**
```bash
# Script automático
chmod +x scripts/setup.sh
./scripts/setup.sh

# Ou manual
docker-compose up -d
```

### 5. Ou execute localmente
```bash
# Inicia apenas o banco de dados
docker-compose up -d postgres redis

# Instala dependências
npm install

# Executa migrations
npm run migration:run

# Executa a aplicação
npm run start:dev
```

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

### Serviços
- **app**: API NestJS (porta 3000)
- **postgres**: Banco PostgreSQL (porta 5432)
- **redis**: Cache Redis (porta 6379)

### Comandos úteis
```bash
# Ver logs de todos os serviços
docker-compose logs

# Parar todos os serviços
docker-compose down

# Rebuild da aplicação
docker-compose up --build

# Executar comandos no container
docker-compose exec app npm test
```

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

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando NestJS**
