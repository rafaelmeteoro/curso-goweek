const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Escolha a url pelo banco na nuvem ou pelo docker
// const urlConnect = 'mongodb://goweek:goweek123@ds049651.mlab.com:49651/goweek-backend';
const urlConnect = 'mongodb://db/goweek-backend';

mongoose.connect(
    urlConnect, 
    {
        useNewUrlParser: true 
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
