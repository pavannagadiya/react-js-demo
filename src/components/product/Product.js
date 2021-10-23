import React from "react";
import ReadMoreReact from "read-more-react";

class Product extends React.Component {
  state = {
    product: this.props.data,
    button: this.props.data.button,
  };
  changeSign(button) {
    this.setState({ button: true });
    setTimeout(() => {
      this.setState({ button: false });
    }, 5000);
  }
  render() {
    return (
      <div className="card" key={this.state.product.id}>
        <div className="card-image">
          <img
            src={this.state.product.image}
            className="prodImg"
            alt={this.state.product.title}
          />
          <span className="card-title prodTitle">
            {this.state.product.title}
          </span>
          <span
            to="/"
            className="btn-floating halfway-fab waves-effect waves-light red"
            onClick={() => {
              this.props.addProductToCart(this.state.product);
              this.changeSign(this.state.product.button);
            }}
          >
            {this.state.button ? (
              <i className="material-icons">done</i>
            ) : (
              <i className="material-icons">add</i>
            )}
          </span>
        </div>

        <div className="card-content">
          <ReadMoreReact
            text={this.state.product.description}
            min={20}
            readMoreText="ReadMore"
          />
          <p>
            <b>
              Price:{" "}
              {this.state.product.price > 50 ? (
                <span
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    paddingRight: "5px",
                  }}
                >
                  {this.state.product.price}
                </span>
              ) : (
                ""
              )}
              {this.state.product.price >= 50
                ? (
                    this.state.product.price -
                    (10 * this.state.product.price) / 100
                  ).toFixed(2)
                : this.state.product.price}
              $
            </b>
          </p>
        </div>
      </div>
    );
  }
}

export default Product;
