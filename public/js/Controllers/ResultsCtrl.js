app.controller('ResultsCtrl',  function($scope, Map, $location) {

    $scope.init = function () {
        var res = Map.getResults();

        $scope.distanceResult="Distance  :  "+res[0]+ "(km)"
        $scope.durationResult="Duration  :  " +res[1]
        $scope.driverResult="Driver selected  : " +res[2]
        $scope.distanceDetour="Distance detour  : " +res[3]+ "(km)"
        $scope.percentDetour="PerCent detour  :   "+ res[4]+ "(%)"
    }

    $scope.clearAll = function(){

        $scope.distanceResult="Undefined"
        $scope.durationResult="Undefined"
        $scope.driverResult="Undefined"
        $scope.distanceDetour="Undefined"
        $scope.percentDetour="Undefined"

        var result= []
        Map.setResults(result)

        Map.clearTravel('1')
        Map.clearTravel('2')
        Map.clearTravel('3')

        $location.path("/gps");

    }

});
