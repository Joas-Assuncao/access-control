@echo off
echo 🚀 Configurando Access Control API...

REM Verifica se o Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker não encontrado. Por favor, instale o Docker Desktop primeiro.
    pause
    exit /b 1
)

REM Verifica se o Docker Compose está instalado
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose não encontrado. Por favor, instale o Docker Desktop primeiro.
    pause
    exit /b 1
)

REM Cria arquivo .env se não existir
if not exist .env (
    echo 📝 Criando arquivo .env...
    copy env.example .env
    echo ✅ Arquivo .env criado. Edite as configurações se necessário.
)

REM Instala dependências
echo 📦 Instalando dependências...
call npm install

REM Inicia os serviços
echo 🐳 Iniciando serviços com Docker...
docker-compose up -d

REM Aguarda o banco estar pronto
echo ⏳ Aguardando banco de dados...
timeout /t 10 /nobreak >nul

REM Executa build
echo 🗄️ Executando build...
call npm run build

REM Executa migrations
echo 🗄️ Executando migrations...
call npm run migration:run

echo ✅ Setup concluído!
echo.
echo 🌐 API disponível em: http://localhost:3000
echo 📚 Documentação Swagger: http://localhost:3000/api/docs
echo.
echo Para parar os serviços: docker-compose down
echo Para ver os logs: docker-compose logs -f
pause
