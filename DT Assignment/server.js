const express = require('express');
const bodyParser = require('body-parser');
const { connectToDB } = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api/v3/app', eventRoutes);

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
