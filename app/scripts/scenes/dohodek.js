// globals
var dohodkovnafaza;

function animateDohodkovnaSlider(thevalue, i) {

    $('.dohodkovnaslider').parent().addClass('noball');

    window.setTimeout(function () {

        $('.dohodkovnaslider').slider('setValue', thevalue);

        $('.bar-dohodkovna-left .bar-top .value').not('.bar-gini-left .bar-top .value').text(thevalue);
        $('.bar-dohodkovna-left .bar-histogram').not('.gdp-histogram').css('height', Math.round(315/150 * thevalue));

        $('.bar-dohodkovna-right .bar-top .value').not('.bar-gini-right .bar-top .value').text(1);
        $('.bar-dohodkovna-right .bar-histogram').not('.gini-histogram').css('height', 1); //Math.round(315.0 / (thevalue + 1.0)));

        animateBarTop();

    }, i * 15);
}

// dohodkovna linechart

var dohodkovnadatasets2 = {
    labels: ['1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'],
    datasets: [{
        label: "Produktivnost",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#71d079',
        pointColor: '#71d079',
        pointStrokeColor: '#71d079',
        pointHighlightFill: '#71d079',
        pointHighlightStroke: '#71d079',
        data: [30.614, 31.163, 33.287, 33.935, 34.886, 36.085, 36.938, 38.334, 38.452, 39.584, 40.649, 42.03, 42.764, 44.06, 45.583, 47.2, 48.667, 50.07, 51.53, 52.255, 53.811, 54.165, 55.237, 57.342, 58.767, 60.247, 59.697, 61.327, 62.799, 63.453, 63.981, 64.243, 64.246, 65.738, 65.437, 67.188, 68.557, 69.798, 71.379, 71.72, 72.503, 73.075, 74.318, 75.208, 77.697, 78.086, 78.8, 78.84, 80.78, 81.979, 83.747, 86.105, 88.489, 90.55, 93.408, 96.281, 98.514, 100, 100.815, 102.035, 102.802, 104.999, 108.225, 108.478]
    }, {
        label: "Kompenzacija",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#ca485a',
        pointColor: '#ca485a',
        pointStrokeColor: '#ca485a',
        pointHighlightFill: '#ca485a',
        pointHighlightStroke: '#ca485a',
        data: [11.37, 12.07, 12.53, 12.62, 12.99, 13.67, 13.95, 14.58, 15.19, 15.56, 15.68, 16.2, 16.56, 16.83, 17.37, 17.65, 18.05, 18.51, 18.79, 19.02, 19.48, 19.94, 20.17, 20.8, 21.87, 22.03, 21.62, 21.59, 22.09, 22.56, 22.91, 22.61, 22.08, 21.97, 21.99, 22, 21.88, 21.74, 21.77, 21.44, 21.3, 21.18, 20.98, 20.99, 21.02, 21.07, 21.13, 21, 20.99, 21.19, 21.67, 21.96, 22.08, 22.42, 22.99, 23.35, 23.17, 23.07, 23.08, 23.19, 23.33, 24.31, 24.46, 24.23]
    }]
};

var dohodkovnadatasets3 = {
    labels: ['1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'],
    datasets: [{
        label: "Produktivnost",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#71d079',
        pointColor: '#71d079',
        pointStrokeColor: '#71d079',
        pointHighlightFill: '#71d079',
        pointHighlightStroke: '#71d079',
        data: [30.614, 31.163, 33.287, 33.935, 34.886, 36.085, 36.938, 38.334, 38.452, 39.584, 40.649, 42.03, 42.764, 44.06, 45.583, 47.2, 48.667, 50.07, 51.53, 52.255, 53.811, 54.165, 55.237, 57.342, 58.767, 60.247, 59.697, 61.327, 62.799, 63.453, 63.981, 64.243, 64.246, 65.738, 65.437, 67.188, 68.557, 69.798, 71.379, 71.72, 72.503, 73.075, 74.318, 75.208, 77.697, 78.086, 78.8, 78.84, 80.78, 81.979, 83.747, 86.105, 88.489, 90.55, 93.408, 96.281, 98.514, 100, 100.815, 102.035, 102.802, 104.999, 108.225, 108.478]
    }, {
        label: "Kompenzacija",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#ca485a',
        pointColor: '#ca485a',
        pointStrokeColor: '#ca485a',
        pointHighlightFill: '#ca485a',
        pointHighlightStroke: '#ca485a',
        data: [11.37, 12.07, 12.53, 12.62, 12.99, 13.67, 13.95, 14.58, 15.19, 15.56, 15.68, 16.2, 16.56, 16.83, 17.37, 17.65, 18.05, 18.51, 18.79, 19.02, 19.48, 19.94, 20.17, 20.8, 21.87, 22.03, 21.62, 21.59, 22.09, 22.56, 22.91, 22.61, 22.08, 21.97, 21.99, 22, 21.88, 21.74, 21.77, 21.44, 21.3, 21.18, 20.98, 20.99, 21.02, 21.07, 21.13, 21, 20.99, 21.19, 21.67, 21.96, 22.08, 22.42, 22.99, 23.35, 23.17, 23.07, 23.08, 23.19, 23.33, 24.31, 24.46, 24.23]
    }, {
        label: "Povprečen prihodek 1 % (v desettisočih)",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#ffffff',
        pointColor: '#ffffff',
        pointStrokeColor: '#ffffff',
        pointHighlightFill: '#ffffff',
        pointHighlightStroke: '#ffffff',
        data: [27.885001, 26.745812, 29.96601, 28.585999, 27.366957, 26.602257, 27.174753, 28.393105, 29.564004, 29.355608, 27.986441, 29.381234, 28.384449, 28.651148, 29.469381, 29.808103, 30.696718, 32.131535, 34.81467, 35.903608, 36.757288, 35.800775, 35.038067, 34.863102, 36.159799, 36.853332, 37.511703, 35.018691, 35.337952, 35.73354, 36.648143, 36.979033, 36.634815, 35.649353, 36.518871, 37.0326, 39.586175, 41.231053, 41.942626, 50.75999, 65.270197, 62.329764, 63.707904, 58.00326, 64.797576, 60.723849, 61.94251, 67.081404, 71.579973, 77.894543, 84.557915, 91.216559, 96.295876, 87.648268, 82.216083, 82.305564, 90.774555, 100.387315, 104.425421, 108.978203, 100.834123, 88.459121, 93.095336, 92.505899]
    }]
};

var dohodkovnalinechart;

var dohodkovnalinechartdata = {
    labels: ['1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011'],
    datasets: [{
        label: "Produktivnost",
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: '#71d079',
        pointColor: '#71d079',
        pointStrokeColor: '#71d079',
        pointHighlightFill: '#71d079',
        pointHighlightStroke: '#71d079',
        data: [30.614, 31.163, 33.287, 33.935, 34.886, 36.085, 36.938, 38.334, 38.452, 39.584, 40.649, 42.03, 42.764, 44.06, 45.583, 47.2, 48.667, 50.07, 51.53, 52.255, 53.811, 54.165, 55.237, 57.342, 58.767, 60.247, 59.697, 61.327, 62.799, 63.453, 63.981, 64.243, 64.246, 65.738, 65.437, 67.188, 68.557, 69.798, 71.379, 71.72, 72.503, 73.075, 74.318, 75.208, 77.697, 78.086, 78.8, 78.84, 80.78, 81.979, 83.747, 86.105, 88.489, 90.55, 93.408, 96.281, 98.514, 100, 100.815, 102.035, 102.802, 104.999, 108.225, 108.478]
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
        'datasetStrokeWidth': 5,
        'showTooltips': false
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

    $.each($('.ginipoint'), function (i, e) {
        $(e).css({
            'left': $(e).data('position') + '%'
        });
    });

    $('.ginipoint').on('click', function () {

        $('.ginipoint.active').removeClass('active');
        $(this).addClass('active');

        $('.gdp-histogram').animate({
            'height': (parseFloat($(this).data('gdp')) - 9) * 315 / 7 + 'px'
        })
        $('.gini-histogram').animate({
            'height': parseFloat($(this).data('gini')) * 315 + 'px'
        })

        $('.gdp-histogram').prev().animate({
            'top': 315 - (parseFloat($(this).data('gdp')) - 9) * 315 / 7
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

        $('.bar-dohodkovna-left .bar-top .value').not('.bar-gini-left .bar-top .value').text(event.value);
        $('.bar-dohodkovna-left .bar-histogram').not('.gdp-histogram').css('height', Math.round(315/150 * event.value));

        $('.bar-dohodkovna-right .bar-top .value').not('.bar-gini-right .bar-top .value').text(1);
        $('.bar-dohodkovna-right .bar-histogram').not('.gini-histogram').css('height', 1); //Math.round(315.0 / (thevalue + 1.0)));

        animateBarTop();

    });

    animateDohodkovnaSlider(1, 1);
    $('.dohodkovnaslider').parent().removeClass('noball');
    $('.chartlabel-dohodek').text('Kakšno misliš, da je globalno plačno razmerje med dohodki povprečnega delavca in direktorja podjetja?');

    dohodkovnafaza = 0;
    $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);
}

function setUpDohodekButtons() {

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

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 1:

            var startvalue = $('.dohodkovnaslider').slider('getValue');
            var endvalue = 101.38; // control left histogram

            if (startvalue > endvalue) {
                for (var i = 0; i <= startvalue - endvalue; i++) {
                    animateDohodkovnaSlider(startvalue - i, i)
                }
            } else {
                for (var i = 0; i <= endvalue - startvalue; i++) {
                    animateDohodkovnaSlider(startvalue + i, i)
                }
            }

            $('.chartlabel-dohodek').text('Takšno pa je v resnici. Direktor običajno prejme kar 100x večjo plačo od povprečnega delavca.');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break; // TODO

        case 2:

            $('.content-dohodkovna-slider').addClass('hidden');
            $('.content-dohodkovna-primerjalno').removeClass('hidden');

            animateBarchart($('.chartcontainer-dohodkovna-primerjalno')[0]);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 3:

            $('.content-dohodkovna-primerjalno').addClass('hidden');
            $('.content-dohodkovna-linechart').removeClass('hidden');

            makeDohodkovnaLinechart(dohodkovnalinechartdata);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 4:

            dohodkovnalinechart.destroy();
            makeDohodkovnaLinechart(dohodkovnadatasets2);

            $('.dohodkovnalinecharttext').text('... a sočasno povprečne plače ne dohajajo porasta produktivnosti. Razlika med obema krivuljama predstavlja neposredni dobiček za kapitaliste ...');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 5:

            dohodkovnalinechart.destroy();
            makeDohodkovnaLinechart(dohodkovnadatasets3);

            $('.dohodkovnalinecharttext').text('... dobički pa se nato prelijejo v dohodke najbogatejših, torej lastnikov produkcijskih sredstev.');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 6:

            $('.content-dohodkovna-linechart').addClass('hidden');
            $('.content-gini-intro').removeClass('hidden');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 7:

            $('.content-gini-intro').addClass('hidden');
            $('.content-gini-primerjalno').removeClass('hidden');

            animateBarchart($('.chartcontainer-gini-primerjalno')[0]);

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 8:

            makeGiniSlider();

            $('.content-gini-primerjalno').addClass('hidden');
            $('.content-dohodkovna-gini-slider').removeClass('hidden');

            dohodkovnafaza = dohodkovnafaza + 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 9:

            setUpSlovenija();

            $('.content-dohodkovna-gini-slider').addClass('hidden');
            $('.content-first-slovenija').removeClass('hidden');

            window.history.pushState('object or string', 'home', '/slovenija/');

            break;

        default:

            break;

        }
    });

    $('.thedohodkovnabackbutton').on('click', function () {

        switch (dohodkovnafaza) {
        case 0:

            $('.content-premozenje-oaze').removeClass('hidden');
            $('.content-first-dohodkovna').addClass('hidden');

            window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

            break;

        case 1:

            $('.content-first-dohodkovna').removeClass('hidden');
            $('.content-dohodkovna-slider').addClass('hidden');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/');

            break;

        case 2:

            // $('.dohodkovnaslider').slider('destroy');
            animateDohodkovnaSlider(1, 1);
            $('.dohodkovnaslider').parent().removeClass('noball');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.chartlabel-dohodek').text('Kakšno misliš, da je globalno plačno razmerje med dohodki povprečnega delavca in direktorja podjetja?');

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 3:

            $('.content-dohodkovna-slider').removeClass('hidden');
            $('.content-dohodkovna-primerjalno').addClass('hidden');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 4:

            $('.content-dohodkovna-primerjalno').removeClass('hidden');
            $('.content-dohodkovna-linechart').addClass('hidden');

            animateBarchart($('.chartcontainer-dohodkovna-primerjalno')[0]);

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 5:

            dohodkovnalinechart.destroy();
            makeDohodkovnaLinechart(dohodkovnalinechartdata);

            $('.dohodkovnalinecharttext').text('Produktivnost delavnega razreda se, tudi ob pomoči uvajanja novih tehnologij in optimizacije delovnih procesov, vse bolj povečuje ...');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 6:

            dohodkovnalinechart.destroy();
            makeDohodkovnaLinechart(dohodkovnadatasets2);

            $('.dohodkovnalinecharttext').text('... a sočasno povprečne plače ne dohajajo porasta produktivnosti. Razlika med obema krivuljama predstavlja neposredni dobiček za kapitaliste ...');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 7:

            $('.content-dohodkovna-linechart').removeClass('hidden');
            $('.content-gini-intro').addClass('hidden');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 8:

            $('.content-gini-intro').removeClass('hidden');
            $('.content-gini-primerjalno').addClass('hidden');

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        case 9:

            $('.content-gini-primerjalno').removeClass('hidden');
            $('.content-dohodkovna-gini-slider').addClass('hidden');

            animateBarchart($('.chartcontainer-gini-primerjalno')[0]);

            dohodkovnafaza = dohodkovnafaza - 1;

            $('.thedohodkovnabutton').data('dohodkovnafaza', dohodkovnafaza);

            window.history.pushState('object or string', 'home', '/dohodek/' + dohodkovnafaza);

            break;

        default:

            break;
        }

    });
}
