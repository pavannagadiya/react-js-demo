import React, { useEffect, useState } from "react";
import { DispatchProp, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { StoreState } from "../../store";
import { Row,Col, Card } from "antd";
import "./style.css";
import _ from "lodash";
import { DatabaseOutlined } from '@ant-design/icons';
import ProductsFromJson from "../../assets/products/index.json";
import { useHistory } from "react-router-dom";

const mapStateToProps = ({ productData,navData }: StoreState) => ({
  productData,
  navData
});

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type Props = DispatchProp &
  ReturnType<typeof mapStateToProps> & { dispatch: ThunkDispatchProps };
const { Meta } = Card;

const DashBoard: React.FC<Props> = function ({navData}) {
  let history = useHistory();
  const [productCount, setproductCount] = useState<any>(0);

  useEffect(() => {
    if (!navData.isAdmin) {
      history.push("/");
    }

    setproductCount(_.size(ProductsFromJson));
  }, []);
  useEffect(() => {
    if (!navData.isAdmin) {
      history.push("/");
    }
  }, [navData.isAdmin]);

  return (
    <div className="add-margin">
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} className="panel-group">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<DatabaseOutlined className="add-margin-top-only" />}
        >
          <Meta title="Products" description={`Total Products:-  ${productCount?productCount:0}`} />
        </Card>
        </Col>
      </Row>
    </div>
  );
};
export default connect(mapStateToProps)(DashBoard);
