const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
var mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require("http");
var port = process.env.PORT || 4000;

const server = http.createServer(app);
const socket = socketio(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://epitech:dashboard@cluster0-pjznu.mongodb.net/jobizz?retryWrites=true&w=majority\n"; //url pour se connecter a la db
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true}); //connection a la db
const connection = mongoose.connection;    //creation de l'objet connexion
connection.once('open', () => {
    console.log("Connexion a la db ok");
    }
);


const usersRouter = require('./routes/users');//route pour le user/ le fichier qui nous permettra de stocker les element
const anoRouter = require('./routes/annonces');
const recruRouter = require('./routes/recruteur');

app.use('/users', usersRouter); //use du fichier
app.use('/annonce', anoRouter);
app.use('/recruteur', recruRouter);

app.listen(port, () => { //deploiement en server local
    console.log('server se co à :',port);
});
