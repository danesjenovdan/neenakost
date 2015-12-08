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
}

$('.map').vectorMap({
    'map': 'world_mill',
    'backgroundColor': '#f0efef',
    'zoomOnScroll': false,
    'regionsSelectable': true,
    'regionsSelectableOne': true,
    'series': {
        'regions': [{
            'values': mapData,
            'scale': ['#e3c3bf', '#dd786b', '#704a45'],
            normalizeFunction: 'polynomial'
        }]
    },
    'selectedRegions': ['SY'],
    'regionStyle': {
        'selected': {
            'fill': '#1d7373'
        },
        'hover': {
            'cursor': 'default'
        }
    },
    'onRegionTipShow': function (e, label, code) {
        if (mapData.hasOwnProperty(code)) {
            label.html(mapNames[code] + ': ' + mapData[code] + '%');
        } else {
            e.preventDefault();
            return false;
        }
    },
    'onRegionOver': function (e, code) {
        if (mapData.hasOwnProperty(code)) {
            // the hovered region is part of the regionResults, show pointer
            $('#world path').css('cursor', 'pointer');
        } else {
            $('#world path').css('cursor', 'default');
        }
    },
    'onRegionClick': function (e, code) {
        if (mapData.hasOwnProperty(code)) {

            th = $('.barcontent').filter(function () {
                return $(this).data('code') == code;
            });
            $('.barcontent.open').animate({
                'height': 0
            }, 500).removeClass('open');
            if (!th.hasClass('open')) {
                curHeight = th.height(),
                    autoHeight = th.css('height', 'auto').height();
                th.height(curHeight).animate({
                    height: autoHeight
                }, 500);
            } else {
                th.animate({
                    'height': 0
                }, 500);
            }
            th.toggleClass('open');
        } else {
            return false;
        }
    }
});
var zemljevid = $('.map').vectorMap('get', 'mapObject');
zemljevid.setFocus({
    'regions': Object.keys(mapData)
});
