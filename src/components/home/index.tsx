import React, { useEffect, useState } from "react";
import { DispatchProp, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { StoreState } from "../../store";
import { Card, Row, Col } from "antd";
// import moment from "moment";
import { productList } from "../../store/actions";
import _ from "lodash";
import "./style.css";
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

const { Meta } = Card;

const mapStateToProps = ({ productData }: StoreState) => ({
  productData,
});

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type Props = DispatchProp &
  ReturnType<typeof mapStateToProps> & { dispatch: ThunkDispatchProps };

const Home: React.FC<Props> = function ({ productData, dispatch }) {
  const [products, setproducts] = useState<any>();

  useEffect(() => {
    dispatch(productList())
    
  }, []);
  
  useEffect(() => {
    if (_.size(productData.productList)>0) {
      setproducts(productData.productList);
    }
    console.log("products: ", products);
  }, [productData.productList]);

  return (
    <div>
      <Row>
        {_.size(products)>0 &&products.map((productData: any, i: any) => (
          <Col
          xl={6}
          lg={6}
          md={6}
          sm={8}
          xs={8}
          key={i}
          className="card-css add-space-from-bottom"
        >
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                   alt="example"
                  src={productData.image}
                  className="image-css"
                />
              }
              actions={[
                <PlusOutlined  key="setting" />,
              ]}
            >
              <Meta
                title={productData.title}
                description={_.size(productData.description) >= 100 ? _.truncate(productData.description) : productData.description}
              />
              
            </Card>
          </Col>)
        )}
      </Row>
    </div>
  );
};
export default connect(mapStateToProps)(Home);
