const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')

connectDB();

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
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Hello');
});

// Import function from routes module
const initRoutes = require('./src/routes');
// Execute function with app as the argument
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
