import React from "react";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";

class CartProd extends React.Component {
  state = {
    quantity: this.props.data.quantity,
  };
  reduceCount = () => {
    if (this.state.quantity !== 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };
  addCount = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };
  render() {
    return (
      <div>
        <ul className="collection">
          <li className="collection-item avatar">
            <div className="item-img">
              <img
                src={this.props.data.image}
                alt={this.props.data.title}
                className=""
              />
            </div>

            <div className="item-desc">
              <span className="title">{this.props.data.title}</span>
              <ReadMoreReact
                text={this.props.data.description}
                min={20}
                readMoreText="ReadMore"
              />
              <p>
                <b>
                  Price:
                  {this.props.data.price > 50 ? (
                    <span
                      style={{
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        paddingRight: "5px",
                      }}
                    >
                      {this.props.data.price}
                    </span>
                  ) : (
                    <span>{this.props.data.price}</span>
                  )}
                  {this.props.data.price > 50 ? (
                    <span>{this.props.data.finalPrice.toFixed(2)}</span>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;${/* {this.props.data.price}$ */}
                </b>
              </p>
              <p>
                <b>Quantity: {this.state.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart" onClick={() => this.addCount()}>
                  <i className="material-icons">arrow_drop_up</i>
                </Link>
                <Link to="/cart" onClick={() => this.reduceCount()}>
                  <i className="material-icons">arrow_drop_down</i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.props.removeItem(this.props.index);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default CartProd;
