console.log('client.js has been loaded');

$(document).ready(function () {
    console.log('jquery is loaded');
    var mathInput = {};
    $('#add, #subtract, #divide, #multiply').on('click', function () {
        console.log(this + ' button clicked');
        var numberOneInput = $('#numberOne').val();
        var numberTwoInput = $('#numberTwo').val();
        
        mathInput.numberOne = numberOneInput;
        mathInput.numberTwo = numberOneInput;
        mathInput.mathVerb = this.id;
        
        console.log('mathInput: ');
        console.log(mathInput);
         $.ajax({
            method: 'POST',
            url: '/postCalc',
            data: mathInput,
            success: function (response) {
                console.log(response);
                getCalc();
            },
            error: function (xhr, _, errorThrown) {
                console.log(xhr);
                alert("Error! Type: " + xhr.status + ': ' + errorThrown);
            }
        });
    });
});


function postCalc() {
    $.ajax({
        method: 'POST',
        url: '/postCalc',
        data: mathInput,
        success: function (response) {
            console.log(response);
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
    })
}

