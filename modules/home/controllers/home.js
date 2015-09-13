'use strict';

const fs = require(`fs`);
const hbs = require(`koa-handlebars`);
const koa = require(`koa`);
const mime = require(`mime`);

const homeCtrl = koa();

module.exports = homePage;

function homePage() {
  homeCtrl.use(function *homeController(next) {
    const stats = fs.statSync(this.path);

    // try to find the file
    try {
      // if the path points to a folder, get the index.html in that folder
      // and set the MIME type as "HTML"
      if(stats.isDirectory()) {
        this.type = mime.lookup(`html`);
        this.body = this.renderView(`index`);
      }
      else {
        this.type = mime.lookup(this.path);
        this.body = fs.createReadStream(this.path);
      }
    }
    catch(err) {
      if(err.code === `ENOENT`) {
        // ENOENT means no file was found, which usually means a 404 error
        this.status = 404;
      }
      else {
        // we don't know what the error is, so just set the status as 500
        this.status = 500;
      }

      this.throw(err);
    }

    yield next;
  });

  return homeCtrl;
}
