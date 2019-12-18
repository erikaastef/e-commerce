import React from "react";
import Products from "../components/Products";
import { connect } from "react-redux";
import { fetchProducts } from "../store/actions/productsAction";
import { fetchProduct } from "../store/actions/searchAction";
import { addItem } from "../store/actions/orderAction";

import CircularProgress from "@material-ui/core/CircularProgress";

class ProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.props.mostrarProductos();
  }
  handleAdd(e) {
    e.preventDefault();

    addItem(e.target.id, this.props.user.id);
  }

  render() {
    const { productsState } = this.props;

    if (this.props.cargandoBusqueda.isFetching) {
      return (
        <div style={{ textAlign: "center" }}>
          <CircularProgress
            disableShrink
            style={{ width: "3cm", padding: "5%" }}
          />
        </div>
      );
    }

    return (
      <div
        className="container"
        style={{
          display: "flex",
          frexDirection: "row",
          justifyContent: "space-around",
          padding: "15px",
          flexWrap: "wrap",
          borderRadius: "7px",
        }}
      >
        <Products
          productsState={productsState}
          mostrarBusqueda={this.props.mostrarBusqueda}
          user={this.props.user}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsState: state.productsReducer.products,
  cargandoBusqueda: state.productsReducer,
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    mostrarProductos: () => {
      dispatch(fetchProducts());
    },
    mostrarBusqueda: (item) => {
      dispatch(fetchProduct(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
