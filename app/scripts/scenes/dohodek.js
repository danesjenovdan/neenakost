// globals
var dohodkovnafaza;

function animateDohodkovnaSlider(thevalue, i) {

    $('.dohodkovnaslider').parent().addClass('noball');

    window.setTimeout(function () {

        $('.dohodkovnaslider').slider('setValue', thevalue);

        $('.bar-dohodkovna-left .bar-top .value').text(thevalue);
        $('.bar-dohodkovna-left .bar-histogram').css('height', Math.round((315.0 / (thevalue + 1.0)) * thevalue));

        $('.bar-dohodkovna-right .bar-top .value').text(1);
        $('.bar-dohodkovna-right .bar-histogram').css('height', Math.round(315.0 / (thevalue + 1.0)));

        animateBarTop();

    }, i * 15);
}

// dohodkovna linechart

var dohodkovnadatasets2 = {
    labels: ['1948', '1960', '1970', '1980', '1990', '2000', '2011'],
    datasets: [{
        label: "Produktivnost",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#71d079',
        pointColor: '#71d079',
        pointStrokeColor: '#71d079',
        pointHighlightFill: '#71d079',
        pointHighlightStroke: '#71d079',
        data: [60, 120, 150, 200, 280, 330, 375]
    }, {
        label: "Kompenzacija",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#ca485a',
        pointColor: '#ca485a',
        pointStrokeColor: '#ca485a',
        pointHighlightFill: '#ca485a',
        pointHighlightStroke: '#ca485a',
        data: [58, 100, 125, 170, 220, 240, 270]
    }]
};

var dohodkovnadatasets3 = {
    labels: ['1948', '1960', '1970', '1980', '1990', '2000', '2011'],
    datasets: [{
        label: "Produktivnost",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#71d079',
        pointColor: '#71d079',
        pointStrokeColor: '#71d079',
        pointHighlightFill: '#71d079',
        pointHighlightStroke: '#71d079',
        data: [60, 120, 150, 200, 280, 330, 375]
    }, {
        label: "Kompenzacija",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#ca485a',
        pointColor: '#ca485a',
        pointStrokeColor: '#ca485a',
        pointHighlightFill: '#ca485a',
        pointHighlightStroke: '#ca485a',
        data: [58, 100, 125, 170, 220, 240, 270]
    }, {
        label: "Povprečen prihodek 1 %",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#ffffff',
        pointColor: '#ffffff',
        pointStrokeColor: '#ffffff',
        pointHighlightFill: '#ffffff',
        pointHighlightStroke: '#ffffff',
        data: [60, 130, 120, 230, 320, 290, 400]
    }]
};

var dohodkovnalinechart;

var dohodkovnalinechartdata = {
    labels: ['1948', '1960', '1970', '1980', '1990', '2000', '2011'],
    datasets: [{
        label: "Produktivnost",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#71d079',
        pointColor: '#71d079',
        pointStrokeColor: '#71d079',
        pointHighlightFill: '#71d079',
        pointHighlightStroke: '#71d079',
        data: [60, 120, 150, 200, 280, 330, 375]
    }]
};

function makeDohodkovnaLinechart(data) {
    var ctx = document.getElementById('dohodkovnalinechart').getContext('2d');
    dohodkovnalinechart = new Chart(ctx).Line(data, {
        'responsive': true,
        'bezierCurve': false,
        'pointDot': false,
        'datasetFill': false,
        'scaleShowVerticalLines': false,
        'legendTemplate': "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><div><div style=\"background-color:<%=datasets[i].strokeColor%>\"></div><div class=\"words\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></div></div><%}%></div>",
        'scaleGridLineColor': "rgba(255, 255, 255, 0.6)",
        'scaleLineColor': "rgba(255, 255, 255, 0.6)",
        'scaleFontColor': '#ffffff',
        'datasetStrokeWidth': 5
    });

    $('#dohodkovnalegenda').html(dohodkovnalinechart.generateLegend());
}
// end of dohodkovna linechart

// animate barchart //
function animateBarchart(element) {

    $.each($(element).children('.barcontainer'), function (i, e) {
        $(e).children('.bar').children('.bar-histogram').animate({
            'height': $(e).children('.bar').children('.bar-histogram').data('value') + 'px'
        });
        $(e).children('.bar').children('.bar-top').animate({
            'top': 315 - $(e).children('.bar').children('.bar-histogram').data('value')
        });
    });

}
// end of animate barchart //

// set up special slider for gini //

function makeGiniSlider() {

    $.each($('.ginipoint'), function(i, e) {
        $(e).css({
            'left': $(e).data('position') + '%'
        });
    });

    $('.ginipoint').on('click', function() {

        $('.ginipoint.active').removeClass('active');
        $(this).addClass('active');

        $('.gdp-histogram').animate({
            'height': parseFloat($(this).data('gdp')) / 100 * 315 + 'px'
        })
        $('.gini-histogram').animate({
            'height': parseFloat($(this).data('gini')) * 315 + 'px'
        })

        $('.gdp-histogram').prev().animate({
            'top': 315 - parseFloat($(this).data('gdp')) / 100 * 315
        });
        $('.gini-histogram').prev().animate({
            'top': 315 - parseFloat($(this).data('gini')) * 315
        });

        $('.gdp-histogram').prev().children('span').text($(this).data('gdp'));
        $('.gini-histogram').prev().text($(this).data('gini'));
        $('.gdp-histogram').next().text($(this).data('country'));

    });
}

