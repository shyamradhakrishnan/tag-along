
var app = angular.module('myApp', []);
app.controller('tagalongCtrl', function($scope, $http, $window, $location, $q) {

        $scope.addUserNotification = false;
        $scope.startTripNotification = false;

        action = $location.search().action;
        if (action == 'addUserNotification') {
            $scope.addedusername = $location.search().username;
            $scope.addUserNotification = true;
        }

        if (action == 'startTripNotification') {
           // $scope.addedusername = $location.search().username;
            $scope.startTripNotification = true;
        }

      // populate the product table
     $http.get('/alerts')
            .then(function (response) {
            console.log(response);
            $scope.alerts = response.data;});
    // called on click to add product
    $scope.addUser = function() {
        $scope.editing      = false;
        $scope.buttonAction = 'Add';
        $scope.name    = '';
        $scope.phoneNumber         = '';
        $("#register").modal();
    };

  $scope.startTrip = function() {
        $scope.editing      = false;
        $scope.buttonAction = 'Add';
        $scope.tripname    = '';
        $scope.members         = '';
        $("#starttrip").modal();
    };
    // called on saving a product
    $scope.saveUser = function() {
        if ($scope.name      == undefined || $scope.phoneNumber    == undefined) {
            alert('Please enter all required details');
        }
        else {
            $scope.postUser($scope.name, $scope.phoneNumber);
        }
    };

    // called to add a new product
    $scope.postUser = function(name,phoneNumber) {
        var newUser = '{ "username" : "' + name + '", ' +
                          ' "phonenumber" : "'      + phoneNumber +'" '+
                          '}';

        $http.post('/register', newUser)
        .then(function (response) {
                                 $window.location.href = 'index.html#?action=addUserNotification&username=' + response.data[0].name;
                            //$window.location.href = 'index.html';
                            $window.location.reload();
                        })
                        .catch(function (message, code) {
                            if (message) {
                                alert('Error ' + message + ', ' + code);
                            }
                        });
    };

        //startTrip
         $scope.startTrip = function() {
                $scope.editing      = false;
                $scope.buttonAction = 'Add';
                $scope.tripname    = '';
                $scope.members         = '';
                $("#starttrip").modal();
            };

                // called on saving a product
             $scope.saveTrip = function() {
                    if ($scope.tripname      == undefined || $scope.members    == undefined) {
                        alert('Please enter all required details');
                    }
                    else {
                        $scope.postTrip($scope.tripname, $scope.members);
                    }
                };

           // called to add a new product
            $scope.postTrip = function(tripname,members) {
                var trip = '{ "tripname" : "' + tripname + '", ' +
                                  ' "members" : "'      + members +'" '+
                                  '}';

                $http.post('/starttrip', trip)
                .then(function (response) {
                                     //alert(response.data);
                                       $window.location.href = 'index.html#?action=startTripNotification';
                                   // $window.location.href = 'index.html';
                                    $window.location.reload();
                                })
                                .catch(function (message, code) {
                                    if (message) {
                                        alert('Error ' + message + ', ' + code);
                                    }
                                });
            };


});
