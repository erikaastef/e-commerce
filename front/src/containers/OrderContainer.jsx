import React, { Component } from "react";
import Order from "../components/Order";
import {
  buyProduct,
  dropOrder,
  fetchOrder,
  addOne,
  minusOne,
  clickNewAddress,
  fetchAddress,
} from "../store/actions/orderAction";

import { connect } from "react-redux";

class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      address: "",
    };
    this.handleSum = this.handleSum.bind(this);
    this.handleSubst = this.handleSubst.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickNewAddress = this.handleClickNewAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.userId);
    this.props.fetchAddress(this.state.address);
    this.props.order;
  }
  handleSum(e) {
    e.preventDefault();
    this.props.addOne(e.currentTarget.id, this.props.user.id);

    console.log(this.props.order, "la ordeeer despues de añadir");
  }
  handleSubst(e) {
    e.preventDefault();
    this.props.minusOne(e.currentTarget.id, this.props.user.id);
  }
  handleClick() {
    this.setState({
      confirm: true,
    });
  }

  handleClickNewAddress() {
    this.props.clickNewAddress();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchAddress(this.state.address);
  }

  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  render() {
    return (
      <div>
        <Order
          order={this.props.order}
          handleSum={this.handleSum}
          handleSubst={this.handleSubst}
          user={this.props.user}
          buyProduct={this.props.buyProduct}
          dropOrder={this.props.dropOrder}
          handleClick={this.handleClick}
          clickNewAddressStore={this.props.clickNewAddressStore}
          confirmState={this.state.confirm}
          handleClickNewAddress={this.handleClickNewAddress}
          handleSubmit={this.handleSubmit}
          handleChangeAddress={this.handleChangeAddress}
          address={this.state.address}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.orderReducer.order,
    user: state.userReducer.user,
    clickNewAddressStore: state.orderReducer.clickNewAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (userId) => {
      dispatch(fetchOrder(userId));
    },
    addOne: (itemId, userId) => {
      dispatch(addOne(itemId, userId));
    },
    minusOne: (itemId, userId) => {
      dispatch(minusOne(itemId, userId));
    },
    dropOrder: () => {
      dispatch(dropOrder());
    },
    buyProduct: (user) => {
      dispatch(buyProduct(user));
    },
    clickNewAddress: () => {
      dispatch(clickNewAddress());
    },
    fetchAddress: (item) => {
      dispatch(fetchAddress(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
