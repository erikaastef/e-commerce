import React from "react";
import { connect } from "react-redux";
import Product from "../components/Product";
import { fetchProduct } from "../store/actions/searchAction";

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.name);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "black",
          color: "white",
          borderRadius: "7px"
        }}
      >
        <Product busqueda={this.props.busqueda} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  busqueda: state.searchReducer.search
});

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: item => {
      dispatch(fetchProduct(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer);
