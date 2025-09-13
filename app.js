const express = require('express');
const app = express();
const PORT = 8081 || 8080 || 3000;


app.listen(PORT, ()=>{
    console.log(`Servidor esta sendo executado na porta http://localhost:${PORT}`)
})