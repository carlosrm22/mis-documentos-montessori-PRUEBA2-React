const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

app.post('/save-pdf', (req, res) => {
    const { attachment } = req.body;

    if (!attachment) {
        return res.status(400).send('No attachment provided.');
    }

    const buffer = Buffer.from(attachment, 'base64');
    const filePath = path.join(__dirname, 'uploads', 'file.pdf');

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return res.status(500).send('Error saving the file.');
        }
        res.send('File saved successfully.');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
