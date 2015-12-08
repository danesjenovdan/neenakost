// Chart.defaults.global = {
//     scaleFontColor: "#ffffff"
// }

$(document).ready(function () {

    // fix header
    $('.menuitem').width(($(window).width() - 76 - 4 * 55) / 4)

    setUpPremozenje();

    // menuitem setup
    $('.menuitem-prase').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-first-premozenje').removeClass('hidden');
            setUpPremozenje;
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.menuitem-kesh').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-first-dohodkovna').removeClass('hidden');
            setUpDohodek;
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.menuitem-zastava').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.content').addClass('hidden');
            $('.content-first-slovenija').removeClass('hidden');
            setUpSlovenija;
            $('.menuitem.active').removeClass('active');
            $(this).addClass('active');
        }
    });
});

// eslint-disable-line no-console
