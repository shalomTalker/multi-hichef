
const keys = require('../config/keys');

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Sendgrid',
    auth: {
        user: 'hichef-prod',
        pass: 'AaSsDdFf1234'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, subject, to, html }, (err, info) => {
                if (err) reject(err);
                resolve(info);
            });
        });
    }
}

