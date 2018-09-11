var exec = require('child_process').exec;

var app = require('electron').remote.app;
var appPath = app.getAppPath();
var unpackedPath = appPath.replace('app.asar', 'app.asar.unpacked');

angular.module('nativeApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('NativeController', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.result = '';

    $scope.run = function() {
      const cmdPath = `${unpackedPath.replace(' ', '\\ ')}/shell/hello`;
      const cmdOptions = {
        encoding: 'binary',
      };
      exec(cmdPath, cmdOptions, (err: Error, stdout, stderr) => {
        if (err) {
          $scope.result = 'エラーが起きたよ';
          return;
        }

        $scope.result = stdout;
        $timeout(() => { $scope.$apply(); }); // バックグラウンドで$scopeに加えた変更を反映させる
      });
    };

  }]);
