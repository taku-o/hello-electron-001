var ipcRenderer = require('electron').ipcRenderer;
var fs          = require('fs');

angular.module('rwApp', [])
  .config(['$qProvider', ($qProvider) => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .controller('RwController', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.textdata = '';

    $scope.read = function() {
      // 選択されたファイルを受け取る
      ipcRenderer.once('showOpenDialogSelected', (event, filePaths) => {
        if (!filePaths || filePaths.length < 1) {
          ipcRenderer.send('showResultMessage', 'ファイルが選択されませんでした');
          return;
        }

        fs.readFile(filePaths[0], (err: Error, data) => {
          if (err) {
            ipcRenderer.send('showResultMessage', 'ファイルの読み込みに失敗しました');
            return;
          }
          $scope.textdata = data;
          $timeout(() => { $scope.$apply(); }); // バックグラウンドで$scopeに加えた変更を反映させる
          ipcRenderer.send('showResultMessage', 'ファイルから読み込みました');
        });
      });

      // ファイル選択ダイアログを開かせる
      ipcRenderer.send('showOpenDialog', 'foo');
    };

    $scope.write = function() {
      // 選択されたファイルを受け取る
      ipcRenderer.once('showWriteDialogSelected', (event, filePath) => {
        if (!filePath) {
          ipcRenderer.send('showResultMessage', 'ファイルが選択されませんでした');
          return;
        }

        fs.writeFile(filePath, $scope.textdata, (err) => {
          if (err) {
            ipcRenderer.send('showResultMessage', 'ファイルの書き込みに失敗しました');
            return;
          }
          // done
          ipcRenderer.send('showResultMessage', 'ファイルに保存しました');
        });
      });

      // ファイル選択ダイアログを開かせる
      ipcRenderer.send('showWriteDialog', 'var');
    };

  }]);
