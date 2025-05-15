const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://atlaghamine:jhPFXReZnzs2pg6e@ravodb.sgxymuw.mongodb.net/test?retryWrites=true&w=majority&appName=ravoDB'

mongoose.connection.once('open', () => {
    console.log('ready');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

module.exports = {mongoConnect};