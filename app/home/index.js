var myApp = angular.module('welcome', ['ngMaterial','ngMessages']);
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

  function DialogController($scope, $mdDialog,$http,store,$state){
    $scope.user = {};

    $scope.hide = function() {
      console.log($scope.user);
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      console.log($scope.user);
      $mdDialog.cancel();
    };

    $scope.login = function(){
      $http({
        url: 'http://localhost:3300/login',
        method: 'POST',
        data: $scope.user
      }).then(function(response) {
        store.set('jwt', response.data.message);
        $scope.hide();
        $state.go('main',{},{ reload: true });
      }, function(error) {
        console.log(error.data);
      });
    };

    $scope.register = function(){
      $http({
        url:'http://localhost:3300/register',
        method: 'POST',
        data: $scope.user
      }).then(function(response){
        console.log(response.data.message);
      }, function(error){
        console.log(error.data);
      });
    }

    $scope.answer = function(answer) {
      console.log($scope.user);
      $mdDialog.hide(answer);
    };
  }
}