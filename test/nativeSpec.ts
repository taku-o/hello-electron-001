import {Application} from 'spectron';
import * as assert from 'assert';
import * as temp from 'temp';
temp.track();

describe('window-native', function() {
  this.timeout(10000);

  before(function() {
    const fsprefix = `_ollfrow_${Date.now().toString(36)}`;
    const dirPath = temp.mkdirSync(fsprefix);
    this.app = new Application({
      path: 'ollfrow-darwin-x64/ollfrow.app/Contents/MacOS/ollfrow',
      env: {NODE_ENV: 'test', userData: dirPath},
    });
    return this.app.start();
  });

  after(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  beforeEach(function() {
    this.client = this.app.client;
    return this.client
      .click('#showNativeWindow')
      .windowByIndex(1);
  });

  afterEach(function() {
    return this.client.close();
  });

  it('run native and result', function() {
    return this.app.client
      .getValue('#result')
      .then((value: string) => {
        assert.equal('', value);
      })
      .click('#run')
      .waitForValue('#result', 5000)
      .getValue('#result')
      .then((value: string) => {
        assert.equal('Hello World\n', value);
      })
      .catch((err: Error) => {
        assert.fail(err.message);
      });
  });
});
