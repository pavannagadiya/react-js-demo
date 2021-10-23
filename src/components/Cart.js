import React, { Component } from "react";
// import Recipe from "./Recipe";
// import { connect } from "react-redux";
// import { removeFromCart } from "../store/actions";
// import CartProd from "../components/product/CartProd";

class Cart extends Component {
  // state = {
  //   price: 0,
  //   quantity: 0,
  //   cartProd: [],
  // };
  // componentDidMount() {
  //   let cProd = [];
  //   let sProd;
  //   this.props.selectedProd.forEach((e) => {
  //     sProd = { ...e, quantity: 1 };
  //     cProd.push(sProd);
  //   });
  //   this.setState({ cartProd: cProd });
  // }
  // productRemoveFromTheCart = (data) => {
  //   this.props.removeFromCart(data);
  //   let cartProd = [...this.state.cartProd];
  //   if (data !== -1) {
  //     cartProd.splice(data, 1);
  //     this.setState({ cartProd });
  //   }
  // };

  render() {
    // let count = 0;
    // for (let i = 0; i < this.props.selectedProd.length; i++) {
    //   count += this.props.selectedProd[i].finalPrice;
    // }
    return (
      <h1>Hi</h1>
      // <div className="container">
      //   {this.props.selectedProd.length !== 0 ? (
      //     <div className="cart">
      //       <h5>You have ordered:</h5>
      //       {this.state.cartProd.map((item, index) => {
      //         return (
      //           <CartProd
      //             data={item}
      //             key={index}
      //             removeItem={this.productRemoveFromTheCart}
      //             index={index}
      //           />
      //         );
      //       })}
      //     </div>
      //   ) : (
      //     <h5>You have no select any item yet !!!</h5>
      //   )}

      //   <Recipe total={count} />
      // </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return { selectedProd: state.product.product };
// };
// export default connect(mapStateToProps, { removeFromCart })(Cart);
export default Cart;
