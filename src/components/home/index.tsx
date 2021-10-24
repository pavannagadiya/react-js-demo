import React, { useEffect, useState } from "react";
import { DispatchProp, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { StoreState } from "../../store";
import { Card, Empty, Table, Tooltip, Modal, Form, Input, Button } from "antd";
import moment from "moment";
import { productList } from "../../store/actions";
import _ from "lodash";
import "./style.css";
import ProductsFromJson from "../../assets/products/index.json";
import { PlusSquareOutlined, DatabaseOutlined } from "@ant-design/icons";

const fs = require("fs");

const mapStateToProps = ({ productData,navData }: StoreState) => ({
  productData,
  navData
});

type ThunkDispatchProps = ThunkDispatch<{}, {}, AnyAction>;
type Props = DispatchProp &
  ReturnType<typeof mapStateToProps> & { dispatch: ThunkDispatchProps };

const Home: React.FC<Props> = function ({ navData,productData, dispatch }) {
  const [products, setproducts] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loogedInUser, setLoogedInUser] = useState<any>();

  useEffect(() => {
    // setproducts(ProductsFromJson);
    dispatch(productList());
    setLoogedInUser(navData.isAdmin);
  }, []);

  useEffect(() => {
    // if (_.size(ProductsFromJson) > 0) {
    if (_.size(productData.productList) > 0) {
      // setproducts(ProductsFromJson);
      setproducts(productData.productList);
    }
  }, [productData.productList]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const exportCsv = () => {
    if (_.size(productData) === 0) {
      return;
    }
    var arrData = products;

    var CSV = "";
    var row = "";
    for (var index in arrData[0]) {
      row += index + ",";
    }

    row = row.slice(0, -1);
    CSV += row + "\r\n";
    for (var i = 0; i < arrData.length; i++) {
      var row = "";
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + "\r\n";
    }

    if (CSV === "") {
      alert("Invalid data");
      return;
    }
    var fileName = "Product".replace(/ /g, "_");
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    var link = document.createElement("a");
    link.href = uri;
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFinish = (values: any) => {
    let newData = products;
    values.id = `${Math.floor(Math.random() * 100)}`;
    newData.push(values);
    fs.writeFile("../../assets/products/index.json", (err: any) => {
      if (err) console.log("Error writing file:", err);
    });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const productModal = () => {
    return (
      <Modal
        title="Add Product"
        visible={isModalVisible}
        footer={null}
        onCancel={() => handleCancel()}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const productColumn: any = [
    {
      title: "Name",
      dataIndex: "title",
      key: "Title",
      width: "25%",
      sorter: true,
      render: (productName: any, row: any) => (
        <>
          <span>
            {_.size(productName) >= 50
              ? _.truncate(productName, {
                  length: 50,
                })
              : productName || "-"}
          </span>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "Price",
      width: "15%",
      sorter: true,
      render: (price: any, row: any) => <span>{price || "-"}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "Category",
      width: "25%",
      sorter: true,
      render: (category: any, row: any) => <span>{category || "-"}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
      width: "50%",
      sorter: true,
      render: (description: any, row: any) => (
        <Tooltip title={description}>
          <span>
            {_.size(description) > 100
              ? _.truncate(description, {
                  length: 100,
                })
              : description}
          </span>
        </Tooltip>
      ),
    },
  ];

  const addProduct = (
    <>
    {navData.isLogin && loogedInUser === 'true' &&
        <PlusSquareOutlined
          className="icon-size"
          title="Add Products"
          onClick={() => showModal()}
        />
    }
      <DatabaseOutlined title="Export Data" className="icon-size" onClick={() => exportCsv()} />
    </>
  );

  return (
    <div className="add-margin">
      {products && _.size(products) > 0 ? (
        <>
          <Card title="Products" bordered={false} extra={addProduct}>
            <Table
              dataSource={products}
              columns={productColumn}
              style={{ minHeight: "60vh" }}
            />
            {productModal()}
          </Card>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
export default connect(mapStateToProps)(Home);
