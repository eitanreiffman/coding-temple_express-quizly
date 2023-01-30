const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs')
// Update the location of the folder for response.render to use
app.set('views', path.join(__dirname, 'src/templates/views'))

app.get('/', (request, response) => {
    response.send('Hello World');
});

// Import function from routes module
const initRoutes = require('./src/routes');
// Execute function with app as the argument
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// EJS - Embedded JavaScript Templates