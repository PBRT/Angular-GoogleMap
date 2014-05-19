app.controller('GpsCtrl',  function($scope, Map) {

    $scope.init = function(){
        $scope.markers = Map.getMarkers();
        if(typeof $scope.markers[0].position!='undefined'){
            $scope.gpsD1XStart = Map.getMarkers()[0].position.lat();
            $scope.gpsD1YStart = Map.getMarkers()[0].position.lng();
        }else{
            $scope.gpsD1XStart = "Undefined"
            $scope.gpsD1YStart = "Undefined"
        }
        if(typeof $scope.markers[1].position!='undefined'){
            $scope.gpsD1XEnd= Map.getMarkers()[1].position.lat();
            $scope.gpsD1YEnd = Map.getMarkers()[1].position.lng();
        }else{
            $scope.gpsD1XEnd = "Undefined"
            $scope.gpsD1YEnd = "Undefined"
        }

        if(typeof $scope.markers[2].position!='undefined'){
            $scope.gpsD2XStart = Map.getMarkers()[2].position.lat();
            $scope.gpsD2YStart = Map.getMarkers()[2].position.lng();
        }else{
            $scope.gpsD2XStart = "Undefined"
            $scope.gpsD2YStart = "Undefined"
        }

        if(typeof  $scope.markers[3].position!='undefined'){
            $scope.gpsD2XEnd = Map.getMarkers()[3].position.lat();
            $scope.gpsD2YEnd = Map.getMarkers()[3].position.lng();
        }else{
            $scope.gpsD2XEnd = "Undefined"
            $scope.gpsD2YEnd= "Undefined"
        }


        /*$scope.gpsD1YStart = Map.getCurrentMarker().position.lng();
        $scope.gpsD1XEnd = Map.getCurrentMarker().position.lat();
        $scope.gpsD1YEnd = Map.getCurrentMarker().position.lng();
            $scope.gpsD2XStart = Map.getCurrentMarker().position.lat();
            $scope.gpsD2YStart = Map.getCurrentMarker().position.lng();
            $scope.gpsD2XEnd = Map.getCurrentMarker().position.lat();
            $scope.gpsD2YEnd = Map.getCurrentMarker().position.lng();*/

        $scope.distanceD1="Distance : " +(Map.getDistances())[0] + " (km)"
        $scope.distanceD2="Distance : " +(Map.getDistances())[1] + " (km)"

        $scope.durationD1="Duration : " +(Map.getDurations())[0]
        $scope.durationD2="Duration : " +(Map.getDurations())[1]

    }

    $scope.startD1 = function(){
        Map.setCurrentMarker($scope.markers[0]);
    }
    $scope.endD1 = function(){
        Map.setCurrentMarker($scope.markers[1]);
    }
    $scope.startD2 = function(){
        Map.setCurrentMarker($scope.markers[2]);
    }
    $scope.endD2 = function(){
        Map.setCurrentMarker($scope.markers[3]);
    }

    //Update input text position when marker has been displaced
    $scope.$on('updatePosition', function() {
        var current = Map.getCurrentMarker();
        if(current.id==0) {
            $scope.gpsD1XStart = Map.getCurrentMarker().position.lat();
            $scope.gpsD1YStart = Map.getCurrentMarker().position.lng();
        }else if(current.id==1){
            $scope.gpsD1XEnd = Map.getCurrentMarker().position.lat();
            $scope.gpsD1YEnd = Map.getCurrentMarker().position.lng();
        }else if(current.id==2){
            $scope.gpsD2XStart = Map.getCurrentMarker().position.lat();
            $scope.gpsD2YStart = Map.getCurrentMarker().position.lng();
        }else if(current.id==3){
            $scope.gpsD2XEnd = Map.getCurrentMarker().position.lat();
            $scope.gpsD2YEnd = Map.getCurrentMarker().position.lng();
        }
    });

    $scope.$on('updateDistances', function() {
        $scope.distanceD1="Distance : " +(Map.getDistances())[0] + " (km)"
        $scope.distanceD2="Distance : " +(Map.getDistances())[1] + " (km)"
    })

    $scope.$on('updateDurations', function() {
        $scope.durationD1="Duration : " +(Map.getDurations())[0]
        $scope.durationD2="Duration : " +(Map.getDurations())[1]
    })


    $scope.computeShortestPath = function() {
        //Check if all field are properly filled
        console.log($scope.distanceD1)
        if (($scope.distanceD1!=" Unknown (km) " )&& ($scope.distanceD2!=" Unknown (km) " )) {
            Map.computeShortPath();
        } else {
            //Ajouter les required
            alert("missing fields")
        }
    }

    $scope.clearTravel = function(val){
        Map.clearTravel(val)
        if(val==1){
            $scope.distanceD1="Distance : Unknown (km)"
            $scope.durationD1="Duration : Unknown"
            $scope.gpsD1XStart=""
            $scope.gpsD1XEnd=""
            $scope.gpsD1YStart=""
            $scope.gpsD1YEnd=""
        }else if (val==2){
            $scope.distanceD2="Distance : Unknown (km)"
            $scope.durationD2="Duration : Unknown"
            $scope.gpsD2XStart=""
            $scope.gpsD2XEnd=""
            $scope.gpsD2YStart=""
            $scope.gpsD2YEnd=""
        }
    }







});
