var cats = [0,0,0,0,0];

for (var i = 0; i < cats.length; i++){
    $('#cats').append('<p class="catlist" id="' + i + '">Cat Number ' + i + '</div>')
    $('#' + i).on('click', (function(im){

        return function() {
            $('img').attr("src", "img/cat" + im + '.jpg');
            cats[im] += 1;
            console.log(cats[im]);
        }
    })(i));
}

$('.cat').click(function(e) {
    clicks += 1;
    $('#clicks').text(clicks);
});