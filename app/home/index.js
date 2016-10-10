var myApp = angular.module('welcome', ['ngMaterial']);
myApp.controller('WelcomeCtrl',WelcomeCtrl);

function WelcomeCtrl($scope, $mdDialog){
	$scope.showSignUp = function(ev){
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'home/signup.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
  		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
  		$scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.showLogin = function(ev){
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'home/login.html',
  		parent: angular.element(document.body),
  		targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer){
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog){
    $scope.user = {};

    $scope.hide = function() {
      console.log($scope.user);
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      console.log($scope.user);
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      console.log($scope.user);
      $mdDialog.hide(answer);
    };
  }
}