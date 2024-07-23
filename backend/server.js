const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.post('/save-pdf', (req, res) => {
    const { filename, content } = req.body;

    fs.writeFile(`./uploads/${filename}`, content, 'base64', (err) => {
        if (err) {
            return res.status(500).send(err.toString());
        }
        res.status(200).send('PDF saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
