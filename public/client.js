console.log('client.js has been loaded');

$(document).ready(function () {
    console.log('jquery is loaded');
    //var mathInput = {};
    //var numberInputQueue = [];
    var inputDisplay = '';
    var inputObj = {};
    var operator = '';
    $('#1, #2, #3, #4, #5, #6, #7, #8, #9, #0').on('click', function() {
        //console.log(this.id + ' button clicked.');
        displayInput(this.id);
        //numberInputQueue.push(this.id);
    });
    $('#add, #subtract, #divide, #multiply').on('click', function () {
        //console.log(this + ' button clicked');
        //mathInput.mathVerb = this.id;
        switch(this.id) {
            case 'add':
                operator = '+';
                break;
            case 'subtract':
                operator = '-';
                break;
            case 'multiply':
                operator = '*';
                break;
            case 'divide':
                operator = '/';
                break;
            default:
                break;
        }
        displayInput(operator);
    });
    $('#clear').on('click', function() {
        $('#answer').empty().text('0');
        // mathInput.mathVerb = '';
        // numberInputQueue = [];
        inputDisplay = '';
    });
    $('#equals').on('click', function() {
        // mathInput.numberOne = numberInputQueue[numberInputQueue.length - 2];
        // mathInput.numberTwo = numberInputQueue[numberInputQueue.length - 1];
        inputObj = {
            input: inputDisplay
        }
        // console.log('mathInput: ');
        // console.log(mathInput);
        postCalc();
        inputDisplay = '';
    });

    function postCalc() {
         $.ajax({
            method: 'POST',
            url: '/postCalc',
            data: inputObj,
            success: function (response) {
                // console.log(response);
                // mathInput.mathVerb = '';
                // numberInputQueue = [];
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
            success: function (response) {
                console.log('get response: ' + response);
                $('#answer').text("Computing...")
                setTimeout(function() {
                    $('#answer').text(response);
                }, 3000);
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

