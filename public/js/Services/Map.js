'use strict';

var services = angular.module('myApp.services', []);

//TODO: fonctionnement à revoir/améliorer
services.factory('Map', function($http, $location, $rootScope) {

    //Markers (D1 start, D1end, D2start, D2end)
    var Markers = [{
        id: 0,
        title: "Start driver 1",
        icon: 'http://maps.google.com/mapfiles/ms/icons/'+'red'+'-dot.png'
    },
    {
        id: 1,
        title: "End driver 1",
        icon: 'http://maps.google.com/mapfiles/ms/icons/'+'red'+'-dot.png'
    },
    {
        id: 2,
        title: "Start driver 2",
        icon: 'http://maps.google.com/mapfiles/ms/icons/'+'blue'+'-dot.png'
    },
    {
        id: 3,
        title: "End driver 2",
        icon: 'http://maps.google.com/mapfiles/ms/icons/'+'blue'+'-dot.png'
    }]

    //Current marker drop on the map, init with the first driver
    var currentMarker=Markers[0];

    //Travel informations
    var distances = ["Unknown", "Unknown"];
    var durations = ["Unknown", "Unknown"];

    //First time
    var firstTime=true;

    //Results
    var results = [];

    return {

        getResults : function(){
           return results;
        },
        setResults : function(tab){
          results=tab;
        },
        getFirstTime: function(){
            return firstTime;
        },
        setFirstTime: function(val){
            firstTime=val;
        },
        getDistances: function(){
            return distances;
        },
        setDistances : function(val){
            distances=val;
        },
        getDurations: function(){
            return durations;
        },
        setDurations : function(val){
            durations=val;
        },
        getMarkers: function(){
            return Markers;
        },
        setMarkers : function(val){
            Markers=val;
        },
        getCurrentMarker: function(){
            return currentMarker;
        },
        setCurrentMarker: function(val){
            currentMarker=val;
        },
        updatePosition: function(position, id){
            Markers[id].position=position;
            $rootScope.$broadcast('updatePosition', function(){});
        },
        setDistance: function(driver,message){
                if(driver==1)
                    distances[0]=message;
                if(driver==2)
                    distances[1]=message;
            $rootScope.$broadcast('updateDistances', function(){});
        },
        setDuration: function(driver,message){
            if(driver==1)
                durations[0]=message;
            if(driver==2)
                durations[1]=message;
            $rootScope.$broadcast('updateDurations', function(){});
        },
        clearTravel: function(val){
            if(val==1){
                $rootScope.$broadcast('clearTravelOne', function(){});
                delete Markers[0].position;
                delete Markers[1].position;
                distances[0]="Unknown";
                durations[0]="Unknown";
            }else if(val==2){
                $rootScope.$broadcast('clearTravelTwo', function(){});
                delete Markers[2].position;
                delete Markers[3].position;
                distances[1]="Unknown";
                durations[1]="Unknown";
            }else if(val==3){
                $rootScope.$broadcast('clearTravelFinal', function(){});
            }

        },

        computeShortPath: function() {

            //Driver 1 will drive
            if (distances[0] > distances[1]) {
                $rootScope.$broadcast('computeShortPath', {val: 1});
            } else {
                $rootScope.$broadcast('computeShortPath', {val: 2});
            }
        },

        secTo: function(sec) {
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


    }

});