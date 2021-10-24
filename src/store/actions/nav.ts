import { NAV } from "../constants";
import { Dispatch } from "redux";

const { ISLOGIN, ISADMIN } = NAV;

export function setIsLogin(data: any = {}) {
  return { type: ISLOGIN, data };
}

export function loginPrtocess(params: any) {
  return async function (dispatch: Dispatch) {
    return dispatch(setIsLogin(params));
  };
}

export function setIsAdmin(data: any = {}) {
  return { type: ISADMIN, data };
}

export function isAdmin(params: any) {
  return async function (dispatch: Dispatch) {
    return dispatch(setIsAdmin(params));
  };
}