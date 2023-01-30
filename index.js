const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (request, response) => {
    response.render('register', {username: "Eitan"});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// EJS - Embedded JavaScript Templates