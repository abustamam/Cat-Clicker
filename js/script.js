$(function(){

    var model = {
        init: function(){
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify([
                    {cat: 0, clicks: 0},
                    {cat: 1, clicks: 0},
                    {cat: 2, clicks: 0},
                    {cat: 3, clicks: 0},
                    {cat: 4, clicks: 0},
                    {cat: 5, clicks: 0}
                    ]);
            }
        },

        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },

        getClicks: function(catNum){
            var data = JSON.parse(localStorage.cats);
            return data[catNum]['clicks'];
        },

        click: function(catNum) {
            var data = JSON.parse(localStorage.cats);
            data[catNum]['clicks'] += 1;
            localStorage.cats = JSON.stringify(data);
            return data[catNum]['clicks'];
        }
    };

    var octopus = {
        getCats: function() {
            return model.getAllCats();
        },

        init: function() {
            model.init();
            catListView.init();
            catImgView.init();
        },

        getClicks: function(catNum) {
            return model.getClicks(catNum);
        },

        click: function(catNum) {
            return model.click(catNum);
        }
    };

    var catListView = {
        init: function() {
            this.catList = $('#cats');
            catListView.render();
        },

        render: function(){
            var htmlStr = '';
            this.catId = 0;
            octopus.getCats().forEach(function(cat){
                htmlStr += '<li class="cat" id="cat' + cat.cat + '">Cat Number ' + 
                                cat.cat +
                            '</li>';
            });
            this.catList.html( htmlStr );
            $('.cat').each(function(catNum){
                $('#cat' + catNum).on('click', (function(im){
                    return function() {
                        this.catId = im;
                        catImgView.render(im);
                    }
                })(catNum));
            });
        }
    };

    var catImgView = {
        init: function() {
            this.catImg = $('#catpic');
        },

        render: function(num) {
            this.catImg.html( '<img id="pic' + num + '" src="img/cat' + num + '.jpg" />' );
            $('#pic' + num).on('click', function(){
                $('#clicks').text(octopus.click(num));
            });
            $('#clicks').text(octopus.getClicks(num));
        }
    };

    octopus.init();
});