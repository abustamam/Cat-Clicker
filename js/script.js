$(function(){

    var model = {
        currentCatNum: 0,

        init: function(){
            var kitties = [
                        {url: 'img/cat0.jpg', clicks: 0},
                        {url: 'img/cat1.jpg', clicks: 0},
                        {url: 'img/cat2.jpg', clicks: 0},
                        {url: 'img/cat3.jpg', clicks: 0},
                        {url: 'img/cat4.jpg', clicks: 0},
                        {url: 'img/cat5.jpg', clicks: 0}
                    ];
            if (!localStorage.kitties) {
                localStorage.kitties = JSON.stringify(kitties);
            }
        },

        getAllCats: function() {
            return JSON.parse(localStorage.kitties);
        }
    };

    var octopus = {
        getCats: function() {
            return model.getAllCats();
        },

        init: function() {
            model.init();
            var cats = JSON.parse(localStorage.kitties);
            model.currentCatNum = 0;

            catListView.init();
            catImgView.init();
        },

        getCurrentCat: function() {
            return model.currentCatNum;
        },

        setCurrentCat: function(catNum) {
            model.currentCatNum = catNum;
        },

        click: function() {
            var cats = octopus.getCats();
            var currentCat = octopus.getCurrentCat();
            cats[currentCat].clicks += 1;
            localStorage.kitties = JSON.stringify(cats);
            catImgView.render();
        }
    };

    var catListView = {
        init: function() {
            this.catList = $('#cats');
            catListView.render();
        },

        render: function(){
            var catn = 0;
            var catNum = 0;
            var cats = octopus.getCats();
            var htmlStr = '';
            cats.forEach(function(cat, idx, arr){
                catNum = idx + 1
                htmlStr += '<li class="cat" id="cat' + catNum + '">Cat Number ' + 
                                catNum +
                            '</li>';
            });
            this.catList.html( htmlStr );
            $('.cat').each(function(catNo){
                catn = catNo + 1;
                $('#cat' + catn).on('click', (function(catCopy){
                    return function() {
                        octopus.setCurrentCat(catCopy);
                        catImgView.render();
                    }
                })(catNo));
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
            var cats = octopus.getCats();
            var catNum = octopus.getCurrentCat();
            this.catpic.attr('src', cats[catNum].url);
            $('#clicks').text(cats[catNum].clicks);
        }
    };

    octopus.init();
});