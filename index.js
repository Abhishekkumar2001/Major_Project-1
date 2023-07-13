// Importing express
const express = require('express');

const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts'); 

app.use(express.static('./assets'));

// extract style and scripts from sub pages into the layout
//app.set('layoutStyles', true);
//app.set('layoutScripts', true);


app.use(expressLayouts);

//use express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

// Listening the server
app.listen(port, (err) =>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running the port: ${port}`); 
});