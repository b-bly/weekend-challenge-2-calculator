console.log('client.js has been loaded');

$(document).ready(function () {
    console.log('jquery is loaded');
    var mathInput = {};
    var numberInputQueue = [];
    var inputDisplay = '';
    $('#1, #2, #3, #4, #5, #6, #7, #8, #9, #0').on('click', function() {
        //console.log(this.id + ' button clicked.');
        displayInput(this.id);
        numberInputQueue.push(this.id);
    });
    $('#add, #subtract, #divide, #multiply').on('click', function () {
        //console.log(this + ' button clicked');
        mathInput.mathVerb = this.id;
        displayInput(this.id);
    });
    $('#clear').on('click', function() {
        $('#answer').empty().text('0');
        mathInput.mathVerb = '';
        numberInputQueue = [];
        inputDisplay = '';
    });
    $('#equals').on('click', function() {
        mathInput.numberOne = numberInputQueue[numberInputQueue.length - 2];
        mathInput.numberTwo = numberInputQueue[numberInputQueue.length - 1];
        console.log('mathInput: ');
        console.log(mathInput);
        postCalc();
    });

    function postCalc() {
         $.ajax({
            method: 'POST',
            url: '/postCalc',
            data: mathInput,
            success: function (response) {
                console.log(response);
                mathInput.mathVerb = '';
                numberInputQueue = [];
                getCalc();
            },
            error: function (xhr, _, errorThrown) {
                console.log(xhr);
                alert("Error! Type: " + xhr.status + ': ' + errorThrown);
            }
        });
    }

    function getCalc() {
        $.ajax({
            method: 'GET',
            url: '/getCalc',
            success: function (response) { // response will be the array of geese
                console.log(response);
                $('#answer').empty().text(response);
            }
        });
    }

    function displayInput(input) {
        if (/[0-9]/.test(input) == true) {
            inputDisplay += input;
        } else {
            input = input.replace('add', '+').replace('subtract', '-').replace('multiply', 'x').replace('divide', '/');
            inputDisplay += input;
        }
        $('#answer').empty().text(inputDisplay);
    }
});

