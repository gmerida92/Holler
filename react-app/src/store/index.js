import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reviewReducer from './review';
import businessReducer from './business';
import businessCategoryReducer from './business_category';
import businessAttributeReducer from './business_attribute';
import businessHourReducer from './business_hour';
import sessionReducer from './session'

const rootReducer = combineReducers({
  session: sessionReducer,
  business: businessReducer,
  businessCategory: businessCategoryReducer,
  businessAttribute: businessAttributeReducer,
  businessHour: businessHourReducer,
  review: reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
