const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const apiUri = process.env.API_URI || 'http://localhost:3001'

async function sendEmail(mail) {
    const msg = {
        to: mail.to,
        from: {
            email: 'hoanganhx86@gmail.com',
            name: 'Anh Nguyen',
        },
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${mail.fullName}</h2>
            <p>Thank you for register. Please confirm your email by clicking on the following link</p>
            <a href=${apiUri}/users/verify/${mail.confirmationCode}> Click here</a>
            </div>`
    };
    try {
        await sgMail.send(msg);
    } catch (err) {
        console.error(`Unable send email to ${mail.to}`, err);
        throw err;
    }
}

module.exports = sendEmail;
