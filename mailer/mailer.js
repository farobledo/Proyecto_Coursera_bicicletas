const nodenailer = require('nodenailer');

const mailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'javonte.bauch22@ethereal.email ',
        pass: 'Nz5z4ZaSe4YGCu9PJM'
    }
};

module.exports =  nodenailer.createTransport(mailConfig);