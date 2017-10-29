var DevicesViewModel = require("./devices-view-model");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var deviceList = new DevicesViewModel([]);


var pageData = new observableModule.fromObject({
    deviceList:deviceList
});

function onLoaded(args) {
    

    var component = args.object;
    component.bindingContext = pageData;
    

    deviceList.empty();
    deviceList.load();
}

exports.onDetails=function(args){
    console.log(args.object.device);
}

exports.onImageLoaded=function(args){
    //console.log(args.object.device+". kép betöltve");    

}

exports.onLoaded = onLoaded;
