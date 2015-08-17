module.exports = function *routes() {
  const path = require(`path`);
  const home = require(`./controllers/home`);
  //const docRoutes = require(`./modules/routes`);

  if(path.normalize(this.path).match(`^/docs`)) {
    yield* docRoutes(this);
  }
  else if(this.method === `GET`) {
    yield* home.homePage.call(this);
  }
  else {
    this.body = `This page was not meant to be used with ${this.method}`;
  }
};
