const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app')

const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_STRING)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log('An error ocurred' + err))

app.listen(port, () => console.log('Server started on port ' + port))



