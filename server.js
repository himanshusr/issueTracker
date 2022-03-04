const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init MiddleWare
app.use(express.json({ extended: false }));

//Routes
app.use('/api/issue', require('./routes/api/issue'));

app.get('/', (req, res) => {
  res.send('Epek.in Api Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
