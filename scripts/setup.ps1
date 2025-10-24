# PowerShell script para Windows
Write-Host "🚀 Configurando Access Control API..." -ForegroundColor Green

# Verifica se o Docker está instalado
try {
    docker --version | Out-Null
    Write-Host "✅ Docker encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não encontrado. Por favor, instale o Docker Desktop primeiro." -ForegroundColor Red
    exit 1
}

# Verifica se o Docker Compose está instalado
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose não encontrado. Por favor, instale o Docker Desktop primeiro." -ForegroundColor Red
    exit 1
}

# Cria arquivo .env se não existir
if (-not (Test-Path ".env")) {
    Write-Host "📝 Criando arquivo .env..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "✅ Arquivo .env criado. Edite as configurações se necessário." -ForegroundColor Green
}

# Instala dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro na instalação das dependências" -ForegroundColor Red
    exit 1
}

# Inicia os serviços
Write-Host "🐳 Iniciando serviços com Docker..." -ForegroundColor Yellow
docker-compose up -d

# Aguarda o banco estar pronto
Write-Host "⏳ Aguardando banco de dados..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Executa build
Write-Host "🗄️ Executando build..." -ForegroundColor Yellow
npm run build

# Executa migrations
Write-Host "🗄️ Executando migrations..." -ForegroundColor Yellow
npm run migration:run

Write-Host "✅ Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 API disponível em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📚 Documentação Swagger: http://localhost:3000/api/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para parar os serviços: docker-compose down" -ForegroundColor Yellow
Write-Host "Para ver os logs: docker-compose logs -f" -ForegroundColor Yellow
