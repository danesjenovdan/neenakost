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
    labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
        {
            label: "Spodnjih 99%",
            fillColor: 'rgba(255, 255, 255, 0)',
            strokeColor: '#ca485a',
            pointColor: '#ca485a',
            pointStrokeColor: '#ca485a',
            pointHighlightFill: '#ca485a',
            pointHighlightStroke: '#ca485a',
            data: [51.3, 51.6, 53.1, 53.7, 53.7, 53.1, 53.9, 55.3, 55.8, 56, 55.6, 55, 54, 52.3, 51.74, 50.73, 49.72, 48.71, 47.7, 46.69, 45.68]
        },
        {
            label: "Zgornjih 1%",
            fillColor: 'rgba(255, 255, 255, 0)',
            strokeColor: '#71d079',
            pointColor: '#71d079',
            pointStrokeColor: '#71d079',
            pointHighlightFill: '#71d079',
            pointHighlightStroke: '#71d079',
            data: [48.7, 48.4, 46.9, 46.3, 46.3, 46.9, 46.1, 44.7, 44.2, 44, 44.4, 45, 46, 47.7, 48.26, 49.27, 50.28, 51.29, 52.3, 53.31, 54.32]
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
    'BE': 'Belgija',
    'BF': 'Burkina Faso',
    'BG': 'Bolgarija',
    'BA': 'Bosna in Hercegovina',
    'BN': 'Brunej',
    'BO': 'Bolivija',
    'JP': 'Japonska',
    'BI': 'Burundi',
	'BT': 'Butan',
	'JM': 'Jamajka',
	'BW': 'Bocvana',
	'BR': 'Brazilija',
	'BS': 'Bahami',
	'BY': 'Belorusija',
	'BZ': 'Belize',
	'RU': 'Rusija',
	'RW': 'Ruanda',
	'RS': 'Srbija',
	'TL': 'Timor-Leste',
	'TM': 'Turkmenistan',
	'TJ': 'Tadžikistan',
	'RO': 'Romunija',
	'GW': 'Gvineja Bissau',
	'GT': 'Gvatemala',
	'GR': 'Grčija',
	'GQ': 'Ekvatorialna Gvineja',
	'GY': 'Gvajana',
	'GE': 'Gruzija',
	'GB': 'Velika Britanija',
	'GA': 'Gabon',
	'GN': 'Gvineja',
	'GM': 'Gambija',
	'GL': 'Grenlandija',
	'GH': 'Gana',
	'OM': 'Oman',
	'TN': 'Tunizija',
	'JO': 'Jordan',
	'HR': 'Hrvaška',
	'HT': 'Haiti',
	'HU': 'Madžarska',
	'HN': 'Honduras',
	'PR': 'Portoriko',
	'PS': 'Palestina',
	'PT': 'Portugalska',
	'PY': 'Paragvaj',
	'PA': 'Panama',
	'PG': 'Papua Nova Gvineja',
	'PE': 'Peru',
	'PK': 'Pakistan',
	'PH': 'Filipini',
	'PL': 'Poljska',
	'ZM': 'Zambija',
	'EH': 'Zahodna Sahara',
	'EE': 'Estonija',
	'EG': 'Egipt',
	'ZA': 'Republika Južna Afrika',
	'EC': 'Ekvador',
	'IT': 'Italija',
	'VN': 'Vietnam',
	'SB': 'Salomonovi otoki',
	'ET': 'Etiopija',
	'SO': 'Somalija',
	'ZW': 'Zimbabve',
	'ES': 'Španija',
	'ER': 'Eritreja',
	'ME': 'Črna gora',
	'MD': 'Moldavija',
	'MG': 'Madagaskar',
	'MA': 'Maroko',
	'UZ': 'Uzbekistan',
	'MM': 'Mjanmar',
	'ML': 'Mali',
	'MN': 'Mongolija',
	'MK': 'Makedonija',
	'MW': 'Malavi',
	'MR': 'Mavretanija',
	'UG': 'Uganda',
	'MY': 'Malezija',
	'MX': 'Mehika',
	'IL': 'Izrael',
	'FR': 'Francija',
	'XS': 'Somalilandija',
	'FI': 'Finska',
	'FJ': 'Fidži',
	'FK': 'Falklandski otoki',
	'NI': 'Nikaragva',
	'NL': 'Nizozemska',
	'NO': 'Norveška',
	'NA': 'Namibija',
	'VU': 'Vanuatu',
	'NC': 'Nova Kaledonija',
	'NE': 'Niger',
	'NG': 'Nigerija',
	'NZ': 'Nova Zelandija',
	'NP': 'Nepal',
	'XK': 'Kosovo',
	'CI': 'Slonokoščena obala',
	'CH': 'Švica',
	'CO': 'Kolumbija',
	'CN': 'Kitajska',
	'CM': 'Kamerun',
	'CL': 'Čile',
	'XC': 'Severni Ciper',
	'CA': 'Kanada',
	'CG': 'Kongo',
	'CF': 'Srednjeafriška Republika',
	'CD': 'Demokratična Republika Kongo',
	'CZ': 'Češka',
	'CY': 'Ciper',
	'CR': 'Kostarika',
	'CU': 'Kuba',
	'SZ': 'Kraljevina Svazi',
	'SY': 'Sirija',
	'KG': 'Kirgizistan',
	'KE': 'Kenija',
	'SS': 'Južni Sudan',
	'SR': 'Surinam',
	'KH': 'Kambodža',
	'SV': 'Republika Salvador',
	'SK': 'Slovaška',
	'KR': 'Koreja',
	'SI': 'Slovenija',
	'KP': 'Severna Koreja',
	'KW': 'Kuvajt',
	'SN': 'Senegal',
	'SL': 'Sierra Leone',
	'KZ': 'Kazahstan',
	'SA': 'Saudova Arabija',
	'SE': 'Švedska',
	'SD': 'Sudan',
	'DO': 'Dominikanska republika',
	'DJ': 'Džibuti',
	'DK': 'Danska',
	'DE': 'Nemčija',
	'YE': 'Jemen',
	'DZ': 'Alžirija',
	'US': 'Združene Države Amerike',
	'UY': 'Urugvaj',
	'LB': 'Libanon',
	'LA': 'Laos',
	'TW': 'Tajvan',
	'TT': 'Trinidad in Tobago',
	'TR': 'Turčija',
	'LK': 'Šrilanka',
	'LV': 'Latvija',
	'LT': 'Litva',
	'LU': 'Luksemburg',
	'LR': 'Liberija',
	'LS': 'Lesoto',
	'TH': 'Tajska',
	'TF': 'Francoske južne in antarktične dežele',
	'TG': 'Togo',
	'TD': 'Čad',
	'LY': 'Libija',
	'AE': 'Združeni arabski emirati',
	'VE': 'Venezuela',
	'AF': 'Afganistan',
	'IQ': 'Irak',
	'IS': 'Islandija',
	'IR': 'Iran',
	'AM': 'Armenija',
	'AL': 'Albanija',
	'AO': 'Angola',
	'AR': 'Argentina',
	'AU': 'Avstralija',
	'AT': 'Avstrija',
	'IN': 'Indija',
	'TZ': 'Tanzanija',
	'AZ': 'Azerbajdžan',
	'IE': 'Irska',
	'ID': 'Indonezija',
	'UA': 'Ukrajina',
	'QA': 'Katar',
	'MZ': 'Mozambik'
}
var truecountries = ['AO', 'BS', 'BZ', 'BN', 'US', 'DO', 'MY', 'LU', 'CN', 'PT', 'NL', 'CH', 'VU'];
var othertruecountries = ['Andora', 'Angvila', 'Antigva in Barbuda', 'Aruba', 'Bahrajn', 'Bahami', 'Barbados', 'Belize', 'Bermudi', 'Britanski Deviški otoki', 'Brunej', 'Kajmanski otoki', 'Ciper', 'Cookovo otočje', 'Dominikanska republika', 'Gibraltar', 'Grenada', 'Guernsey', 'Hong Kong', 'Isle of Man', 'Jersey', 'Malezija', 'Lihtenštajn', 'Luxemburg', 'Macao', 'Madeira', 'Maldivi', 'Malta', 'Marshallovi otoki', 'Monako', 'Montserrat', 'Nizozemski Antili', 'Samoa', 'San Marino', 'Sejšeli', 'Singapur', 'St. Kitts & Nevis', 'Sveta Lucia', 'Sveti Vincent in Grenadini', 'Otoki Turks in Caicos', 'Vanuatu', 'Deviški otoki'];

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

    $('.content-first-premozenje').removeClass('hidden');
    $('.content-premozenje-slider').addClass('hidden');
    $('.content-premozenje-linechart').addClass('hidden');
    $('.content-premozenje-oaze').addClass('hidden');

    animateBarTop();

    // $('.mapcontainer').width($('.mapcontainer').parent().width());

    premozenjefaza = 0;
    $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);
    $('.premozenjeslider').parent().removeClass('noball');
    $('.chartlabel-premozenje').text('Kako misliš, da je razporejeno svetovno premoženje med najbogatejšimi (1%) in ostalim prebivalstvom (99%)?');

    // set up slider
    var premozenjeslider = $('.premozenjeslider').slider().on('slide', function (event) {

        $('.bar-premozenje-left .bar-top .value').text(event.value);
        $('.bar-premozenje-left .bar-histogram').css('height', event.value * 3.15);

        $('.bar-premozenje-right .bar-top .value').text(100 - event.value);
        $('.bar-premozenje-right .bar-histogram').css('height', 315 - event.value * 3.15);

        animateBarTop();

    });

}

