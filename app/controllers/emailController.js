'use strict'
const EMAIL_CONTR = 'emailController: ';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shoponlinejewellery@gmail.com',
        pass: 'siddiqui11!'
    }
});

var mailOptions = {
    from: 'shoponlinejewellery@gmail.com',
    to: 'shoponlinejewellery@gmail.com',
    subject: 'Feedback from customer name: '
};

exports.sendEmail = function (req) {

    // "name":"Arsalan Siddiqui","email":"robotics1@gmail.com","phone":"Telephone","msg":"Message..."
    // console.log('-------' + EMAIL_CONTR + 'at the starting of sendEmail function');
    mailOptions.subject += req.body.name;
    let text = "Email: " + req.body.email + "\n";
    text += "Phone: " + req.body.phone + "\n";
    text += "Message: " + req.body.msg;
    mailOptions.text = text;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log('-------' + EMAIL_CONTR + 'at the end of sendEmail function');
}
