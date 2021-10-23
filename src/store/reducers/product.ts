import { PRODUCTS } from "../constants";
const {
    FETCHPRODUCTS,
    FETCHPRODUCTLOADER,
} = PRODUCTS;

export interface ProductState {
  productList: any;
  productListLoader: boolean;
}

const initialState: ProductState = {
  productList: [],
  productListLoader: false,
};

function productData(state = initialState, action: any): ProductState {
  switch (action.type) {
    case FETCHPRODUCTS:
      return {
        ...state,
        productList: action.data,
      };
    case FETCHPRODUCTLOADER:
      return {
        ...state,
        productListLoader: action.data,
      };
    default:
      return state;
  }
}

export default productData;
