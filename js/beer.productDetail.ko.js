
var BeerApp = BeerApp || {};

BeerApp.ProductDetailKo = (function () {
    //loader show
    BeerApp.UI.loader.show();

    var dev = {}

    dev.default = {
        _Style: 108
    }



    dev.init = function () {
        
        function OrderProductDetailViewModel() {
            var self = this;

            //declare observables
            self.beerStyles = ko.observableArray([]);
            self.beer = ko.observableArray([]);
            self.currentProduct = ko.observable([]);

            self.filteredBeerStyles = ko.observableArray([]);

            self.abvMaxFilter = ko.observable();
            self.abvMinFilter = ko.observable('8');
            self.ibuMaxFilter = ko.observable();
            self.ibuMinFilter = ko.observable();

            self.currentFilter = ko.observable();

            //self.currentFilter(false);

            //Set Current Product
            self.setCurrent = function (current) {

                self.currentProduct(current)
            };

            self.beerFilter = ko.computed(function () {
                return self.beer();
            })


            self.changeStyle = function (setStyle) {

                //loader show
                BeerApp.UI.loader.show();

                //send selected new style id to getbeer information
                self.getBeer(setStyle.id);

                return true;
            }


            self.filteredItems = ko.computed(function () {
                if (!self.currentFilter()) {

                    return self.beerStyles();
                }
                else {
                    //No need to check this condition for returning checked values but it will check with whole array list
                    self.filteredBeerStyles.push(ko.utils.arrayFilter(self.beerStyles(), function (prod) {
                        return prod.id == self.currentFilter().id;
                    }));
                }
            });



            //get inital styles
            $.getJSON(BeerApp.Config.info.baseUrl + "styles/?" + "key=" + BeerApp.Config.info.key + "&format=json", function (response) {
                //bind observable
                self.beerStyles(response.data);

                //execute rangeSlider
                BeerApp.UI.rangeSlider();

            })

            // get beer 
            self.getBeer = function (val) {
                //if value passe, then its a click event of radio buttons if undefined then its a initiation function
                var styleId = val ? val : dev.default._Style;

                $.getJSON(BeerApp.Config.info.baseUrl + "beers?styleId=" + styleId + "&" + "key=" + BeerApp.Config.info.key + "&format=json", function (response) {

                    self.beer(response.data)

                    //hide loader
                    BeerApp.UI.loader.hide();
                })
            }

            //get initial beer information
            self.getBeer();
        }

        //binding knockout to page
        var el = document.getElementById('product-detail')
        var viewModel = new OrderProductDetailViewModel();
        ko.applyBindings(viewModel, el);
    }

    return dev;

})();