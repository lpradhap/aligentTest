
var BeerApp = BeerApp || {};

BeerApp.UI = (function () {

    const ui = {};

    ui.init = function () {
        //initiate all UI functions
        $('body').on('click', '.product-list li', function () {

            //set prodcut list height
            BeerApp.UI.productListHeight.setHeight()
        })
    }

    ui.productListHeight = {
        _panel: $('.product-list .scroll-panel'),
        setHeight: function () {
            //clear set height
            ui.productListHeight._panel.css('height','')
            
            let windowH = $(document).height();
            let headerH = $('.header-panel').innerHeight();

            //set new height
            ui.productListHeight._panel.height((windowH - headerH) - 5)
        }
    }

    ui.rangeSlider = function () {
        //check for slider
        if (!$('.range-slider').length) {
            return
        }

        $('.range-slider').each(function () {
            var maxRange = parseInt($(this).attr('data-max-range'))
            var minRange = parseInt($(this).attr('data-min-range'))

            $(this).slider({
                range: true,
                min: minRange,
                max: maxRange,
                values: [minRange, maxRange],
                slide: function (event, ui) {
                    $(this).closest('.range-control').find(".min-amt").val(ui.values[0]).change();
                    $(this).closest('.range-control').find(".max-amt").val(ui.values[1]).change();
                }
            });
        })



    }

    ui.loader = {
        _panel: $('.loading-panel'),
        show: function () {
            $(this._panel).show()
        },
        hide: function () {
            $(this._panel).hide()
        }
    }

    return ui

})()

$(document).ready(function () {
    BeerApp.UI.init();
})
