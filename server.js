const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor
require('dotenv').config()

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


