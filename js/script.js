var cats = [0,0,0,0,0];

for (var i = 0; i < cats.length; i++){

    $('#cats').append('<p class="catlist" id="cat' + i + '">Cat Number ' + i + '</p>')
    $('#catpic').append('<img class="nocat" id="pic' + i + '" src = "img/cat' + i + '.jpg" />')

    // var img = document.createElement('img');

    // img.addEventListener('click', (function(im){
    //     return function() {
    //         console.log(im);
    //         cats[im] += 1;
    //         $('#clicks').text(cats[im]);
    //         console.log(im);
    //     }
    // })(i));

    $('#cat' + i).on('click', (function(im){
        return function() {
            $('.cat').toggleClass('nocat').toggleClass('cat');
            $('#pic' + im).toggleClass('nocat').toggleClass('cat');
            $('#clicks').text(cats[im]);
        }
    })(i));

    $('#pic' + i).on('click', (function(im){
        return function() {
            cats[im] += 1;
            $('#clicks').text(cats[im]);
        }
    })(i));
}