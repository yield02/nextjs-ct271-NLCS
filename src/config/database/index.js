const mongoose = require('mongoose');

async function connect() {
    try {
        if(!mongoose.connection.readyState) {
            await mongoose.connect('mongodb+srv://thanhnhuong0702:b2014682NLCS@cluster0.wb3cmop.mongodb.net/Nextjs-forum-NLCS');
            console.log('Database Connect successfully!!!');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };