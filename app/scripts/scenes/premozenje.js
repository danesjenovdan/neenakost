// globals
var thepremozenjelinechart;
var zemljevid;
var premozenjefaza;

function animateSlider(thevalue, i) {

    $('.premozenjeslider').parent().addClass('noball');

    window.setTimeout(function () {

        $('.premozenjeslider').slider('setValue', thevalue);

        $('.bar-premozenje-left .bar-top .value').text(thevalue);
        $('.bar-premozenje-left .bar-histogram').css('height', thevalue * 3.15);

        $('.bar-premozenje-right .bar-top .value').text(100 - thevalue);
        $('.bar-premozenje-right .bar-histogram').css('height', 315 - thevalue * 3.15);

        animateBarTop();

    }, i * 15);
}

// premozenje linechart
var linechartdata = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
        {
            label: "Spodnjih 99%",
            fillColor: 'rgba(255, 255, 255, 0)',
            strokeColor: '#ca485a',
            pointColor: '#ca485a',
            pointStrokeColor: '#ca485a',
            pointHighlightFill: '#ca485a',
            pointHighlightStroke: '#ca485a',
            data: [58, 56, 55, 53.5, 52, 50, 46, 40, 35, 30, 28]
        },
        {
            label: "Zgornjih 1%",
            fillColor: 'rgba(255, 255, 255, 0)',
            strokeColor: '#71d079',
            pointColor: '#71d079',
            pointStrokeColor: '#71d079',
            pointHighlightFill: '#71d079',
            pointHighlightStroke: '#71d079',
            data: [20, 25, 31, 35, 38, 42, 47, 51, 56, 60, 66]
        }
    ]
};

function makePremozenjeLinechart(data) {
    var ctx = document.getElementById('premozenjelinechart').getContext('2d');
    thepremozenjelinechart = new Chart(ctx).Line(data, {
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

    $('#premozenjelegenda').append(thepremozenjelinechart.generateLegend());
}
// end of premozenje linechart

// premozenje oaze

var mapData = {
    'BD': 1,
    'GM': 1,
    'SD': 2,
    'IQ': 3,
    'PK': 3,
    'SO': 3,
    'NG': 4,
    'ER': 8,
    'AF': 13,
    'SY': 50
}
var mapDataEmpty = {}

var mapNames = {
    'BD': 'Bangladeš',
    'GM': 'Gambija',
    'SD': 'Sudan',
    'IQ': 'Irak',
    'PK': 'Pakistan',
    'SO': 'Somalija',
    'NG': 'Nigerija',
    'ER': 'Eritreja',
    'AF': 'Afganistan',
    'SY': 'Sirija'
} // TODO naredi seznam iz tega za prevajanje
var mapNamesEmpty = {}


// end of pemozenje oaze

function animateBarTop() {
    $.each($('.bar-top'), function(i, e) {
        $(e).css({
            'top': 315 - $(e).next().height()
        });
    });
}

function setUpPremozenje() {

    animateBarTop();

    // $('.mapcontainer').width($('.mapcontainer').parent().width());

    premozenjefaza = 0;

    // set up slider
    var premozenjeslider = $('.premozenjeslider').slider().on('slide', function (event) {

        $('.bar-premozenje-left .bar-top .value').text(event.value);
        $('.bar-premozenje-left .bar-histogram').css('height', event.value * 3.15);

        $('.bar-premozenje-right .bar-top .value').text(100 - event.value);
        $('.bar-premozenje-right .bar-histogram').css('height', 315 - event.value * 3.15);

        animateBarTop();

    });

    // set up mapoverlay anchors
    // $('.mapoverlay').on('click', '.mapoverlaycountry', function() {
    //
    //     var regions = zemljevid.getSelectedRegions();
    //     regions.push($(this).data('country-code'))
    //
    //     zemljevid.setSelectedRegions(regions);
    //
    //     return false;
    // });

    // set up next button
    $('.thepremozenjebutton').on('click', function () {

        premozenjefaza = parseInt($(this).data('premozenjefaza'));

        switch (premozenjefaza) {
            case 0:

                $('.content-first-premozenje').addClass('hidden');
                $('.content-premozenje-slider').removeClass('hidden');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 1:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 51.9; // control left histogram

                // move slider-handle
                for (var i = 0; i <= startvalue - endvalue; i++) {
                    animateSlider(startvalue - i, i);
                }

                $('.chartlabel-premozenje').text('Takšno je pa resnično povprečje.');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 2:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 55.3; // control left histogram

                // move slider-handle
                for (var i = 0; i <= endvalue - startvalue; i++) {
                    animateSlider(startvalue + i, i);
                }

                $('.chartlabel-premozenje').text('Takole je svetovno povprečje izgledalo pred finančno krizo 2008.');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 3:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 54; // control left histogram

                // move slider-handle
                for (var i = 0; i <= startvalue - endvalue; i++) {
                    animateSlider(startvalue - i, i);
                }

                $('.chartlabel-premozenje').text('Takole bo pa izgledalo čez leto dni.');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 4:

                $('.content-premozenje-slider').addClass('hidden');
                $('.content-premozenje-linechart').removeClass('hidden');

                makePremozenjeLinechart(linechartdata);

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 5:

                $('.content-premozenje-linechart').addClass('hidden');
                $('.content-premozenje-oaze').removeClass('hidden');

                $('#premozenjeoaze').vectorMap({
                    'map': 'world_mill',
                    'backgroundColor': '#182648',
                    'zoomOnScroll': false,
                    'regionsSelectable': true,
                    'series': {
                        'regions': [{
                            'values': mapDataEmpty,
                            // 'fill' : '#71d079',
                            // 'scale': ['#71d079', '#71d079'],
                            // normalizeFunction: 'polynomial'
                        }]
                    },
                    // 'selectedRegions': ['SY'],
                    'regionStyle': {
                        'selected': {
                            'fill': '#ca485a'
                        },
                        'hover': {
                            'cursor': 'pointer',
                            'fill': '#ca485a'
                        }
                    },
                    'onRegionTipShow': function (e, label, code) {
                        // if (mapData.hasOwnProperty(code)) {
                        //     label.html(mapNames[code] + ': ' + mapData[code] + '%');
                        // } else {
                        //     e.preventDefault();
                        //     return false;
                        // }
                    },
                    'onRegionClick': function (e, code) {

                        var regions = zemljevid.getSelectedRegions();

                        if (!$('.mapoverlay').hasClass('visible')) {
                            $('.mapoverlay').addClass('visible');
                        }

                        if ($('.themapbutton').hasClass('hidden')) {
                            if (regions.length >= 2) {
                                $('.themapbutton').removeClass('hidden');
                            }
                        }

                        if (regions.indexOf(code) === -1) {

                            $('.mapoverlaycountry-missed').filter(function() {
                                return $(this).data('country-code') == code;
                            }).removeClass('mapoverlaycountry-missed');

                        }
                    }
                });
                // zemljevid.setFocus({
                //     'regions': Object.keys(mapData)
                // });

                zemljevid = $('#premozenjeoaze').vectorMap('get', 'mapObject');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 6:

                var regions = zemljevid.getSelectedRegions()

                $.each($('.mapoverlaycountry-missed'), function(i, e) {
                    console.log(e);
                    $(e).removeClass('mapoverlaycountry-missed');
                    var regions = zemljevid.getSelectedRegions()
                    regions.push($(e).data('country-code'));

                    zemljevid.setSelectedRegions(regions);
                });


                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 7:

                $('.mapcontainer-popover').addClass('visible');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 8:

                setUpDohodek();

                $('.content-premozenje-oaze').addClass('hidden');
                $('.content-first-dohodkovna').removeClass('hidden');

                break;

            default:

                break;
        }
    });

    // set up back button
    $('.thepremozenjebackbutton').on('click', function () {

        switch (premozenjefaza) {
            case 1:

                $('.content-premozenje-slider').addClass('hidden');
                $('.content-first-premozenje').removeClass('hidden');

                $('.premozenjeslider').slider('setValue', 50);
                $('.chartlabel-premozenje').text('Kako misliš, da je razporejeno svetovno premoženje med najbogatejšimi (1%) in ostalim prebivalstvom (99%)?');

                premozenjefaza = premozenjefaza - 1;
                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 2:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 50;

                // move slider-handle
                animateSlider(50, 1);
                // for (var i = 0; i <= startvalue - endvalue; i++) {
                //     animateSlider(startvalue - i, i);
                // }

                $('.chartlabel-premozenje').text('Kako misliš, da je razporejeno svetovno premoženje med najbogatejšimi (1%) in ostalim prebivalstvom (99%)?');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 3:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 20;

                // move slider-handle
                // for (var i = 0; i <= endvalue - startvalue; i++) {
                //     animateSlider(startvalue + i, i);
                // }

                animateSlider(20, 1);

                $('.chartlabel-premozenje').text('Takšno je pa resnično povprečje.');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 4:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 60;

                // move slider-handle
                // for (var i = 0; i <= endvalue - startvalue; i++) {
                //     animateSlider(startvalue + i, i);
                // }

                animateSlider(60, 1);

                $('.chartlabel-premozenje').text('Takole je svetovno povprečje izgledalo pred finančno krizo 2008.');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 5:

                $('.content-premozenje-slider').removeClass('hidden');
                $('.content-premozenje-linechart').addClass('hidden');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 6:

                $('.content-premozenje-linechart').removeClass('hidden');
                $('.content-premozenje-oaze').addClass('hidden');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 7:

                zemljevid.remove();
                $('.mapoverlaycountry').addClass('mapoverlaycountry-missed');

                $('#premozenjeoaze').vectorMap({
                    'map': 'world_mill',
                    'backgroundColor': '#182648',
                    'zoomOnScroll': false,
                    'regionsSelectable': true,
                    'series': {
                        'regions': [{
                            'values': mapDataEmpty,
                            // 'fill' : '#71d079',
                            // 'scale': ['#71d079', '#71d079'],
                            // normalizeFunction: 'polynomial'
                        }]
                    },
                    // 'selectedRegions': ['SY'],
                    'regionStyle': {
                        'selected': {
                            'fill': '#ca485a'
                        },
                        'hover': {
                            'cursor': 'pointer',
                            'fill': '#ca485a'
                        }
                    },
                    'onRegionTipShow': function (e, label, code) {
                        // if (mapData.hasOwnProperty(code)) {
                        //     label.html(mapNames[code] + ': ' + mapData[code] + '%');
                        // } else {
                        //     e.preventDefault();
                        //     return false;
                        // }
                    },
                    'onRegionClick': function (e, code) {
                        var regions = zemljevid.getSelectedRegions();

                        if (regions.indexOf(code) === -1) {

                            $('.mapoverlaycountry-missed').filter(function() {
                                return $(this).data('country-code') == code;
                            }).removeClass('mapoverlaycountry-missed');

                        }
                    }
                });
                // zemljevid.setFocus({
                //     'regions': Object.keys(mapData)
                // });

                zemljevid = $('#premozenjeoaze').vectorMap('get', 'mapObject');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            case 8:

                $('.mapcontainer-popover').removeClass('visible');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                break;

            default:

                break;
        }

    });

}

// Kako misliš, da je razporejeno premoženje?
// Takšno je resnično
// Takole je izgledalo pred krizo
// Tako bo izgledalo naslednje leto
