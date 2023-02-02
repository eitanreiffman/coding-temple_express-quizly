const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const { authenticate } = require('./src/middleware/auth')
const cookieParser = require('cookie-parser')

connectDB();

const myLogger = function(req, res, next){
    console.log(req.path);
    next()
}

app.use(myLogger);

// Add cookie parser middleware before authenticate
app.use(cookieParser());

// Add authentication middleware to the app
app.use(authenticate);

// Add graphql middleware to app
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// EJS - Embedded JavaScript Templates
app.set('view engine', 'ejs')
// Update the location of the folder for response.render to use
app.set('views', path.join(__dirname, 'src/templates/views'))

// Set up middleware to parse form data and add to request body
app.use(express.urlencoded({ extended: true }))

// Import function from routes module
const initRoutes = require('./src/routes');
// Execute function with app as the argument
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});