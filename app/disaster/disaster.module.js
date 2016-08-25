var myDisaster = angular.module('disaster', [''
])
.service('DisasterService',function(){
    this.getEarthquakes = function(info){

    };

    this.getFire = function(info){

    };
})
.controller('DisasterCtrl',DisasterCtrl);

function DisasterService(){
    getEarthquakes(info){

    }
}

function DisasterCtrl($scope,MapService, DisasterService){

    function disaplyData(){
        DisasterService.getEarthquakes(info);


    }

}



