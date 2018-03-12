
var BeerApp = BeerApp || {};

BeerApp.ProductDetailKo = (function () {
    //loader show
    BeerApp.UI.loader.show();

    var dev = {}

    dev.default = {
        _Style: 1
    }

    dev.init = function () {

        function OrderProductDetailViewModel() {
            var self = this;

            //declare observables
            self.beerStyles = ko.observableArray([]);
            self.beer = ko.observableArray([]);

            self.productName = ko.observable()
            self.productDescription = ko.observable();

            self.currentProduct = ko.observable([""]);

            //Set Current Product
            self.setCurrent = function (current) {
                self.currentProduct(current)
            }

            self.changeStyle = function (el) {
                let elId = el.id;
                self.getBeer(elId)
            }

            //get inital styles
            $.getJSON(BeerApp.Config.info.baseUrl + "styles/?" + "key=" + BeerApp.Config.info.key + "&format=json", function (response) {
                //bind observable
                self.beerStyles(response.data);

                //execute rangeSlider
                BeerApp.UI.rangeSlider();

            })

            // get beer 
            self.getBeer = function (val, abv, ibu) {
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