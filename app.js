const express = require('express'); //'require' p/ importar o express
const app = express(); //instancia do express

//function iniciarServidor(){
    // identacao é o espaco entre a amargem e o inicio do código
    //return: 5;
//}

//Arrow function (Funcao de seta)
// const criarServidor = ()=> {
//}

const PORT = 8081;

//SEMPRE A ÚLTIMA LINHA DO CÓDIGO
app.listen(PORT, ()=> {
    //uma funcao de callback é uma funcao dentro de outra, retorna um valor a uma funcao
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});
