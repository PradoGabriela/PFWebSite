const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs'); // Set the template engine
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

app.use(express.static("views"));
app.use(express.static("images"));
app.use(express.static("public"));
app.use(express.static("partials"));
app.use(express.static("css"));
app.use(express.static("components"));
app.use(express.static("controller"));
app.use(express.static("assets"));
app.use(express.static("assets/css"));


app.use(require('./routes.js'));


// Handling 404 errors
app.use((req, res, next) => {
    res.status(404);
    res.redirect('/error'); // Render a specific 404 page
    // or
    // res.json({ error: 'Not Found' }); // Send a JSON response
  });



  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500);
    res.redirect('/servererror'); // Render a general error page
    // or
    // res.json({ error: 'Internal Server Error' }); // Send a JSON response
  });




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log("demo live at http://localhost:3000/");
});