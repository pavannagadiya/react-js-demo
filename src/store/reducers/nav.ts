import { NAV } from "../constants";
const {
    ISLOGIN,
    ISADMIN
} = NAV;

export interface NavState {
  isLogin: boolean;
  isAdmin: boolean;
}

const initialState: NavState = {
    isLogin: false,
    isAdmin: false,
};

function navData(state = initialState, action: any): NavState {
  switch (action.type) {
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.data,
      };
    case ISADMIN:
      return {
        ...state,
        isAdmin: action.data,
      };
    default:
      return state;
  }
}

export default navData;
