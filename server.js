const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

//coonect to the dadabase
connectDB();

//route files
const contact = require('./routes/contact');
const user    = require('./routes/user')

const app = express();

//body-Parser
app.use(express.json());

app.use(cors())

//mount routers
app.use('/api/v1/contacts', contact);
app.use('/api/v1/auth', user);

app.use(errorHandler);//to use the error handler it have to be after we mount our routes


const PORT = process.env.PORT ;

const server = app.listen(PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow.bgBrightGreen));

//handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1));
});