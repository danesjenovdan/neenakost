var slovenijafaza;

function animateLeftPart() {
    $.each($('.bar-histogram-lefty'), function(i, e) {

        $(e).prev().animate({
            'top': 315 - $(e).data('value')
        });

        $(e).parent().addClass('bar-visible');
        $(e).animate({
            'height': $(e).data('value') + 'px'
        });
    });
}
function destroyLeftPart() {
    $.each($('.bar-histogram-lefty'), function(i, e) {

        $(e).prev().animate({
            'top': 315
        });

        $(e).animate({
            'height': 0
        }, 700, function() {
            $(e).parent().removeClass('bar-visible');
        });
    });
}


function animateRightPart() {
    $.each($('.bar-histogram-righty'), function(i, e) {

        $(e).prev().animate({
            'top': 315 - $(e).data('value')
        });

        $(e).parent().addClass('bar-visible');
        $(e).animate({
            'height': $(e).data('value') + 'px'
        });
    });
}
function destroyRightPart() {
    $.each($('.bar-histogram-righty'), function(i, e) {

        $(e).prev().animate({
            'top': 315
        });

        $(e).animate({
            'height': 0
        }, 700, function() {
            $(e).parent().removeClass('bar-visible');
        });
    });
}

function setUpSlovenija() {

    // menu update
    $('.menuitem.active').removeClass('active');
    $('.menuitem-zastava').addClass('active');

    slovenijafaza = 0;

    $('.theslovenijabutton').on('click', function() {
        slovenijafaza = $(this).data('slovenijafaza');

        switch (slovenijafaza) {
            case 0:

                $('.content-first-slovenija').addClass('hidden');
                $('.content-slovenija-gini').removeClass('hidden');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 1:

                animateLeftPart();

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 2:

                animateRightPart();

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 3:

                $('.content-slovenija-gini').addClass('hidden');
                $('.content-slovenija-drugacenpogled').removeClass('hidden');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            default:

                break;

        }
    });

    $('.theslovenijabackbutton').on('click', function() {
        switch (slovenijafaza) {
            case 0:

                $('.content-dohodkovna-gini-slider').removeClass('hidden');
                $('.content-first-slovenija').addClass('hidden');

                break;

            case 1:

                $('.content-first-slovenija').removeClass('hidden');
                $('.content-slovenija-gini').addClass('hidden');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 2:

                destroyLeftPart();

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 3:

                destroyRightPart();

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 4:

                $('.content-slovenija-gini').removeClass('hidden');
                $('.content-slovenija-drugacenpogled').addClass('hidden');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            default:

                break;

        }
    });
}
