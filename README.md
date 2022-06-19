# Validador de código de barras
<p>Esse repositório foi criado com o intuito de criar um validador de código de barras para qualquer tipo.</p>

<p>As validações criadas tiveram como base as instruções demonstradas por documentos públicos para a criação dos códigos.</p>

## Como executar o projeto

<p>Ao clonar projeto ou baixá-lo, é necessário executar primeiramente o seguinte comando:</p>

`npm install`

<p>Em seguida, inicie o servidor com o comando: </p>

`npm run server`

<p>Com o endpoint <i>/boleto</i> é possível consultar as informações de um boleto</p>

![image](https://user-images.githubusercontent.com/47681059/174496699-d1424d76-5412-4497-b3d1-4efee76df4de.png)


## Testes unitários

<p>Para executar os testes construídos, basta usar o comando: </p>

`npm test`

## Dockerizando a aplicação

<p>Na raiz do projeto, para executar o <i>compose</i> rode o comando:</p>

`docker-compose up -d --build`
