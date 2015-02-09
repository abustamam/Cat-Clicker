var clicks = 0;

$('.cat').click(function(e) {
    clicks += 1;
    $('#clicks').text(clicks);
});