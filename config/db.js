const mongoose = require('mongoose');

const MONGO_USERNAME = 'user';
const MONGO_PASSWORD = 'password';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'auth_users';

const url = process.env.MONGO_URL || `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`


mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});

mongoose.connection.on('error',(e)=>{
  console.log('error found')
})