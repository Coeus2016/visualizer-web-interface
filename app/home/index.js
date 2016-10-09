var myApp = angular.module('welcome', ['ngMaterial']);
myApp.controller('WelcomeCtrl',WelcomeCtrl);

function WelcomeCtrl($scope, $mdDialog){
	$scope.openFromLeft = function() {
    	$mdDialog.show(
	      	$mdDialog.alert()
	        	.clickOutsideToClose(true)
	        	.title('Opening from the left')
	        	.textContent('Closing to the right!')
	        	.ariaLabel('Left to right demo')
	        	.ok('Nice!')
	        	// You can specify either sting with query selector
	        	.openFrom('#left')
	        	// or an element
	        	.closeTo(angular.element(document.querySelector('#right')))
    	);
  	};

  	$scope.openOffscreen = function() {
    	$mdDialog.show(
      		$mdDialog.alert()
        		.clickOutsideToClose(true)
        		.title('Opening from offscreen')
        		.textContent('Closing to offscreen')
        		.ariaLabel('Offscreen Demo')
        		.ok('Amazing!')
        		// Or you can specify the rect to do the transition from
        		.openFrom({
          			top: -50,
          			width: 30,
          			height: 80
        		})
       			.closeTo({
          			left: 1500
        		})
    	);
  	};

  	$scope.showAdvanced = function(ev) {
    	$mdDialog.show({
      		controller: DialogController,
      		templateUrl: 'home/login.html',
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

  	function DialogController($scope, $mdDialog) {
    	$scope.hide = function() {
      		$mdDialog.hide();
    	};

    	$scope.cancel = function() {
      		$mdDialog.cancel();
    	};

    	$scope.answer = function(answer) {
      		$mdDialog.hide(answer);
    	};
  	}
}