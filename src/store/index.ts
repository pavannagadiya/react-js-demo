import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { ProductState } from "./reducers/product";
import { NavState } from "./reducers/nav";

export interface StoreState {
  productData: ProductState;
  navData: NavState;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
