import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import notifications from './notifications';

const reducers = combineReducers({
  notifications
});

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
