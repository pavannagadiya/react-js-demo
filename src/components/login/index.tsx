import React, { useEffect } from "react";
import { DispatchProp, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { StoreState } from "../../store";
import { Row, Col, Card, Form, Input, Button } from "antd";
import "./style.css";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import credentials from "./credentials.json";
import { loginPrtocess,isAdmin } from "../../store/actions";

const mapStateToProps = ({ navData }: StoreState) => ({
  navData,
});

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type Props = DispatchProp &
  ReturnType<typeof mapStateToProps> & { dispatch: ThunkDispatchProps };

const Login: React.FC<Props> = function ({dispatch}) {
  let history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("loginUser")) {
      history.push("/");
    }
  }, [localStorage]);

  const onFinish = (values: any) => {
    const loginCredentials: any = _.find(credentials, function (o) {
      return o.email === values.email && o.password === values.password;
    });
    window.localStorage.setItem("loginUser", JSON.stringify(loginCredentials));
    dispatch(isAdmin(loginCredentials&&loginCredentials.isAdmin?loginCredentials.isAdmin:'false'))
    if (window.localStorage.getItem("loginUser")) {
      dispatch(loginPrtocess(true))
      history.push("/");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="add-margin">
      <Card bordered={false}>
        <Row justify="center">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default connect(mapStateToProps)(Login);