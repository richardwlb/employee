const express = require('express'); 
const requireDir = require('require-dir');
const cors  = require('cors');
const bodyParser = require('body-parser');

// Iniciando o App
const app = express(); 
// Para permitir que sejam enviado dados JSON para a aplicação
app.use(express.json());
app.use(cors()); // Alow anothers domains to use this app

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection
require('./src/conn');

// Go to routes
app.use('/api', require('./src/routes') );

const port = process.env.PORT || 3333; 
app.listen( port, () => console.log(`Working on port ${port}`));