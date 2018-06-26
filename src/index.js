const express = require(`express`);
const expressMongoDB = require(`express-mongo-db`);
const bodyParser = require(`body-parser`);
const porta = 3000;

const app = express();

app.use(bodyParser.json());
app.use(expressMongoDB(`mongodb://localhost/batmanUniverse`));

app.get(`/personagens`, (req, res) => {
  req.db.collection(`personagens`).find().toArray((err, data) => {
    if(err){
      res.status(500).send(`Erro ao buscar no servidor`);
      return;
    }
    res.send(data);
  });
});


app.listen(porta, _ => console.log(`Servidor iniciado com sucesso!`));