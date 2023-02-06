import authorization from "./reducers/authorizationReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const rootReducer = combineReducers({
  authorization,
});

window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION();
const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
