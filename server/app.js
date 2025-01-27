const express = require('express');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');
const { sequelize } = require('./models/Models');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const multer = require("multer");

const app = express();
const upload = multer(); // Initialize multer

app.use(upload.none()); // Parse form-data
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

sequelize.sync().then(() => {
    console.log('Database synced successfully.');
}).catch(err => console.error('Error syncing database:', err));


app.use(cors());


app.use(bodyParser.json());

// Use routes
app.use('/auth',userRoutes);
app.use('/api/forms', formRoutes);


// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
