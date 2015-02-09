var clicks = 0;

$('#kitty').click(function(e) {
    clicks += 1;
    $('#clicks').text(clicks);
});