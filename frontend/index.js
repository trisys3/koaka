import serve from 'koa-static';
import mount from 'koa-mount';

import webpack from 'webpack';
import {watch} from 'chokidar';
import bundler from '../webpack.client.config';
import {socket, options} from '../config';
import {green} from 'chalk';

export default homePage;

function homePage() {
  // compile the module with webpack
  webpack(bundler, () => {
    // watch all hot update files in the compilation folder
    const hotUpdWatch = watch('*.hot-update.json', {
      cwd: `${process.cwd()}/frontend/${options.env}`,
      // ignore hidden files
      ignored: /^\./,
    });

    socket.on('connection', io => {
      // whenever a hot-update file gets created, emit a hot-update event to all
      // sockets connected to this page
      hotUpdWatch.on('add', () => {
        console.log(green('File changed'));

        io.emit('hot-update');
      });
    });
  });

  const Koa = require('koa');
  const app = new Koa();

  app.use(serve(`${process.cwd()}/frontend/${options.env}/`));
  return mount('/', app);
}
