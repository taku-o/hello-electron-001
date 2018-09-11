var app = require('electron').remote.app;
var shell = require('electron').shell;
var Config = require('electron-config');

angular.module('configApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('ConfigController', ['$scope', '$timeout', function($scope, $timeout) {

    // initialize
    // load config data
    const config = new Config();
    $scope.configData = config.get('data');

    $scope.update = function() {
      config.set('data', $scope.configData);
    };

    $scope.openUserDataDir = function() {
      const dir = app.getPath('userData');
      shell.showItemInFolder(dir);
    };

  }]);
