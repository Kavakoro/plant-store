import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import { plantReducer } from './plants';
import { cartReducer } from './cart';
import { singlePlantReducer } from './singlePlant';
import { userReducer } from './users';
import { singleUserReducer } from './singleUser';

const reducer = combineReducers({
  auth,
  plants: plantReducer,
  cart: cartReducer,
  plant: singlePlantReducer,
  users: userReducer,
  user: singleUserReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
