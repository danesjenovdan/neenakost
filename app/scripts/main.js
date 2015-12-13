// Chart.defaults.global = {
//     scaleFontColor: "#ffffff"
// }

// global
var ispopoveropen = false;

$(document).ready(function () {

    $('.logo').on('click', function() {
        $('.landing').removeClass('hidden')
        $('.landing').next().addClass('hidden')
        $('.landing').next().next().addClass('hidden');

        window.history.pushState('object or string', 'home', '/');
    });

    $('.thelandingbutton').on('click', function () {
        $('.landing').addClass('hidden')
        $('.landing').next().removeClass('hidden')
        $('.landing').next().next().removeClass('hidden');

        window.history.pushState('object or string', 'home', '/premozenje/');
    });

    // fix header
    $('.menuitem').width(($(window).width() - 76 - 4 * 55) / 4)

    setUpPremozenje();
    setUpPremozenjeButtons();
    setUpDohodekButtons();
    setUpSlovenijaButtons();
    setUpResitveButtons();
    setUpSocial();

    // menuitem setup
    $('.menuitem-prase').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-first-premozenje').removeClass('hidden');
            setUpPremozenje();
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');

            $('.popover-big').addClass('hidden');
            ispopoveropen = false;

            window.history.pushState('object or string', 'home', '/premozenje/');
        }
    });
    $('.menuitem-kesh').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-first-dohodkovna').removeClass('hidden');
            setUpDohodek();
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');

            $('.popover-big').addClass('hidden');
            ispopoveropen = false;

            window.history.pushState('object or string', 'home', '/dohodek/');
        }
    });
    $('.menuitem-zastava').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-first-slovenija').removeClass('hidden');
            setUpSlovenija();
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');

            $('.popover-big').addClass('hidden');
            ispopoveropen = false;

            window.history.pushState('object or string', 'home', '/slovenija/');
        }
    });
    $('.menuitem-resitve').on('click', function() {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-final').removeClass('hidden');
            setUpResitve();
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');

            window.history.pushState('object or string', 'home', '/resitve/');

        } else if (ispopoveropen) {
            // close popover
            $('.popover-big').addClass('hidden');
            ispopoveropen = false;
        }
    })

    window.onresize = function () {
        $('.menuitem').width(($(window).width() - 76 - 4 * 55) / 4);
    }
});

// eslint-disable-line no-console
