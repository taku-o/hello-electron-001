var ipcRenderer = require('electron').ipcRenderer;

angular.module('mainApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('MainController', ['$scope', function($scope) {

    $scope.inputtext = '';
    $scope.clear = function() {
      $scope.inputtext = '';
    };

    // called at showRwWindow clicked.
    $scope.showRwWindow = function() {
      ipcRenderer.send('showRwWindow', 'nandemo yoi');
    };
    // called at showNativeWindow clicked.
    $scope.showNativeWindow = function() {
      ipcRenderer.send('showNativeWindow', 'tekito');
    };
    // called at showConfigWindow clicked.
    $scope.showConfigWindow = function() {
      ipcRenderer.send('showConfigWindow', 'tekito');
    };

  }]);
