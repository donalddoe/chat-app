
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const Pusher = require('pusher');
const config = require('config')

const app = express();


const appId = config.get('appId')
const key = config.get('key') 
const secret = config.get('secret')

const pusher = new Pusher({
    appId: appId,
    key: key,
    secret: secret,
    useTLS: true
  });

  app.use(express.urlencoded({extended : false}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

  app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });



const port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`Server is up and running on port ${port}`))

module.exports = server