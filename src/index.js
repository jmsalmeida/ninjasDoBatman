const express = require(`express`);
const expressMongoDB = require(`express-mongo-db`);
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require(`body-parser`);
const cors = require('cors');
const porta = 3000;

const app = express();

app.use(bodyParser.json());
app.use(expressMongoDB(`mongodb://localhost/batmanUniverse`));
app.use(cors());

app.get(`/personagens`, (req, res) => {
  req.db.collection(`personagens`).find().toArray((err, data) => {
    if(err){
      res.status(500).send(`Erro ao buscar no servidor`);
      return;
    }
    res.send(data);
  });
});

app.get(`/personagem/:id`, (req, res) => {
  const query = {
    _id : ObjectID(req.params.id)
  };
  req.db.collection(`personagens`).findOne(query, (err, data) => {
    if(err){
      res.status(500).send();
      return;
    };

    if(!data){
      res.status(404).send(`ID não encontrado!`);
      return;
    };

    res.send(data);
  });
});

app.post(`/personagem`, (req, res) => {
  req.db.collection(`personagens`).insert(req.body, err => {
    if(err){
      res.status(500).send();
      return;
    }
    res.send(req.body);
  });
});

app.put(`/personagem/:id`, (req, res) => {
  const query = {
    _id: ObjectID(req.params.id)
  };
  req.db.collection(`personagens`).updateOne(query, req.body, (err, data) => {
    if(err){
      res.status(500).send();
      return;
    }
    res.send(data);
  });
});

app.listen(porta, _ => console.log(`Servidor iniciado com sucesso!`));