var slovenijafaza;

function animateLeftPart() {
    $.each($('.bar-histogram-lefty'), function(i, e) {

        var pxs = (parseFloat($(e).data('value')) - 21) * 315/5;
        console.log(pxs);

        $(e).prev().animate({
            'top': 315 - pxs
        });

        $(e).parent().addClass('bar-visible');
        $(e).animate({
            'height': pxs + 'px'
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

        var pxs = (parseFloat($(e).data('value')) - 21) * 315/5;

        $(e).prev().animate({
            'top': 315 - pxs
        });

        $(e).parent().addClass('bar-visible');
        $(e).animate({
            'height': pxs + 'px'
        });

        // $('.showwithrighty').removeClass('hidden');
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

        // $('.showwithrighty').addClass('hidden');
    });
}

function setUpSlovenija() {

    // menu update
    $('.menuitem.active').removeClass('active');
    $('.menuitem-zastava').addClass('active');

    slovenijafaza = 0;
    $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);
    destroyRightPart();
    destroyLeftPart();
}

function setUpSlovenijaButtons() {

    $('.theslovenijabutton').on('click', function() {
        slovenijafaza = $(this).data('slovenijafaza');

        switch (slovenijafaza) {
            case 0:

                $('.content-first-slovenija').addClass('hidden');
                $('.content-slovenija-gini').removeClass('hidden');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                window.history.pushState('object or string', 'home', '/slovenija/' + slovenijafaza);

                break;

            case 1:

                animateLeftPart();

                $('.slovenijaginitext').text('V času pred krizo je celo padal ...');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                window.history.pushState('object or string', 'home', '/slovenija/' + slovenijafaza);

                break;

            case 2:

                animateRightPart();

                $('.slovenijaginitext').text('... a se je po bančnem zlomu in gospodarski krizi, ki je izbruhnila leta 2009 pričela vnovično povečevati. Najhujši skok neenakosti v letu 2013 gre pripisati uveljavitvi Zakona o uravnoteženju javnih financ, ki je močno posegel v socialne pravice ljudi ter obstoječe socialne politike.')

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                window.history.pushState('object or string', 'home', '/slovenija/' + slovenijafaza);

                break;

            case 3:

                $('.content-slovenija-gini').addClass('hidden');
                $('.content-slovenija-drugacenpogled-davki').removeClass('hidden');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                window.history.pushState('object or string', 'home', '/slovenija/' + slovenijafaza);

                break;

            case 4:

                $('.content-slovenija-drugacenpogled-davki').addClass('hidden');
                $('.content-slovenija-drugacenpogled-pokrizi').removeClass('hidden');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                window.history.pushState('object or string', 'home', '/slovenija/' + slovenijafaza);

                break;

            case 5:

                $('.content-slovenija-drugacenpogled-pokrizi').addClass('hidden');
                $('.content-slovenija-drugacenpogled-nepremicnine').removeClass('hidden');

                slovenijafaza = slovenijafaza + 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                window.history.pushState('object or string', 'home', '/slovenija/' + slovenijafaza);

                break;

            case 6:

                $('.content-slovenija-drugacenpogled').addClass('hidden');
                $('.content-final').removeClass('hidden');

                setUpResitve();

                window.history.pushState('object or string', 'home', '/resitve/');

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

                $('.slovenijaginitext').text('Tolikšen je znašal GINIjev koeficient v Sloveniji leta 2009. Takrat smo, vsaj na papirju, bili precej enakovredna družba.');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 3:

                destroyRightPart();

                $('.slovenijaginitext').text('V času pred krizo je celo padal ...');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 4:

                $('.content-slovenija-gini').removeClass('hidden');
                $('.content-slovenija-drugacenpogled-davki').addClass('hidden');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 5:

                $('.content-slovenija-drugacenpogled-davki').removeClass('hidden');
                $('.content-slovenija-drugacenpogled-pokrizi').addClass('hidden');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            case 6:

                $('.content-slovenija-drugacenpogled-pokrizi').removeClass('hidden');
                $('.content-slovenija-drugacenpogled-nepremicnine').addClass('hidden');

                slovenijafaza = slovenijafaza - 1;

                $('.theslovenijabutton').data('slovenijafaza', slovenijafaza);

                break;

            default:

                break;

        }
    });
}
