const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets'));
app.use(expressLayouts);



// Use express router
app.use('/', require('./routes'));

//Setup up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in ruuning the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});