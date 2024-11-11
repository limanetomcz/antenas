
# Avaliação Prática em PHP - Spassu

Bem-vindo à minha solução para a avaliação prática em PHP! Este projeto foi desenvolvido em **Laravel 11** para o backend, atendendo aos requisitos e especificações descritos na avaliação.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Modelo de Dados](#modelo-de-dados)
- [APIs Externas](#apis-externas)
- [Considerações Finais](#considerações-finais)
- [Links Úteis](#links-úteis)

---

## Instalação

1. Clone o repositório para seu ambiente local:
   ```bash
   git clone https://github.com/limanetomcz/antenas.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd nome-do-projeto
   ```

3. Instale as dependências do projeto:
   ```bash
   composer install
   ```

4. Crie o arquivo `.env` com base no arquivo `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Gere uma chave de aplicação:
   ```bash
   php artisan key:generate
   ```

6. Configure as variáveis de ambiente no `.env`, como o banco de dados (exemplo com MySQL):
   ```plaintext
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=mariadb
   DB_USERNAME=root
   DB_PASSWORD=123456
   ```

7. Execute as migrações e seeders para criar e popular as tabelas:
   ```bash
   php artisan migrate --seed
   ```

## Configuração

1. **JWT**: Para autenticação, este projeto usa o JWT. Configure o JWT no `.env`:
   ```plaintext
   JWT_SECRET=chave_do_seu_jwt
   ```

2. **API do IBGE**: O projeto utiliza a [API de localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet) para listar os estados (UFs) no formulário de antenas.

3. **Executando o Projeto**: Inicie o servidor local do Laravel:
   ```bash
   php artisan serve
   ```

## Funcionalidades Implementadas

- **Listagem de Antenas**: Exibe uma lista completa de antenas cadastradas.
- **Detalhes da Antena**: Visualização de informações específicas de uma antena, incluindo foto e mapa com localização.
- **Ranking de UFs**: Apresenta as 5 UFs com mais antenas cadastradas.
- **CRUD Completo de Antenas**:
  - **Criação**: Tela de cadastro de antenas com validação e seleção de UFs a partir da API do IBGE.
  - **Edição**: Tela para edição de dados de uma antena existente, incluindo validações.
  - **Exclusão**: Confirmação de exclusão antes de apagar um registro.
- **Carga de Dados**: Script para carga massiva de até 100 mil registros de antenas.
- **Autenticação e Autorização**:
  - **Registro de Usuário**: Cadastro de novos usuários.
  - **Login e Logout**: Autenticação com geração de token JWT para acessar rotas protegidas.

## Modelo de Dados

### Antenas
- `id`: UUID, chave primária.
- `descricao`: String, obrigatório, único, 10-100 caracteres.
- `latitude`: Decimal (-90 a 90), obrigatório.
- `longitude`: Decimal (-180 a 180), obrigatório.
- `uf`: String (2 caracteres), obrigatório.
- `altura`: Decimal, obrigatório, maior que 0.
- `data_implantacao`: Data, opcional.
- `foto`: String, caminho da imagem.

### Usuários
- `id`: Chave primária.
- `nome`: String, obrigatório.
- `email`: String, obrigatório, único, formato de e-mail válido.
- `senha`: String, obrigatório, entre 8 e 32 caracteres.

## APIs Externas

- **API do IBGE**: Para a listagem das UFs na criação e edição de antenas. [Documentação aqui](https://servicodados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet).

## Considerações Finais

O projeto foi desenvolvido com o objetivo de atender aos requisitos da avaliação prática, priorizando padrões de código (PSR, SOLID) e qualidade de código (Clean Code). A aplicação inclui tratamento de erros e validações de entrada, com mensagens claras para o usuário.

### Futuras Melhorias
- Implementação de testes unitários e de integração.
- Paginação na listagem de antenas para melhor desempenho.
- Integração de um sistema de logs para monitoramento de atividades.

## Links Úteis

- [API de Localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet)
- [Bootstrap](https://getbootstrap.com)
- [PHP Stan](https://phpstan.org)
- [PSR-12: Estilo de código](https://www.php-fig.org/psr/psr-12)
- [Clean Code](https://www.hostgator.com.br/blog/clean-code-o-que-e)

---

Obrigado pelo seu tempo e atenção na avaliação deste projeto!
