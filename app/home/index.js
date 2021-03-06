var myApp = angular.module('welcome', ['ngMaterial','ngMessages']);
myApp.controller('WelcomeCtrl',WelcomeCtrl);

function WelcomeCtrl($scope, $mdDialog,$mdToast,$window){
  $scope.iframeHeight = $window.innerHeight+300;
  $scope.dataArray = [
      {
        src: 'public/images/back2.png'
      },
      {
        src: 'public/images/back3.png'
      },
      {
        src: 'public/images/background.png'
      }
    ];

	$scope.showSignUp = function(ev){
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'home/signup.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
  		fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
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
    });
  };

  function DialogController($scope, $mdDialog,$http,store,$state){
    $scope.user = {};

    $scope.showForgot = function(ev){
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'home/forgot.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      });
    }

    $scope.hide = function(){
      $mdDialog.hide();
    };

    $scope.cancel = function(){
      $mdDialog.cancel();
    };

    $scope.forgot = function(){
      $http({
        url: 'http://localhost:3300/forgotpassword',
        method: 'POST',
        data: $scope.user
      }).then(function(response) {
        $mdToast.show($mdToast.simple().textContent('password reset.'));
        $scope.cancel();
      }, function(error) {
        $mdToast.show($mdToast.simple().textContent('user does not exist.'));
      });
    };

    $scope.login = function(){
      $scope.loginform.$setValidity("emailpassword", true);
      $http({
        url: 'http://localhost:3300/login',
        method: 'POST',
        data: $scope.user
      }).then(function(response) {
        store.set('jwt', response.data.message);
        $scope.cancel();
        $state.go('main',{},{ reload: true });
      }, function(error) {
        $mdToast.show($mdToast.simple().textContent('email or password incorrect.'));
        $scope.loginform.$setValidity("emailpassword", false);
      });
    };

    $scope.register = function(){
      $scope.signupform.$setValidity("userexists", true);
      $http({
        url:'http://localhost:3300/register',
        method: 'POST',
        data: $scope.user
      }).then(function(response){
        $mdToast.show($mdToast.simple().textContent('Thank you for signing up. Check your emails.'));
        $scope.cancel();
      }, function(error){
        $mdToast.show($mdToast.simple().textContent('email already exist.'));
        $scope.signupform.$setValidity("userexists", false);
      });
    }
  }
}