

function setUpResitve() {
    // menu update
    $('.menuitem.active').removeClass('active');
    $('.menuitem-resitve').addClass('active');
}


function setUpResitveButtons() {

    $('.spoznajvec').on('click', function() {
        var theclass = '.' + $(this).data('target');

        $(theclass).removeClass('hidden');

        ispopoveropen = true;

        return false;
    });

    $('.thesdzbutton').on('click', function() {
        $(this).parents('.popover-big').addClass('hidden');
        $('.popover-delavci').removeClass('hidden');
    });
    $('.theutdbutton').on('click', function() {
        $(this).parents('.popover-big').addClass('hidden');
        $('.popover-utd').removeClass('hidden');
    });
    $('.thebpdobutton').on('click', function() {
        $(this).parents('.popover-big').addClass('hidden');
        $('.popover-oaze').removeClass('hidden');
    });
    $('.theopbutton').on('click', function() {
        $(this).parents('.popover-big').addClass('hidden');
        $('.popover-obdavcitev').removeClass('hidden');
    });

}
