'use strict';

exports.homePage = function *homePage() {
  const fs = require(`fs`);

  try {
    const stats = fs.statSync(`../client${this.path}`);

    if(stats.isDirectory()) {
      this.body = fs.createReadStream(`../client${this.path}/index.html`);
      this.type = `html`;
    }
    else {
      this.body = fs.createReadStream(`../client${this.path}`);
      this.type = mime.lookup(this.path);
    }
  }
  catch(err) {
    if(err.code === `ENOENT`) {
      // ENOENT means no file was found, which means a 404 error
      this.status = 404;
    }
    else {
      // we don't know what the error is, so just set the status as 500
      this.status = 500;
    }
    this.throw(err);
    console.log(e);
  }
};
