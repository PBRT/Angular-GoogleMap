'use strict';
var app = angular.module('myApp.controllers', ['ui.map']);

app.controller('MapCtrl',  function($scope,$location, Map) {

    $scope.init = function(){
        $scope.mapMarkers = [];

        $scope.directionsDisplayD1 = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "red"
            },
            suppressMarkers : true
        });
        $scope.directionsDisplayD2 = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "blue"
            },
            suppressMarkers : true
        });
        $scope.directionsDisplayD3 = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "green"
            },
            suppressMarkers : true
        });

        $scope.infowindowD1Start = new google.maps.InfoWindow();
        $scope.infowindowD1Start.setContent('<p style="color: black">Start place Driver One</p>');
        $scope.infowindowD1End = new google.maps.InfoWindow();
        $scope.infowindowD1End.setContent('<p style="color: black">End place Driver One</p>');
        $scope.infowindowD2Start = new google.maps.InfoWindow();
        $scope.infowindowD2Start.setContent('<p style="color: black">Start place Driver Two</p>');
        $scope.infowindowD2End = new google.maps.InfoWindow();
        $scope.infowindowD2End.setContent('<p style="color: black">End place Driver Two</p>');
    }

    //Create markers thanks to the service
    $scope.createMarkers = function(){
        var index=0;
        var Markers = Map.getMarkers()
        for(index=0; index<Map.getMarkers().length; index++){

            var marker = new google.maps.Marker({
                map: $scope.myMap,
                title: Markers[index].title,
                icon: Markers[index].icon
            });
            $scope.mapMarkers.push(marker);
        }

        $scope.directionsDisplayD1.setMap($scope.myMap);
        $scope.directionsServiceD1 = new google.maps.DirectionsService();
        $scope.directionsDisplayD2.setMap($scope.myMap);
        $scope.directionsServiceD2 = new google.maps.DirectionsService();
        $scope.directionsServiceD3 = new google.maps.DirectionsService();

    }

    $scope.mapOptions = {
        center: new google.maps.LatLng(35.784, -78.670),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function($event,$params){

        if(Map.getFirstTime()){
            $scope.createMarkers();
            Map.setFirstTime(false);
        }

        var currentMarker = Map.getCurrentMarker();
        $scope.mapMarkers[currentMarker.id].setPosition($params[0].latLng)
        Map.updatePosition($params[0].latLng,currentMarker.id)
        $scope.openAlert(currentMarker.id)

        if(($scope.mapMarkers[0].position!=undefined)&&(($scope.mapMarkers[1].position!=undefined)))
            $scope.tracePath(1);
        if(($scope.mapMarkers[2].position!=undefined)&&(($scope.mapMarkers[3].position!=undefined)))
            $scope.tracePath(2);
    },

    $scope.openAlert = function(val){
        if(val==0){
            $scope.infowindowD1Start.open($scope.myMap, $scope.mapMarkers[0]);
        }else if(val==1){
            $scope.infowindowD1End.open($scope.myMap, $scope.mapMarkers[1]);
        }else if(val==2){
            $scope.infowindowD2Start.open($scope.myMap, $scope.mapMarkers[2]);
        }else if(val==3){
            $scope.infowindowD2End.open($scope.myMap, $scope.mapMarkers[3]);
        }


    },

    $scope.tracePath = function(val){

        var orig;
        var end;
        var directionService;
        var directionDisplay;

        if(val==1){
            orig=$scope.mapMarkers[0].getPosition();
            end=$scope.mapMarkers[1].getPosition();
            directionDisplay=$scope.directionsDisplayD1;
            directionService=$scope.directionsServiceD1

        }else if(val==2){
            orig=$scope.mapMarkers[2].getPosition();
            end=$scope.mapMarkers[3].getPosition();
            directionDisplay=$scope.directionsDisplayD2;
            directionService=$scope.directionsServiceD2;
        }


        var request = {
            origin:orig,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionDisplay.setDirections(response);
                Map.setDistance(val,response.routes[0].legs[0].distance.value/1000);
                Map.setDuration(val,$scope.secTo(response.routes[0].legs[0].duration.value));
            } else
                console.log(response);
        });
    }

    $scope.secTo = function(sec) {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        var time    = hours+'h'+minutes+'min'+seconds+'s';
        return time;
    }

    $scope.$on('clearTravelOne', function() {

        $scope.resetMarker(0);
        $scope.resetMarker(1);
        $scope.resetDirectionDisplay(1);

    })

    $scope.$on('clearTravelTwo', function() {

        $scope.resetMarker(2);
        $scope.resetMarker(3);
        $scope.resetDirectionDisplay(2);

    })

    $scope.$on('clearTravelFinal', function() {

        $scope.resetDirectionDisplay(3);

    })


    $scope.resetMarker= function(indice){

        var Markers = Map.getMarkers()
        $scope.mapMarkers[indice].setMap(null);
        $scope.mapMarkers[indice]=undefined;

        var marker = new google.maps.Marker({
            map: $scope.myMap,
            title: Markers[indice].title,
            icon: Markers[indice].icon
        });

        $scope.mapMarkers[indice]=marker;
    }

    $scope.resetDirectionDisplay= function(indice){

        if(indice==1){
            $scope.directionsDisplayD1.setMap(null);
            $scope.directionsDisplayD1=undefined;
            $scope.directionsDisplayD1 = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: "red"
                },
                suppressMarkers : true
            });
            $scope.directionsDisplayD1.setMap($scope.myMap);
        }else if( indice==2){
            $scope.directionsDisplayD2.setMap(null);
            $scope.directionsDisplayD2=undefined;
            $scope.directionsDisplayD2 = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: "blue"
                },
                suppressMarkers : true
            });
            $scope.directionsDisplayD2.setMap($scope.myMap);
        }else if( indice==3){
            $scope.directionsDisplayD3.setMap(null);
            $scope.directionsDisplayD3=undefined;
            $scope.directionsDisplayD3 = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: "green"
                },
                suppressMarkers : true
            });
            $scope.directionsDisplayD3.setMap($scope.myMap);
    }
    }

    $scope.$on('computeShortPath', function(event,args) {

        var distance ;
        var duration ;

        var wp=[]
        var start,end;
        var val=args.val;

        if(val==1) {
            wp.push({location: $scope.mapMarkers[2].getPosition(), stopover: false});
            wp.push({location: $scope.mapMarkers[3].getPosition(), stopover: false});
            start=$scope.mapMarkers[0].getPosition()
            end=$scope.mapMarkers[1].getPosition()
            distance= (Map.getDistances())[0]
            duration= (Map.getDurations())[0]
        }else if(val==2){
            wp.push({location: $scope.mapMarkers[0].getPosition(), stopover: false});
            wp.push({location: $scope.mapMarkers[1].getPosition(), stopover: false});
            start=$scope.mapMarkers[2].getPosition()
            end=$scope.mapMarkers[3].getPosition()
            distance= (Map.getDistances())[1]
            duration= (Map.getDurations())[1]
        }

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: wp
        };
        $scope.directionsDisplayD3.setMap($scope.myMap);
        $scope.directionsServiceD3.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var d_final= (response.routes[0].legs[0].distance.value/1000);
                $scope.directionsDisplayD3.setDirections(response);
                var time=Map.secTo(response.routes[0].legs[0].duration.value);
                var detourDistance=((response.routes[0].legs[0].distance.value/1000)-distance);
                var detourPerCent=Math.floor((detourDistance/d_final)*100);

                var results=[response.routes[0].legs[0].distance.value/1000, time,val, detourDistance, detourPerCent]
                Map.setResults(results);
                $location.path("/result");

            } else
                console.log(response);
        });

    })





});