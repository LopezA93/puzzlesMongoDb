const moongose = require('mongoose');
require('dotenv').config();


async function connection() {

    const URLstring = process.env.MONGODB_URI;

    await moongose.connect(URLstring)
}

module.exports = connection;