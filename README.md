<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Avaliação Prática em PHP - Spassu</title>
</head>
<body>
    <h1>Avaliação Prática em PHP - Spassu</h1>

    <p>Bem-vindo à minha solução para a avaliação prática em PHP! Este projeto foi desenvolvido em <strong>Laravel 11</strong> para o backend, atendendo aos requisitos e especificações descritos na avaliação.</p>

    <h2>Índice</h2>
    <ul>
        <li><a href="#instalacao">Instalação</a></li>
        <li><a href="#configuracao">Configuração</a></li>
        <li><a href="#funcionalidades-implementadas">Funcionalidades Implementadas</a></li>
        <li><a href="#modelo-de-dados">Modelo de Dados</a></li>
        <li><a href="#apis-externas">APIs Externas</a></li>
        <li><a href="#consideracoes-finais">Considerações Finais</a></li>
        <li><a href="#links-uteis">Links Úteis</a></li>
    </ul>

    <hr>

    <h2 id="instalacao">Instalação</h2>
    <ol>
        <li>Clone o repositório para seu ambiente local:
            <pre><code>git clone https://github.com/limanetomcz/antenas.git</code></pre>
        </li>
        <li>Navegue até a pasta do projeto:
            <pre><code>cd nome-do-projeto</code></pre>
        </li>
        <li>Instale as dependências do projeto:
            <pre><code>composer install</code></pre>
        </li>
        <li>Crie o arquivo <code>.env</code> com base no arquivo <code>.env.example</code>:
            <pre><code>cp .env.example .env</code></pre>
        </li>
        <li>Gere uma chave de aplicação:
            <pre><code>php artisan key:generate</code></pre>
        </li>
        <li>Configure as variáveis de ambiente no <code>.env</code>, como o banco de dados (exemplo com MySQL):
            <pre><code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mariadb
DB_USERNAME=root
DB_PASSWORD=123456</code></pre>
        </li>
        <li>Execute as migrações e seeders para criar e popular as tabelas:
            <pre><code>php artisan migrate --seed</code></pre>
        </li>
    </ol>

    <h2 id="configuracao">Configuração</h2>
    <ol>
        <li><strong>JWT</strong>: Para autenticação, este projeto usa o JWT. Configure o JWT no <code>.env</code>:
            <pre><code>JWT_SECRET=chave_do_seu_jwt</code></pre>
        </li>
        <li><strong>API do IBGE</strong>: O projeto utiliza a <a href="https://servicodados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet">API de localidades do IBGE</a> para listar os estados (UFs) no formulário de antenas.</li>
        <li><strong>Executando o Projeto</strong>: Inicie o servidor local do Laravel:
            <pre><code>php artisan serve</code></pre>
        </li>
    </ol>

    <h2 id="funcionalidades-implementadas">Funcionalidades Implementadas</h2>
    <ul>
        <li><strong>Listagem de Antenas</strong>: Exibe uma lista completa de antenas cadastradas.</li>
        <li><strong>Detalhes da Antena</strong>: Visualização de informações específicas de uma antena, incluindo foto e mapa com localização.</li>
        <li><strong>Ranking de UFs</strong>: Apresenta as 5 UFs com mais antenas cadastradas.</li>
        <li><strong>CRUD Completo de Antenas</strong>:
            <ul>
                <li><strong>Criação</strong>: Tela de cadastro de antenas com validação e seleção de UFs a partir da API do IBGE.</li>
                <li><strong>Edição</strong>: Tela para edição de dados de uma antena existente, incluindo validações.</li>
                <li><strong>Exclusão</strong>: Confirmação de exclusão antes de apagar um registro.</li>
            </ul>
        </li>
        <li><strong>Carga de Dados</strong>: Script para carga massiva de até 100 mil registros de antenas.</li>
        <li><strong>Autenticação e Autorização</strong>:
            <ul>
                <li><strong>Registro de Usuário</strong>: Cadastro de novos usuários.</li>
                <li><strong>Login e Logout</strong>: Autenticação com geração de token JWT para acessar rotas protegidas.</li>
            </ul>
        </li>
    </ul>

    <h2 id="modelo-de-dados">Modelo de Dados</h2>
    <h3>Antenas</h3>
    <ul>
        <li><strong>id</strong>: UUID, chave primária.</li>
        <li><strong>descricao</strong>: String, obrigatório, único, 10-100 caracteres.</li>
        <li><strong>latitude</strong>: Decimal (-90 a 90), obrigatório.</li>
        <li><strong>longitude</strong>: Decimal (-180 a 180), obrigatório.</li>
        <li><strong>uf</strong>: String (2 caracteres), obrigatório.</li>
        <li><strong>altura</strong>: Decimal, obrigatório, maior que 0.</li>
        <li><strong>data_implantacao</strong>: Data, opcional.</li>
        <li><strong>foto</strong>: String, caminho da imagem.</li>
    </ul>

    <h3>Usuários</h3>
    <ul>
        <li><strong>id</strong>: Chave primária.</li>
        <li><strong>nome</strong>: String, obrigatório.</li>
        <li><strong>email</strong>: String, obrigatório, único, formato de e-mail válido.</li>
        <li><strong>senha</strong>: String, obrigatório, entre 8 e 32 caracteres.</li>
    </ul>

    <h2 id="apis-externas">APIs Externas</h2>
    <p><strong>API do IBGE</strong>: Para a listagem das UFs na criação e edição de antenas. <a href="https://servicodados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet">Documentação aqui</a>.</p>

    <h2 id="consideracoes-finais">Considerações Finais</h2>
    <p>O projeto foi desenvolvido com o objetivo de atender aos requisitos da avaliação prática, priorizando padrões de código (PSR, SOLID) e qualidade de código (Clean Code). A aplicação inclui tratamento de erros e validações de entrada, com mensagens claras para o usuário.</p>

    <h3>Futuras Melhorias</h3>
    <ul>
        <li>Implementação de testes unitários e de integração.</li>
        <li>Paginação na listagem de antenas para melhor desempenho.</li>
        <li>Integração de um sistema de logs para monitoramento de atividades.</li>
    </ul>

    <h2 id="links-uteis">Links Úteis</h2>
    <ul>
        <li><a href="https://servicodados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet">API de Localidades do IBGE</a></li>
        <li><a href="https://getbootstrap.com">Bootstrap</a></li>
        <li><a href="https://phpstan.org">PHP Stan</a></li>
        <li><a href="https://www.php-fig.org/psr/psr-12">PSR-12: Estilo de código</a></li>
        <li><a href="https://www.hostgator.com.br/blog/clean-code-o-que-e">Clean Code</a></li>
    </ul>

    <p>Obrigado pelo seu tempo e atenção na avaliação deste projeto!</p>
</body>
</html>
