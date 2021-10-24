import { PRODUCTS } from "../constants";
import { getAllProducts } from "../../services/product";
import { Dispatch } from "redux";

const { FETCHPRODUCTS, FETCHPRODUCTLOADER } = PRODUCTS;

export function setFetchProduct(data: any = {}) {
  return { type: FETCHPRODUCTS, data };
}

export function setFetchProductLoader(data: any = {}) {
  return { type: FETCHPRODUCTLOADER, data };
}

export function productList() {
  return async function (dispatch: Dispatch) {
    dispatch(setFetchProductLoader(true));
    return await getAllProducts()
      .then((res: any) => {
        if (res.status === 200) {
          const data = res.data;
          dispatch(setFetchProduct(data));
          return dispatch(setFetchProductLoader(false));
        }
        dispatch(setFetchProduct());
        return dispatch(setFetchProductLoader(false));
      })
      .catch(() => {
        dispatch(setFetchProduct());
        dispatch(setFetchProductLoader(false));
      });
  };
}


export function addToCart() {
  return async function (dispatch: Dispatch) {
    dispatch(setFetchProductLoader(true));
    return await getAllProducts()
      .then((res: any) => {
        if (res.status === 200) {
          const data = res.data;
          dispatch(setFetchProduct(data));
          return dispatch(setFetchProductLoader(false));
        }
        dispatch(setFetchProduct());
        return dispatch(setFetchProductLoader(false));
      })
      .catch(() => {
        dispatch(setFetchProduct());
        dispatch(setFetchProductLoader(false));
      });
  };
}
