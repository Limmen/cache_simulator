import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore'
import App from './containers/App';
import CounterContainer from './containers/CounterContainer';


const store = configureStore()
// Render the main component into the dom
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="counter" component={CounterContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
