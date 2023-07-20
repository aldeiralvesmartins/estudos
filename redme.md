<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/aldeiralvesmartins/estudos/blob/main/logo.png?raw=true" alt="Logo" width="150" height="50">
  </a>

<h3 align="center">R2 Disponibilidade</h3>

  <p align="center">
    Software para gestão de disponibilidade de lotes e controle de reservas.
   <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Índice</summary>
  <ol>
 <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
   <li><a href="#construído-com">Construído Com</a></li>
    <li><a href="#pre-requisitos">Pré-requisitos</a></li>
    <li><a href="#instalação">Instalação</a></li>
    <li><a href="#passos-para-configurar-em-ambiente-de-desenvolvimento">Passos para configurar em ambiente de desenvolvimento</a></li>
    <li><a href="#para-iniciar-serviço-de-queues-manualmente">Para iniciar serviço de queues Manualmente</a></li>
    <li><a href="#para-colocar-filas-para-rodar-no-supervisor">Para colocar filas para rodar no Supervisor</a></li>
    <li><a href="#rodar-para-restart-do-supervisor">Rodar para restart do Supervisor</a></li>
    <li><a href="#árvore-de-diretórios-da-pasta-storage">Árvore de diretórios da pasta storage</a></li>
    <li><a href="#run-coverage">Run Coverage</a></li>
    <li><a href="#contribuindo">Contribuindo</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## Sobre o Projeto

[![Product Name Screen Shot][product-screenshot]](pagina.png)

# Bem-vindo ao R2 Disponibilidade - Sistema Completo para Gerenciamento de Loteamentos e Lotes!

O R2 Disponibilidade é uma plataforma avançada para auxiliar no gerenciamento de loteamentos, lotes e reservas, proporcionando uma experiência eficiente e prática em projetos imobiliários. Com esta plataforma, você pode controlar todas as etapas do processo, desde a criação de loteamentos até o gerenciamento de vendas e reservas.

## Loteamentos

Na seção de Loteamentos, você terá acesso a uma visão detalhada dos seus projetos imobiliários em um mapa interativo. Essa funcionalidade permite uma análise completa da disponibilidade e ocupação de lotes. Além disso, é possível adicionar novos loteamentos, editar informações e atribuir corretores especializados para cada projeto.

## Lotes

Gerencie o status de cada lote de forma intuitiva! O R2 Disponibilidade permite marcar os lotes como Bloqueados, Disponíveis, Reserva Confirmada, Reservados ou Vendidos. Além disso, você pode realizar reservas ou simular compras, proporcionando a melhor experiência possível aos seus clientes.

## Dashboard Personalizado

Nossa plataforma oferece um Dashboard personalizado para cada loteamento específico. Nele, você terá acesso a informações detalhadas sobre vendas, reservas e outras métricas importantes para uma gestão eficiente.

## Reservas

A seção de Reservas lista todos os lotes atualmente reservados, permitindo a renovação ou ajuste dos prazos conforme necessário. Além disso, é possível criar propostas personalizadas e visualizar o histórico completo de cada reserva, garantindo um atendimento personalizado e de qualidade.

## Gestão de Pessoas

Com o R2 Disponibilidade, você pode gerenciar o cadastro de clientes, corretores e outras partes interessadas de forma simples e rápida. Adicione, edite ou exclua registros, mantendo sempre os dados atualizados e organizados.

Desfrute da eficiência e praticidade da nossa plataforma para otimizar o gerenciamento de loteamentos, lotes, reservas e pessoas em seus projetos imobiliários. Conte com nosso apoio em cada passo do caminho para o sucesso!



<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


## Construído Com

* [![Laravel][Laravel.com]][Laravel-url]

* [![PHP][PHP-badge]][PHP-url]


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


## Pre Requisitos

* PHP >= 8.0
* OpenSSL PHP Extensão
* PDO PHP Extensão
* Mbstring PHP Extensão


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


### Instalação

