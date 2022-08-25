const nodemailer = require('nodemailer');

const mailerconfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'skylar.ziemann21@ethereal.email',
        pass: 'rsPBxhwrZucQy8ZRwr'
    }
};

module.exports = nodemailer.createTransport(mailerconfig);