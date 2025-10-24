# 🪟 Instruções para Windows

## Pré-requisitos

1. **Docker Desktop** - Baixe e instale do [site oficial](https://www.docker.com/products/docker-desktop/)
2. **Node.js 18+** - Baixe do [nodejs.org](https://nodejs.org/)
3. **Git** - Baixe do [git-scm.com](https://git-scm.com/)

## 🚀 Instalação Rápida

### Opção 1: Script Automático (Recomendado)
```cmd
# Execute no PowerShell ou CMD
scripts\setup.bat
```

### Opção 2: PowerShell
```powershell
# Abra o PowerShell como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\scripts\setup.ps1
```

### Opção 3: Manual
```cmd
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
copy env.example .env

# 3. Iniciar serviços
docker-compose up -d

# 4. Executar migrations
npm run migration:run

# 5. Executar aplicação
npm run start:dev
```

## 🔧 Solução de Problemas

### Erro: "docker-compose não é reconhecido"
```cmd
# Use docker compose (sem hífen) em versões mais recentes
docker compose up -d
```

### Erro: "npm install falha"
```cmd
# Limpar cache e tentar novamente
npm cache clean --force
rmdir /s node_modules
del package-lock.json
npm install
```

### Erro: "Porta 3000 já está em uso"
```cmd
# Parar serviços
docker-compose down

# Ou mudar a porta no docker-compose.yml
# ports: "3001:3000"
```

### Erro: "Acesso negado ao Docker"
- Execute o Docker Desktop como Administrador
- Ou execute o PowerShell/CMD como Administrador

## 📋 Comandos Úteis

```cmd
# Ver status dos containers
docker-compose ps

# Ver logs da aplicação
docker-compose logs -f app

# Parar todos os serviços
docker-compose down

# Rebuild da aplicação
docker-compose up --build

# Executar migrations
npm run migration:run

# Executar testes
npm test

# Executar aplicação em modo desenvolvimento
npm run start:dev
```

## 🌐 Acessos

Após a instalação bem-sucedida:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api/docs
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🆘 Ainda com problemas?

1. **Reinicie o Docker Desktop**
2. **Execute como Administrador**
3. **Verifique se as portas 3000, 5432, 6379 estão livres**
4. **Verifique se o Windows Defender não está bloqueando**
