$(function(){

    var model = {
        currentCat: null,

        init: function(){
            var kitties = [
                        {cat: 0, clicks: 0},
                        {cat: 1, clicks: 0},
                        {cat: 2, clicks: 0},
                        {cat: 3, clicks: 0},
                        {cat: 4, clicks: 0},
                        {cat: 5, clicks: 0}
                    ];
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify(kitties);
            }
        },

        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        }
    };

    var octopus = {
        getCats: function() {
            return model.getAllCats();
        },

        init: function() {
            model.init();
            var cats = JSON.parse(localStorage.cats);
            model.currentCat = cats[0];

            catListView.init();
            catImgView.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        click: function() {
            var cats = model.getAllCats();
            model.currentCat.clicks += 1;
            cats[model.currentCat.cat] = model.currentCat;
            localStorage.cats = JSON.stringify(cats);
            catImgView.render();
        }
    };

    var catListView = {
        init: function() {
            this.catList = $('#cats');
            catListView.render();
        },

        render: function(){
            var cat;
            var cats = octopus.getCats();
            var htmlStr = '';
            cats.forEach(function(cat){
                htmlStr += '<li class="cat" id="cat' + cat.cat + '">Cat Number ' + 
                                cat.cat +
                            '</li>';
            });
            this.catList.html( htmlStr );
            $('.cat').each(function(catNum){
                cat = cats[catNum];
                $('#cat' + catNum).on('click', (function(catCopy){
                    return function() {
                        octopus.setCurrentCat(catCopy);
                        catImgView.render();
                    }
                })(cat));
            });

            $('#reset').on('click', function(){
                var conf = confirm("Kittens may be sad. Proceed?");
                if (conf) {
                    localStorage.clear();
                    model.init();
                    $('#clicks').text(0);
                }
            });

        }
    };

    var catImgView = {
        init: function() {
            this.catarea = $('#catarea');
            this.catpic = $('#catpic');
            this.catpic.on('click', function(){
                octopus.click();
            });

            this.render();
        },

        render: function() {
            var cat = octopus.getCurrentCat();
            this.catpic.attr('src', 'img/cat' + cat.cat + '.jpg');
            $('#clicks').text(cat.clicks);
        }
    };

    octopus.init();
});