// end of gini special slider //

function setUpDohodek() {
    // menu update
    $('.menuitem.active').removeClass('active');
    $('.menuitem-kesh').addClass('active');

    // set up slider
    var dohodkovnaslider = $('.dohodkovnaslider').slider().on('slide', function (event) {

        $('.bar-dohodkovna-left .bar-top .value').text(event.value);
        $('.bar-dohodkovna-left .bar-histogram').css('height', Math.round((315.0 / (event.value + 1.0)) * event.value));

        $('.bar-dohodkovna-right .bar-top .value').text(1);
        $('.bar-dohodkovna-right .bar-histogram').css('height', Math.round(315.0 / (event.value + 1.0)));

        animateBarTop();

    });

    dohodkovnafaza = 0;

    // set up next button

    $('.thedohodkovnabutton').on('click', function () {

        dohodkovnafaza = $(this).data('dohodkovnafaza');
        console.log(dohodkovnafaza);

        switch (dohodkovnafaza) {
        case 0:

            $('.content-first-dohodkovna').addClass('hidden');
            $('.content-dohodkovna-slider').removeClass('hidden');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 1:

            var startvalue = $('.dohodkovnaslider').slider('getValue');
            var endvalue = 101.38; // control left histogram

            for (var i = 0; i <= startvalue - endvalue; i++) {
                animateDohodkovnaSlider(startvalue - i, i)
            }

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break; // TODO

        case 2:

            $('.content-dohodkovna-slider').addClass('hidden');
            $('.content-dohodkovna-primerjalno').removeClass('hidden');

            animateBarchart($('.chartcontainer-dohodkovna-primerjalno')[0]);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 3:

            $('.content-dohodkovna-primerjalno').addClass('hidden');
            $('.content-dohodkovna-linechart').removeClass('hidden');

            makeDohodkovnaLinechart(dohodkovnalinechartdata);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 4:

            dohodkovnalinechart.destroy();
            makeDohodkovnaLinechart(dohodkovnadatasets2);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 5:

            dohodkovnalinechart.destroy();
            makeDohodkovnaLinechart(dohodkovnadatasets3);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 6:

            $('.content-dohodkovna-linechart').addClass('hidden');
            $('.content-gini-intro').removeClass('hidden');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 7:

            $('.content-gini-intro').addClass('hidden');
            $('.content-gini-primerjalno').removeClass('hidden');

            animateBarchart($('.chartcontainer-gini-primerjalno')[0]);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 8:

            makeGiniSlider();

            $('.content-gini-primerjalno').addClass('hidden');
            $('.content-dohodkovna-gini-slider').removeClass('hidden');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            break;

        case 9:

            setUpSlovenija();

            $('.content-dohodkovna-gini-slider').addClass('hidden');
            $('.content-first-slovenija').removeClass('hidden');

            break;

        default:

            break;

        }
    });

    $('.thedohodkovnabackbutton').on('click', function() {

        switch (dohodkovnafaza) {
            case 0:

                $('.content-premozenje-oaze').removeClass('hidden');
                $('.content-first-dohodkovna').addClass('hidden');

                break;

            case 1:

                $('.content-first-dohodkovna').removeClass('hidden');
                $('.content-dohodkovna-slider').addClass('hidden');

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 2:

                $('.content-dohodkovna-slider').removeClass('hidden');
                $('.content-dohodkovna-primerjalno').addClass('hidden');

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 3:

                $('.content-dohodkovna-primerjalno').removeClass('hidden');
                $('.content-dohodkovna-linechart').addClass('hidden');

                animateBarchart($('.chartcontainer-dohodkovna-primerjalno')[0]);

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 4:

                dohodkovnalinechart.destroy();
                makeDohodkovnaLinechart(dohodkovnalinechartdata);

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 5:

                dohodkovnalinechart.destroy();
                makeDohodkovnaLinechart(dohodkovnadatasets2);

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 6:

                $('.content-dohodkovna-linechart').removeClass('hidden');
                $('.content-gini-intro').addClass('hidden');

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 7:

                $('.content-gini-intro').removeClass('hidden');
                $('.content-gini-primerjalno').addClass('hidden');

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            case 8:

                $('.content-gini-primerjalno').removeClass('hidden');
                $('.content-dohodkovna-gini-slider').addClass('hidden');

                animateBarchart($('.chartcontainer-gini-primerjalno')[0]);

                dohodkovnafaza = dohodkovnafaza - 1;

                $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

                break;

            default:

                break;
        }

    });
}
