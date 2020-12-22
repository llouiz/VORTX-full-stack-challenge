const express = require('express');
const path = require('path');

const app = express();

// Tratamento de envio de dados em JSON
app.use(express.json());

// Tratamento de envio de dados através de forms
app.use(express.urlencoded({ extended: false }));

//Tornar o servidor/pasta estático
app.use(express.static(path.join(__dirname, 'public')));

const info = [];

// Acesso aos dados através do método POST uma vez que o form for submetido
app.post('/server', function (req, res) {
  var codor = req.body.codor;
  var codest = req.body.codest;
  var mins = req.body.mins;
  var plano = req.body.plano;

  // Tratamento dos dados para os planos SEM e COM FaleMais
  var sem_fale = 0;
  var com_fale = 0;
  var percent = 0;
  var limite_excedido = 0;

  if (mins > plano) {
    limite_excedido = mins - plano;
  }

  if (codor == '011' && codest == '016') { 
    //Plano sem FaleMais
    sem_fale = mins * 1.9;

    //Plano com FaleMais
    com_fale = limite_excedido * 1.9;
    percent = com_fale + com_fale * 0.1;
  } else if (codor == '016' && codest == '011') {
    //Plano sem FaleMais
    sem_fale = mins * 2.9;

    //Plano com FaleMais
    com_fale = limite_excedido * 2.9;
    percent = com_fale + com_fale * 0.1;
  } else if (codor == '011' && codest == '017') {
    //Plano sem FaleMais
    sem_fale = mins * 1.7;

    //Plano com FaleMais
    com_fale = limite_excedido * 1.7;
    percent = com_fale + com_fale * 0.1;
  } else if (codor == '017' && codest == '011') {
    //Plano sem FaleMais
    sem_fale = mins * 2.7;

    //Plano com FaleMais
    com_fale = limite_excedido * 2.7;
    percent = com_fale + com_fale * 0.1;
  } else if (codor == '011' && codest == '018') {
    //Plano sem FaleMais
    sem_fale = mins * 0.9;

    //Plano com FaleMais
    com_fale = limite_excedido * 0.9;
    percent = com_fale + com_fale * 0.1;
  } else {
    //Plano sem FaleMais
    sem_fale = mins * 1.9;

    //Plano com FaleMais
    com_fale = limite_excedido * 1.9;
    percent = com_fale + com_fale * 0.1;
  }

  const infoList = {
    codor: req.body.codor,
    codest: req.body.codest,
    mins: req.body.mins,
    plano: req.body.plano,
    sem_fale: sem_fale.toFixed(2),
    percent: percent.toFixed(2),
  };

  if (info.length < 1) {
    info.push(infoList);
  }
  res.redirect('/');
});

//Listar os dados
app.get('/api/info', (req, res) => {
  res.json(info);
  if (info.length == 1) {
    info.length = 0;
  }
});

// End-point para executar testes
app.get('/test', (req, res) => {
  res.status(500).send({ msg: 'Error...' });
});

const PORT = process.env.PORT || 5000;

//Abrindo conexão com o servidor
var server = app.listen(PORT, () =>
  console.log(`Servidor iniciado na porta ${PORT}`)
);

module.exports = server;
