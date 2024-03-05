const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.use(express.static('public'));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


