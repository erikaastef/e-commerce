import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/actions/CategoriesAction";
import FilterCategory from "../components/FilterCategory";

import { addItem } from "../store/actions/orderAction";

class FilterCategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    this.props.fetchProducts(this.props.match.params.country);
  }
  handleAdd(e) {
    e.preventDefault();
    addItem(e.currentTarget.id, this.props.user.id);
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FilterCategory
          products={this.props.products}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (item) => {
      dispatch(fetchProducts(item));
    },
  };
};

const mapStateToProps = (state) => ({
  products: state.filterReducer.productsCategory,

  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCategoryContainer);
