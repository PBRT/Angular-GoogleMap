app.controller('MainCtrl',  function($scope, Map, $location) {

    $scope.resultEnabled=false;

    $scope.activeTab = function(route){
        if(route == $location.path())
            return true;
        else
            return false;
    }

});
