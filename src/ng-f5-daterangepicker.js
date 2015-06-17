/**
 * @license ng-f5-daterangepicker v0.0.1
 * (c) 2014 Michael Righi https://github.com/righi/ng-f5-daterangepicker
 * Forked from Luis Farzati's ng-bs-daterangepicker http://github.com/luisfarzati/ng-bs-daterangepicker
 * License: MIT
 */
(function (angular) {
  'use strict';

  angular.module('ngDateRangePicker', []).directive('input', ['$compile','$parse', function ($compile, $parse) {
    return {
      restrict: 'E',
      require: '?ngModel',
      priority: 1,
      link: function ($scope, $element, $attributes, ngModel) {
        if ($attributes.type !== 'daterange' || ngModel === null ) return;

        var options = {};
        options.format = $attributes.format || 'YYYY-MM-DD';
        options.separator = $attributes.separator || ' - ';
        options.minDate = $attributes.minDate && moment($attributes.minDate);
        options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
        options.dateLimit = $attributes.limit && moment.duration.apply(this, $attributes.limit.split(' ').map(function (elem, index) { return index === 0 && parseInt(elem, 10) || elem; }) );
        options.ranges = $attributes.ranges && $parse($attributes.ranges)($scope);
        options.locale = $attributes.locale && $parse($attributes.locale)($scope);
        options.opens = $attributes.opens && $parse($attributes.opens)($scope);

        function format(date) {
          return date.format(options.format);
        }

        function formatted(dates) {
          return [format(dates.startDate), format(dates.endDate)].join(options.separator);
        }

        ngModel.$formatters.unshift(function (modelValue) {
          if (!modelValue) return '';
          return modelValue;
        });

        ngModel.$parsers.unshift(function (viewValue) {
          return viewValue;
        });

        ngModel.$render = function () {
          if (!ngModel.$viewValue || !ngModel.$viewValue.startDate) return;
          $element.val(formatted(ngModel.$viewValue));
        };

        $scope.$watch($attributes.ngModel, function (modelValue) {
          if (!modelValue || (!modelValue.startDate)) {
            ngModel.$setViewValue({ startDate: moment().startOf('day'), endDate: moment().startOf('day') });
            return;
          }
          $element.data('daterangepicker').startDate = modelValue.startDate;
          $element.data('daterangepicker').endDate = modelValue.endDate;
        });

        $element.daterangepicker(options, function(start, end) {
          $scope.$apply(function () {
            ngModel.$setViewValue({ startDate: start, endDate: end });
            ngModel.$render();
          });
        });
      }
    };
  }]);

})(angular);
