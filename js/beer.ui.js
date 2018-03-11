var BeerApp = BeerApp || {};

BeerApp.UI = (function(){
    
    const ui = {};

    ui.init = function(){
        ui.rangeSlider();
    }
    
    ui.rangeSlider = function() {
        //check for slider
        if(!$('.range-slider').length) {
            return
        }

        $('.range-slider').each(function(){
            var maxRange = parseInt($(this).attr('data-max-range'))
            var minRange= parseInt($(this).attr('data-min-range'))

            $(this).slider({
                range: true,
                min: minRange,
                max: maxRange,
                values: [minRange, maxRange ],
                slide: function( event, ui ) {
                  $(this).closest('.range-control').find(".min-amt").val(ui.values[ 0 ]);
                  $(this).closest('.range-control').find(".max-amt").val(ui.values[ 1 ] );
                }
              });
        })
        


    }

    return ui
})()

$(document).ready(function(){
    BeerApp.UI.init()
})
