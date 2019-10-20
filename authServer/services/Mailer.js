
const { sendGridKey } = require('../config/keys');

const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: sendGridKey
    })
);

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
