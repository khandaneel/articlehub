angular.module('passwordModule', [])
  .controller('credentialsController', ['$scope',
    function($scope) {
      // Initialise the password as hello
      $scope.credentials = {
        password: ''
      };
    }
  ])
  .directive('passwordStrength', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'E',
        scope: {
          password: '=ngModel'
        },

        link: function(scope, elem, attrs, ctrl) {
          scope.$watch('password', function(newVal) {

            scope.strength = isSatisfied(newVal && newVal.length >= 8) +
              isSatisfied(newVal && /[a-z]/.test(newVal)) +
              isSatisfied(newVal && /[A-Z]/.test(newVal)) +
              isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
              isSatisfied(newVal && /\d/.test(newVal));

            function isSatisfied(criteria) {

              return criteria ? 1 : 0;
            }
          }, true);
        },
        template: '<div class="progress">' + 
'<div class="progress-bar showw{{strength >= 5 ? 5 : (strength >= 4 ? 4 : (strength >= 3 ? 3 : (strength >= 2 ? 2 : (strength >= 1 ? 1 : 0)))) }}"></div>' +
          '<div class="progress-bar showw{{strength >= 5 ? 5 : (strength >= 4 ? 4 : (strength >= 3 ? 3 : (strength >= 2 ? 2 : 0))) }}" ></div>' +
          '<div class="progress-bar showw{{strength >= 5 ? 5 : (strength >= 4 ? 4 : (strength >= 3 ? 3 : 0)) }}"></div>' +
          '<div class="progress-bar showw{{strength >= 5 ? 5 : (strength >= 4 ? 4 : 0) }}"></div>' +
          '<div class="progress-bar showw{{strength >= 5 ? 5 : 0 }}"></div>' +
          '</div>'

      }
    }
  ])
  .directive('patternValidator', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {
            
            var patt = new RegExp(attrs.patternValidator);
            
            var isValid = patt.test(viewValue);

            ctrl.$setValidity('passwordPattern', isValid);

           
            return viewValue;
            
          });
        }
      };
    }
  ]);