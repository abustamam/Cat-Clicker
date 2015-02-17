$(function(){

    var model = {
        currentCatNum: 0,

        init: function(){
            var kitties = [
                        {name: 'Orange Kittens', url: 'img/cat0.jpg', clicks: 0},
                        {name: 'Gray Tabby', url: 'img/cat1.jpg', clicks: 0},
                        {name: 'Rocky', url: 'img/cat2.jpg', clicks: 0},
                        {name: 'Kitten Spoon', url: 'img/cat3.jpg', clicks: 0},
                        {name: 'White Kitten', url: 'img/cat4.jpg', clicks: 0},
                        {name: 'Orange Kitten', url: 'img/cat5.jpg', clicks: 0},
                        {name: 'Computer Kitten', url: 'img/cat6.jpg', clicks: 0}
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
        init: function() {
            model.init();
            var cats = JSON.parse(localStorage.kitties);
            model.currentCatNum = 0;

            catListView.init();
            catImgView.init();
            adminView.init();
        },

        getCats: function() {
            return model.getAllCats();
        },

        adminToggle: function() {
            $('#admin-panel').toggleClass('hidden');
        },

        adminSave: function(){
            var cats = octopus.getCats();
            var catNum = octopus.getCurrentCat();
            var currCat = cats[catNum];

            for (property in currCat){
                currCat[property] = $('#change-' + property).val();
                if (!isNaN(currCat[property])){
                    currCat[property] = parseInt(currCat[property]);
                }
            }

            cats[catNum] = currCat;
            localStorage.kitties = JSON.stringify(cats);
            catListView.render();
            catImgView.render();
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
            adminView.render();
        },

        reset: function() {
            var conf = confirm("Kittens may be sad. Proceed?");
            if (conf) {
                localStorage.clear();
                    model.init();
                catListView.render();
                catImgView.render();
                adminView.render();
            }
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
                htmlStr += '<li class="cat" id="cat' + catNum + '">' + 
                                cats[idx].name +
                            '</li>';
            });
            this.catList.html( htmlStr );
            $('.cat').each(function(catNo){
                catn = catNo + 1;
                $('#cat' + catn).on('click', (function(catCopy){
                    return function() {
                        octopus.setCurrentCat(catCopy);
                        catImgView.render();
                        adminView.render();
                    }
                })(catNo));
            });

            $('#reset').on('click', function(){
                octopus.reset();
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
            var currCat = cats[catNum];
            if (this.catpic.attr('src') !== currCat.url){
                this.catpic.attr('src', currCat.url);
            }
            $('#clicks').text(currCat.clicks);
        }
    };

    var adminView = {
        init: function(){
            this.render();
            $('#admin, #cancel').on('click', function(){
                octopus.adminToggle();
            });

            $('#save').on('click', function(){
                octopus.adminSave();
            });
        },

        render: function() {
            var cats = octopus.getCats();
            var catNum = octopus.getCurrentCat();
            var currCat = cats[catNum];
            var pre = "change-";

            for (property in currCat){
                $('#change-' + property).val(currCat[property]);
            }
        }
    }

    octopus.init();
});