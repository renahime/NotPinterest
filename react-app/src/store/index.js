import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
<<<<<<< HEAD
import boardReducer from './boards-mikey';

const rootReducer = combineReducers({
  session,
  board:boardReducer
=======
import profileReducer from './profile'
import pinsReducer from './pins';
import boardsReducer from './boards';

const rootReducer = combineReducers({
  session,
  profile: profileReducer,
  pins: pinsReducer,
  boards: boardsReducer
>>>>>>> dev
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
