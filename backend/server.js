const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sociedadmontessori@gmail.com',
        pass: 'vFP6RR3Wr9Mwv.6'
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text, attachment } = req.body;

    const mailOptions = {
        from: 'sociedadmontessori@gmail.com',
        to,
        subject,
        text,
        attachments: [
            {
                filename: 'documento.pdf',
                content: attachment,
                encoding: 'base64'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
