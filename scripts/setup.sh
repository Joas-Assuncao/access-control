#!/bin/bash

echo "🚀 Configurando Access Control API..."

# Verifica se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verifica se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Cria arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp env.example .env
    echo "✅ Arquivo .env criado. Edite as configurações se necessário."
fi

# Instala dependências
echo "📦 Instalando dependências..."
npm install

# Inicia os serviços
echo "🐳 Iniciando serviços com Docker..."
docker-compose up -d

# Aguarda o banco estar pronto
echo "⏳ Aguardando banco de dados..."
sleep 10

# Executa migrações (se houver)
echo "🗄️ Executando migrações..."
npm run build

echo "✅ Setup concluído!"
echo ""
echo "🌐 API disponível em: http://localhost:3000"
echo "📚 Documentação Swagger: http://localhost:3000/api/docs"
echo ""
echo "Para parar os serviços: docker-compose down"
echo "Para ver os logs: docker-compose logs -f"