1. Faça o clone do repositório para o seu ambiente de desenvolvimento:
   ```bash
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Instale as dependências do projeto usando o Composer:
   ```bash
   composer install
   ```
3. Crie o arquivo de configuração de ambiente `.env` copiando o exemplo fornecido:
   ```bash
   cp .env.example .env
   ```
4. Edite o arquivo `.env` e adicione as informações de configuração necessárias, como chaves de API, credenciais do
   banco de dados, etc.
   <br>
   <br>
5. Rode as migrações do banco de dados:
   ```bash
    php artisan migrate --seed  
    ```
6. Inicie o servidor local para executar o projeto:
   ```bash
    php -S localhost:9000 -t public
   ```

<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


## Passos para configurar em ambiente de desenvolvimento:

-   Acessar o diretório do projeto, depois executar o comando  **composer install**  para baixar as dependências do projeto.
-   Criar um arquivo chamado:  **.env**. Observação: basta copiar o arquivo .env.example que contém as chaves necessárias para o projeto trabalhar, e adicionar os valores às chaves.
-   Depois de executar os passos acima, execute o comando:  **php -S localhost:9000 -t public**  para executar o projeto usando servidor imbutido do php. Com isso você terá a aplicação rodando no endereço http://localhost:9000.
-   Executar comando:  **php artisan migrate**  para rodar as migrations


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


## Para iniciar serviço de queues Manualmente

- Executar comando: **php artisan queue:work** ou **php artisan queue:listen** para deixar o serviço aguardando requisição de fila
- Ao chamar a rota **"{URL-DISPONIBILIDADE}/v1/AtualizaReservasParaExpiradas"** será chamada uma verificação do tempo de expiração de uma reserva (portanto) necessita-se adicionar ao agendador a chamada dessa rota de forma temporizada para realizar a expiração das reservas.

<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>



## Para Colocar Filas para Rodar no Supervisor

* Instalar serviço de Supervisor: "**sudo apt-get install supervisor**"

>* Acessa a pasta /etc/supervisor/conf.d/
>* Cria arquivo "r2disponibilidade-worker.conf"
>* Cola texto abaixo (adapta terceira linha para apontar endereço do diretório do projeto); (adapta penúltima linha para gravar logs dentro do diretório do projeto)
>* Adaptar o USER do arquivo abaixo para o usuário LINUX que o servidor usa.
```sh
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/usuario10/r2-projetos/r2-disponibilidade/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=usuario10
numprocs=8
redirect_stderr=true
stdout_logfile=/home/usuario10/r2-projetos/r2-disponibilidade/worker.log
stopwaitsecs=3600
``` 

* Roda no terminal recarregamento das configurações do Supervisor: "**sudo supervisorctl reread**"
* Roda Update do Supervisor: "**sudo supervisorctl update**"
* Roda Start do Supervisor de todas as configurações: "**sudo supervisorctl start laravel-worker:*** "


> Links Uteis <br>
>*  https://laravel.com/docs/9.x/queues#supervisor-configuration <br>
>*  http://supervisord.org/index.html <br>
>*  https://www.zentao.pm/blog/use-Supervisor-to-manage-Laravel-queue-416.html <br>

## Rodar para restart do Supervisor
* Quando há alteração de Queues(filas) ou alteração de configuração de supervisor
>**service supervisor restart**<br>


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


## Árvore de diretórios da pasta storage
- A pasta storage deve possuir a seguinte estrutura. Verifique se o seu projeto possui:
 ```sh
.storage
├──── framework
|         ├── app
|         |     ├── public 
|         |     |      └── .gitignore      
|         |     └── .gitignore
|         |
|         ├── cache
|         |      ├── data 
|         |      └── .gitignore
|         |
|         ├── sessions 
|         |      └── .gitignore
|         |         
|         └── views
|                └── .gitignore
|         
|
└───── logs
           └─── .gitignore            
```
É importante seguir essa estrutura porque durante a execução são gerados arquivos temporarios (além de arquivos de logs) dentro de algumas pastas, e se não existir essa pasta o sistema não a criará.


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


## Run Coverage
>XDEBUG_MODE=coverage vendor/bin/phpunit --whitelist src/ --coverage-html tests/_reports/coverage

<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>
<!-- Contribuindo -->

## Contribuindo

1. Crie sua Feature Branch (`git checkout -b feature/NomeFeature`)
2. Commit suas mudanças (`git commit -m 'Add some NomeFeature'`)
3. Push para a Branch (`git push origin feature/NomeFeature`)
4. Abra uma solicitação pull


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>

## Contato

R2 Soft - [@your_twitter](https://twitter.com/r2_soft) - suporte@r2soft.com.br
<br>
Link do Projeto:[https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)


<p align="right">(<a href="#readme-top">volta ao topo</a>)</p>


[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[PHP-badge]: https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white
[PHP-url]: https://www.php.net/
