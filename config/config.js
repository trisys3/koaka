'use strict';

var yargs = require('yargs').argv;

// set node's phase of development
exports.env = yargs.env || process.env.NODE_ENV || 'development';
var env = require('./env/' + exports.env);

// basic application information
exports.name = 'Koaka';
exports.hosts = ['koaka.io'];
// get more hostnames from the environment if there are any
if(env.hosts != undefined) {
  // turn the extra hostnames into an array if not one already
  if(!Array.isArray(env.hosts)) {
    env.hosts = [env.hosts];
  }
  for(let host of env.hosts) {
    exports.hosts.push(host);
  }
}

// get the base port that will be added to for each run of the site
var basePort = yargs.basePort || process.env.BASE_PORT || 3000;
// get the offset port from the environment so each environment can have its own
var offsetPort = env.port || 0;
// put the base & offset ports together to come up with the final server port
exports.port = basePort + offsetPort;

// header configuration
exports.helmet = {
  csp: {
    // by default only allow connections from our sites
    'default-src': [exports.hosts.join()],
    // only allow JavaScript code from our sites
    'script-src': [exports.hosts.join()],
    // only allow CSS styles from our sites
    'style-src': [exports.hosts.join()],
    // only allow images from our sites
    'img-src': [exports.hosts.join()],
    // only allow partial-page connections (XHR, WebSockets, etc.) from our
    // sites
    'connect-src': [exports.hosts.join()],
    // only allow fonts from our sites
    'font-src': [exports.hosts.join()],
    // do not allow Flash on our sites
    'object-src': ["'none'"],
    // do not allow embedding of <iframe>s in our sites
    'frame-src': ["'none'"],
    // only allow video & audio from our sites
    'media-src': [exports.hosts.join()],
    // URL to send reports of violations to
    'report-uri': ['/csp-report'],
    // set all headers associated with CSP
    setAllHeaders: true
  },
  // do not let our pages to be put into <iframe>s
  xframe: 'deny',
  // set the XSS protection header
  iexss: null,
  // force a new context for downloading files on Internet Explorer
  ienoopen: null,
  // do not allow conent-type sniffing in some browsers
  contentTypeOptions: null,
  // always check with the server whether response content has changed
  cacheControl: null,
  // do not allow Flash Player or Adobe Reader to access any data
  permittedCrossDomainPolicies: null
};
