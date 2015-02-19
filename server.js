var express = require('express')
    , http = require('http')
    , path = require('path')
    , cors = require("cors"); // Cross Origin Access Sharing, just in case ;


var app = express();

app.set('title','red ant');

app.use(express.static(path.join(__dirname, '')));


/* serves main page */
app.use("/", express.static(__dirname + 'index.html'));


var port = process.env.PORT || 5090;

http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});