function setUpPremozenjeButtons() {
    // set up next button
    $('.thepremozenjebutton').on('click', function () {

        premozenjefaza = parseInt($(this).data('premozenjefaza'));

        switch (premozenjefaza) {
            case 0:

                $('.content-first-premozenje').addClass('hidden');
                $('.content-premozenje-slider').removeClass('hidden');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 1:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 51; // control left histogram

                // move slider-handle

                if (startvalue > endvalue) {
                    for (var i = 0; i <= startvalue - endvalue; i++) {
                        animateSlider(startvalue - i, i);
                    }
                } else {
                    for (var i = 0; i <= endvalue - startvalue; i++) {
                        animateSlider(startvalue + i, i);
                    }
                }

                $('.chartlabel-premozenje').text('Takšno je pa razmerje v resnici.');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 2:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 56; // control left histogram

                // move slider-handle
                for (var i = 0; i <= endvalue - startvalue; i++) {
                    animateSlider(startvalue + i, i);
                }

                $('.chartlabel-premozenje').text('Takole je izgledalo pred finančno krizo (2008).');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 3:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 50; // control left histogram

                // move slider-handle
                for (var i = 0; i <= startvalue - endvalue; i++) {
                    animateSlider(startvalue - i, i);
                }

                $('.chartlabel-premozenje').text('Takšno pa bo naslednje leto (2016). 1% najbogatejših si bo lastilo 50% vsega svetovnega premoženja.');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 4:

                $('.content-premozenje-slider').addClass('hidden');
                $('.content-premozenje-linechart').removeClass('hidden');

                makePremozenjeLinechart(linechartdata);

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

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
                        label.html(mapNames[code]);
                        // if (mapData.hasOwnProperty(code)) {
                        //     label.html(mapNames[code] + ': ' + mapData[code] + '%');
                        // } else {
                        //     e.preventDefault();
                        //     return false;
                        // }
                    },
                    'onRegionClick': function (e, code) {

                        // get selected regions
                        var regions = zemljevid.getSelectedRegions();

                        // make map overlay visible if not already
                        if (!$('.mapoverlay').hasClass('visible')) {
                            $('.mapoverlay').addClass('visible');
                        }

                        // make map button visible if 3 regions were selected
                        if ($('.themapbutton').hasClass('hidden')) {
                            if (regions.length >= 2) {
                                $('.themapbutton').removeClass('hidden');
                            }
                        }

                        // check if region already selected
                        if (regions.indexOf(code) === -1) {
                            if (truecountries.indexOf(code) === -1) {
                                $('.mapoverlay').append('<span class="mapoverlaycountry mapoverlaycountry-missed" data-country-code="' + code + '">' + mapNames[code] + '</span>');
                            } else {
                                $('.mapoverlay').append('<span class="mapoverlaycountry" data-country-code="' + code + '">' + mapNames[code] + '</span>');
                            }

                            // $('.mapoverlaycountry-missed').filter(function() {
                            //     return $(this).data('country-code') == code;
                            // }).removeClass('mapoverlaycountry-missed');
                        } else {
                            var thing = $('.mapoverlay').children().filter(function() {
                                return $(this).data('country-code') == code;
                            });
                            thing.remove()
                            regions.splice(truecountries.indexOf(code), 1);
                        }
                    }
                });

                zemljevid = $('#premozenjeoaze').vectorMap('get', 'mapObject');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 6:

                var regions = zemljevid.getSelectedRegions()
                console.log(regions);

                $('h2.hideafterpopup').text('Po svetu jih je več kot 40.')

                $.each(regions, function(i, code) {
                    if (truecountries.indexOf(code) === -1) {
                        regions.splice(truecountries.indexOf(code), 1);
                        zemljevid.setSelectedRegions(regions);
                    }
                });

                zemljevid.clearSelectedRegions();

                $.each(truecountries, function(i, code) {
                    if (regions.indexOf(code) === -1) {
                        $('.mapoverlay').append('<span class="mapoverlaycountry" data-country-code="' + code + '">' + mapNames[code] + '</span>');
                        regions.push(code);
                        zemljevid.setSelectedRegions(regions);
                    }
                });
                $.each(othertruecountries, function(i, country) {
                    $('.mapoverlay').append('<span class="mapoverlaycountry" data-country-code="00">' + country + '</span>');
                });

                $('.mapoverlay').addClass('solved');

                // $.each($('.mapoverlaycountry-missed'), function(i, e) {
                //     console.log(e);
                //     $(e).removeClass('mapoverlaycountry-missed');
                //     var regions = zemljevid.getSelectedRegions()
                //     regions.push($(e).data('country-code'));
                //
                //     zemljevid.setSelectedRegions(regions);
                // });


                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 7:

                $('.mapcontainer-popover').addClass('visible');
                $('.hideafterpopup').addClass('hidden');

                premozenjefaza = premozenjefaza + 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 8:

                setUpDohodek();

                $('.content-premozenje-oaze').addClass('hidden');
                $('.content-first-dohodkovna').removeClass('hidden');

                window.history.pushState('object or string', 'home', '/dohodek/');

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

                $('.premozenjeslider').slider('setValue', 99);
                $('.chartlabel-premozenje').text('Kako misliš, da je razporejeno svetovno premoženje med najbogatejšimi (1%) in ostalim prebivalstvom (99%)?');

                premozenjefaza = premozenjefaza - 1;
                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/');

                break;

            case 2:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 99;

                // move slider-handle
                animateSlider(endvalue, 1);
                $('.premozenjeslider').parent().removeClass('noball');
                // for (var i = 0; i <= startvalue - endvalue; i++) {
                //     animateSlider(startvalue - i, i);
                // }

                $('.chartlabel-premozenje').text('Kako misliš, da je razporejeno svetovno premoženje med najbogatejšimi (1%) in ostalim prebivalstvom (99%)?');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 3:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 51;

                // move slider-handle
                // for (var i = 0; i <= endvalue - startvalue; i++) {
                //     animateSlider(startvalue + i, i);
                // }

                animateSlider(endvalue, 1);

                $('.chartlabel-premozenje').text('Takšno je pa razmerje v resnici.');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 4:

                var startvalue = $('.premozenjeslider').slider('getValue');
                var endvalue = 56;

                // move slider-handle
                // for (var i = 0; i <= endvalue - startvalue; i++) {
                //     animateSlider(startvalue + i, i);
                // }

                animateSlider(endvalue, 1);

                $('.chartlabel-premozenje').text('Takole je izgledalo pred finančno krizo (2008).');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 5:

                $('.content-premozenje-slider').removeClass('hidden');
                $('.content-premozenje-linechart').addClass('hidden');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 6:

                $('.content-premozenje-linechart').removeClass('hidden');
                $('.content-premozenje-oaze').addClass('hidden');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                break;

            case 7:

                zemljevid.remove();
                $('.mapoverlay').removeClass('solved');
                $('.mapoverlay').children('span').remove();

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
                        label.html(mapNames[code]);
                        // if (mapData.hasOwnProperty(code)) {
                        //     label.html(mapNames[code] + ': ' + mapData[code] + '%');
                        // } else {
                        //     e.preventDefault();
                        //     return false;
                        // }
                    },
                    'onRegionClick': function (e, code) {

                        // get selected regions
                        var regions = zemljevid.getSelectedRegions();

                        // make map overlay visible if not already
                        if (!$('.mapoverlay').hasClass('visible')) {
                            $('.mapoverlay').addClass('visible');
                        }

                        // make map button visible if 3 regions were selected
                        if ($('.themapbutton').hasClass('hidden')) {
                            if (regions.length >= 2) {
                                $('.themapbutton').removeClass('hidden');
                            }
                        }

                        // check if region already selected
                        if (regions.indexOf(code) === -1) {
                            if (truecountries.indexOf(code) === -1) {
                                $('.mapoverlay').append('<span class="mapoverlaycountry mapoverlaycountry-missed" data-country-code="' + code + '">' + mapNames[code] + '</span>');
                            } else {
                                $('.mapoverlay').append('<span class="mapoverlaycountry" data-country-code="' + code + '">' + mapNames[code] + '</span>');
                            }

                            // $('.mapoverlaycountry-missed').filter(function() {
                            //     return $(this).data('country-code') == code;
                            // }).removeClass('mapoverlaycountry-missed');
                        } else {
                            var thing = $('.mapoverlay').children().filter(function() {
                                return $(this).data('country-code') == code;
                            });
                            thing.remove()
                            regions.splice(truecountries.indexOf(code), 1);
                        }
                    }
                });

                zemljevid = $('#premozenjeoaze').vectorMap('get', 'mapObject');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

                $('h2.hideafterpopup').text('Na zemljevidu označi vsaj 3 države, ki delujejo kot davčne oaze.')

                break;

            case 8:

                $('.hideafterpopup').removeClass('hidden');

                $('.mapcontainer-popover').removeClass('visible');

                premozenjefaza = premozenjefaza - 1;

                $('.thepremozenjebutton').data('premozenjefaza', premozenjefaza);

                window.history.pushState('object or string', 'home', '/premozenje/' + premozenjefaza);

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
