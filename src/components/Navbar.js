import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
class Navbar extends React.Component {
  render() {
    return (
      <nav className="nav-wrapper">
        <div className="container">
          <Link to="/" className="brand-logo">
            Shopping
          </Link>

          <ul className="right">
            {/* <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/cart">My cart</Link>
            </li> */}
            <li>
              <Link to="/cart">
                {/* <div className="numberOfProduct">{this.props.selectedProd.length}</div>
                <i className="material-icons">shopping_cart</i> */}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
// const mapStateToProps = (state) => {
//   return { selectedProd: state.product.product };
// };
// export default connect(mapStateToProps, null)(Navbar);
export default Navbar;
