import {Application} from 'spectron';
import * as assert from 'assert';
import * as temp from 'temp';
temp.track();

describe('window-main', function() {
  this.timeout(10000);

  beforeEach(function() {
    const fsprefix = `_ollfrow_${Date.now().toString(36)}`;
    const dirPath = temp.mkdirSync(fsprefix);
    this.app = new Application({
      path: 'ollfrow-darwin-x64/ollfrow.app/Contents/MacOS/ollfrow',
      env: {NODE_ENV: 'test', userData: dirPath},
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('open window at startup', function() {
    return this.app.client
      .getWindowCount().then((count: number) => {
        assert.equal(count, 1);
      })
      .isVisible('.window').then((isVisible: boolean) => {
        assert.ok(isVisible);
      })
      .getTitle().then((title: string) => {
        assert.equal(title, 'ollfrow main-window');
      })
      .catch((err: Error) => {
        assert.fail(err.message);
      });
  });

  it('input and clear', function() {
    return this.app.client
      .setValue('#inputtext', 'hoge')
      .getText('#inputtext-value')
      .then((value: string) => {
        assert.equal('input text:hoge', value);
      })
      .click('#clear')
      .getValue('#inputtext')
      .then((value: string) => {
        assert.equal('', value);
      })
      .getText('#inputtext-value')
      .then((value: string) => {
        assert.equal('input text:', value);
      })
      .catch((err: Error) => {
        assert.fail(err.message);
      });
  });

  it('open readwrite window', function() {
    return this.app.client
      .click('#showRwWindow')
      .getWindowCount().then((count: number) => {
        assert.equal(count, 2);
      })
      .windowByIndex(1)
      .getTitle().then((title: string) => {
        assert.equal(title, 'ollfrow readwrite-window');
      })
      .catch((err: Error) => {
        assert.fail(err.message);
      });
  });

  it('open native window', function() {
    return this.app.client
      .click('#showNativeWindow')
      .getWindowCount().then((count: number) => {
        assert.equal(count, 2);
      })
      .windowByIndex(1)
      .getTitle().then((title: string) => {
        assert.equal(title, 'ollfrow native-window');
      })
      .catch((err: Error) => {
        assert.fail(err.message);
      });
  });

  it('open config window', function() {
    return this.app.client
      .click('#showConfigWindow')
      .getWindowCount().then((count: number) => {
        assert.equal(count, 2);
      })
      .windowByIndex(1)
      .getTitle().then((title: string) => {
        assert.equal(title, 'ollfrow config-window');
      })
      .catch((err: Error) => {
        assert.fail(err.message);
      });
  });
});
