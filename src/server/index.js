require("babel-register")({
  plugins:  ["css-modules-transform"]
});
require.extensions['.png'] = function () {};

var express = require('express');
var requestProxy = require('express-request-proxy');
var compression = require('compression')
var React = require('react');
var ReactServer = require('react-dom/server');
var request = require('request');
var router = require('react-router')
var createMemoryHistory = require('react-router').createMemoryHistory;
var webpack = require('webpack');

var configureStore = require('../lib/configureStore').default;
var fetchGeneSuccess = require('../actions/genes').fetchGeneSuccess;
var ReactApp = require('../reactApplication').default;

// CONFIGURATION
// set PORT and API_URL
var PORT = process.env.PORT || 3000;
var API_URL = process.env.API_URL || 'http://dev.alliancegenome.org/api/';
var IS_PRODUCTION = process.env.NODE_ENV === 'production';
// init and basic config
var app = express();
app.use(compression());
// assets
app.use('/public', express.static('dist'))
// webpack dev environment
if (!IS_PRODUCTION) {
  var webpackConfig = require('../../webpack.config');
  var compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  })); 
}

// server template configuration
app.set('view engine', 'ejs');
app.set('views','./src/server');

// proxy external API server at /api
app.get('/api/:resource/:id', requestProxy({
  url: API_URL + ':resource/:id',
}));
app.get('/api/:searchPath', requestProxy({
  url: API_URL + ':searchPath',
}));

// render gene page with react after getting data
app.get('/gene/:id', function(req, res) {
  var apiUrl = API_URL + 'gene/' + req.params.id;
  request({
    url: apiUrl,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      _htmlString = '<h1>hello</h1>';
      var historyObj = createMemoryHistory(req.path);
      var store = configureStore(historyObj);
      store.dispatch(fetchGeneSuccess(response.body));
      var _hydratedState = JSON.stringify(response.body);
      var element = React.createElement(ReactApp, { history: historyObj, store: store });
      var _htmlString = ReactServer.renderToString(element);
      res.render('server_layout', { htmlString: _htmlString, hydratedState: _hydratedState  });
    } else {
      _htmlString = '<h1>Error</h1>';
      res.status(500).render('server_layout', { htmlString: _htmlString });
    }
  });
});

// defer all other HTML to react application
app.use(function (req, res) {
  var element = React.createElement(ReactApp, null);
  var _htmlString = ReactServer.renderToString(element);
  res.render('server_layout', { htmlString: _htmlString });
});

app.listen(PORT);
