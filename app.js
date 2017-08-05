
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 5000;

var answer = 0;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/getCalc', function(req, res){
    //console.log(answer);
    res.send(answer);
});

app.post('/postCalc', function(req, res) {
    //console.log(req.body);
    if (req.body.numberOne.length == 0 ||
        req.body.numberTwo.length == 0) {
        sendStatus(400);
    } else {
        var numberOne = parseInt(req.body.numberOne);
        var numberTwo = parseInt(req.body.numberTwo);
        switch(req.body.mathVerb) {
            case 'add':
                answer = numberOne + numberTwo;
                break;
            case 'subtract':
                answer = numberOne - numberTwo;
            case 'multiply':
                answer = numberOne * numberTwo;
            case 'divide':
                answer = numberOne / numberTwo;
        }
        answer = answer.toString(10);
        res.sendStatus(201);
    }
});

app.listen(port, function(){
    console.log('Running on port: ', port);
});