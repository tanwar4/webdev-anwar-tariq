/**
 * Created by sesha on 7/27/17.
 */

/* the function is a Java script constructor which will be instantiated from top level server.js */
/* req = parses the req from http, parses and makes it a nice clean object */
// params is part of the request. any variables in the path will be available as a a map in params

module.exports = function (app) {
  require('./services/page.service.server')(app);
  require('./services/user.service.server')(app);
  require('./services/website.service.server')(app);
  require('./services/widget.service.server')(app);
  require('./test-mongodb/app')(app);
  var db = require('./model/models.server');
};

