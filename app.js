var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;
var answer = 0;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/postCalc', function (req, res) {
    var input = req.body.input;
    //make sure it starts and ends with numbers--if not, delete extras
    var numbers = input.split(/\+|\/|\-|\*/).map(function (number) {
        return parseInt(number);
    });
    var operators = input.split(/\d+/).filter(function (number) {
        return number == '' ? false : true;
    });
    //if more than one operator in a row, use the last one entered
    var counter = 0;
    operators = operators.filter(function (operator, i) {
        if (operator == "*") {
            numbers[i - counter] = numbers[i - counter] * numbers[i + 1 - counter];
            numbers.splice(i + 1 - counter, 1);
            counter++;
            return false;
        } else if (operator == "/") {
            numbers[i - counter] = numbers[i - counter] / numbers[i + 1 - counter];
            numbers.splice(i + 1 - counter, 1);
            counter++;
            return false;
        } else {
            return true;
        }
    });
    answer = numbers.shift();
    for (var i = 0; i < numbers.length; i++) {
        if (operators[i] == "+") {
            answer += numbers[i];
        } else {
            answer -= numbers[i];
        }
    }
    answer = answer.toString(10);
    console.log(answer);
    res.sendStatus(201);
});

app.get('/getCalc', function (req, res) {
    console.log('get ' + typeof answer);
    res.send(answer);
});

app.listen(port, function () {
    console.log('Running on port: ', port);
});