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
            self.currentProduct = ko.observable(false);

            self.filteredBeerStyles = ko.observableArray([]);

            //range slider filters
            self.abvMaxFilter = ko.observable("23");
            self.abvMinFilter = ko.observable("0");
            self.ibuMaxFilter = ko.observable("100");
            self.ibuMinFilter = ko.observable("0");

            //Set Current Product
            self.setCurrent = function (current) {
                
                self.currentProduct(current)
                console.log(self.currentProduct())
            };

            self.beerFilter = ko.computed(function () {

                var filterProducts = [];
                ko.utils.arrayForEach(self.beer(), function (item) {

                    if (parseFloat(item.abv) > parseFloat(self.abvMinFilter()) &&
                        parseFloat(item.abv) < parseFloat(self.abvMaxFilter()) &&
                        parseFloat(item.ibu) > parseFloat(self.ibuMinFilter()) &&
                        parseFloat(item.ibu) < parseFloat(self.ibuMaxFilter())) {
                        filterProducts.push(item)
                    }
                });

                return filterProducts;
            })

            self.changeStyle = function (setStyle) {

                //loader show
                BeerApp.UI.loader.show();

                //send selected new style id to getbeer information
                self.getBeer(setStyle.id);

                return true;
            }

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