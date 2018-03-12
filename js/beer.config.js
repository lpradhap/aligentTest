var BeerApp = BeerApp || {};
 
// beer app confirguration information
// this information can be reterived anywhere by calling BeerApp.Config.info.(property)
BeerApp.Config = (function () {

    var config = {};

    //beer app api configuration information
    config.info = {
        baseUrl: 'https://api.brewerydb.com/v2/',
        key: '865b6a5e9890188485b0004a1563a12a',
        defaultStyleId: 1
    }

    return config;
})()
