import React from "react";
import HeaderContainer from "./HeaderContainer";
import { Route, Switch } from "react-router-dom";
import RegisterContainer from "./RegisterContainer.js";
import ProductsContainer from "./ProductsContainer";
import FilterCategoryContainer from "./FilterCategoryContainer";
import LogInContainer from "./LogInContainer";
import ProductContainer from "./ProductContainer";

import { fetchUser } from "../store/actions/userAction";

import OrderContainer from "./OrderContainer";


import { connect } from "react-redux";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser();

    console.log(fetchUser);


    console.log(this.props.user.id);
  }

  render() {
    return (
      <div >
        <HeaderContainer />
        <hr />

        <br />
        <Switch>
          <Route exact path="/" component={ProductsContainer} />
          <Route exact path="/signup" component={RegisterContainer} />
          <Route exact path="/logIn" component={LogInContainer} />
          <Route
            exact
            path="/categories/:country"
            component={FilterCategoryContainer}
          />
          <Route exact path="/order/:userId" component={OrderContainer} />
          <Route exact path="/product/:name" component={ProductContainer} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchOrder: () => {
    //   dispatch(fetchOrder());
    // },
    fetchUser: () => dispatch(fetchUser())
  };
};

const mapStateToProps = state => {
  return {
    userFacebook: state.facebookReducer.payload,
    address: state.orderReducer.address,
    user: state.userReducer.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
