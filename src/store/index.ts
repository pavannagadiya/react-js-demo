import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { ProductState } from "./reducers/product";

export interface StoreState {
  productData: ProductState;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
