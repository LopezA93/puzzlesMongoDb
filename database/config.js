const moongose = require('mongoose');
require('dotenv').config();


async function connection() {

    const URLstring = process.env.DATABASE;

    await moongose.connect(URLstring)
}

module.exports = connection;