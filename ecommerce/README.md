# Ecommerce Demo com Supabase

Este diretório contém um exemplo simples de site de comércio eletrônico
utilizando Supabase para autenticação e CRUD de produtos. O backend é um pequeno
servidor Flask que demonstra o uso da TinyDB para armazenar pedidos locais.

## Como executar

1. Instale as dependências de Python:
   ```bash
   cd ecommerce
   pip install -r requirements.txt
   ```

2. Execute o servidor Flask:
   ```bash
   python server.py
   ```
   O site será servido em `http://localhost:5000`.

3. Configure as chaves do Supabase no arquivo `static/app.js` antes de iniciar.

Este exemplo tem foco educacional e busca manter o código simples para quem
está iniciando.
