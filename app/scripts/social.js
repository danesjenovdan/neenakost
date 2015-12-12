

function setUpSocial() {

    $('.fbtoshare').on('click', function() {
        var url = 'https://www.facebook.com/dialog/share?app_id=809056859203594&display=popup&href=' + encodeURIComponent(document.location.href) + '&redirect_uri=' + encodeURIComponent(document.location.href) + '&ref=responsive';
        window.open(url, '_blank');
        return false;
    });

    $('.twtoshare').on('click', function() {
        var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title + ' ' + document.location.href);
        window.open(url, '_blank');
        return false;
    });

    $('.mailtoshare').on('click', function() {
        var url = 'mailto:?subject=.&body=' + document.location.href;
        window.open(url, '_blank');
        return false;
    });

}
