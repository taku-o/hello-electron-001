var fs = require('fs');

var filePath = '/Users/taku.omi/Desktop/evil.txt';

fs.writeFile(filePath, 'eviiiiiiilll', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
    return;
  }
  console.log('done.'); // eslint-disable-line
});

 
