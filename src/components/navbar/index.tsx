import React, { useEffect, useState } from "react";
import { DispatchProp, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { StoreState } from "../../store";
import { Menu, Layout } from "antd";
import "./style.css";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { loginPrtocess } from "../../store/actions";

const { Header } = Layout;

const mapStateToProps = ({ navData }: StoreState) => ({
  navData,
});

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type Props = DispatchProp &
  ReturnType<typeof mapStateToProps> & { dispatch: ThunkDispatchProps };
  
  const Navbar: React.FC<Props> = function ({ navData, dispatch }) {
    let history = useHistory();
    const [loogedInUser, setLoogedInUser] = useState<any>("");

  useEffect(() => {
    setLoogedInUser(navData.isAdmin);
  }, []);
  useEffect(() => {
    setLoogedInUser(navData.isAdmin);
  }, [navData]);

  function changePage(page: any) {
    history.push(page);
  }

  function logIn() {
    history.push("/login");
  }
  function logOut(arg: any) {
      dispatch(loginPrtocess(false));
      window.localStorage.removeItem('loginUser');
      history.push("/");
  }
  return (
    <div>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => changePage("/")}>
            Products
          </Menu.Item>
          {navData.isLogin && loogedInUser  === 'true' && (
              <Menu.Item key="2" onClick={() => changePage("/dashboard")}>
                Dashboard
              </Menu.Item>
            )}
            {navData && !navData.isLogin? 
          <Menu.Item key="3" onClick={() => logIn()}>
            Login
          </Menu.Item>
            :
          <Menu.Item key="4" onClick={() => logOut(false)}>
            LogOut
          </Menu.Item>
            }
        </Menu>
      </Header>
    </div>
  );
};
export default connect(mapStateToProps)(Navbar);
