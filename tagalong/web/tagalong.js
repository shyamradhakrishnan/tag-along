/**
 * products.js
 *
 * AngularJS support for products.html.
 *
 * @author tam  2015.07.10
 * @since 12.2.1
 */

var app = angular.module('myApp', []);
app.controller('tagalongCtrl', function($scope, $http, $window, $location, $q) {
    // called on click to add product
    $scope.addUser = function() {
        $scope.editing      = false;
        $scope.buttonAction = 'Add';
        $scope.name    = '';
        $scope.phoneNumber         = '';
        $("#register").modal();
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
                            $window.location.href = 'index.html';
                            $window.location.reload();
                        })
                        .catch(function (message, code) {
                            if (message) {
                                alert('Error ' + message + ', ' + code);
                            }
                        });
    };
});
