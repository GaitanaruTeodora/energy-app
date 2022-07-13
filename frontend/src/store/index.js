import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducers, userRegisterReducers } from "../reducers/userReducers";

import { configurationCreateReducers } from "../reducers/configurationReducers";
import { configurationListReducers,consumatorCreateReducers ,consumatorListReducers, configurationDeleteReducers} from "../reducers/configurationReducers";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  addConfiguration: configurationCreateReducers,
  listConfigurations: configurationListReducers,
  addConsumator:consumatorCreateReducers,
  getConsumators:consumatorListReducers,
  deleteConfiguration: configurationDeleteReducers,
  
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
