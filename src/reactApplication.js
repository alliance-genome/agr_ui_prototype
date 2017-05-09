import React, { Component } from 'react';
import { Router, applyRouterMiddleware, browserHistory, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import configureStore from './lib/configureStore';

import routes from './routes';

class ReactApp extends Component {
  getDefaultHistory() {
    let isBrowser = (typeof window !== 'undefined');
    return isBrowser ? browserHistory : createMemoryHistory('/');
  }

  getDefaultStore(history) {
    return configureStore(history);
  }

  render() {
    let isBrowser = (typeof window !== 'undefined');
    let historyObj = this.props.history || this.getDefaultHistory();
    let store = this.props.store || this.getDefaultStore(historyObj);
    let history = syncHistoryWithStore(historyObj, store);
    let routerMiddlware = [];
    if (isBrowser) {
      routerMiddlware.push(useScroll());
    }
    return (
      <Provider store={store}>
        <Router history={history} render={applyRouterMiddleware(...routerMiddlware)}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

ReactApp.propTypes = {
  history: React.PropTypes.object,
  store: React.PropTypes.object
};

export default ReactApp;
