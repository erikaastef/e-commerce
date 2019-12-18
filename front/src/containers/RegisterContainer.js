import React, { Component } from "react";
import { connect } from "react-redux";
import Register from "../components/Register";
import { fetchRegister } from "../store/actions/registerAction";

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      address: "",
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();
    this.props
      .fetchRegister(this.state)
      .then(res => {

        if (res !== "ERROR") {
          this.props.history.push("/login");
        } else {
          this.props.history.push("/signup");
        }
      })
      .catch(error => {
        console.log(error, "error de signup");
      });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeAddress(event) {
    this.setState({ address: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { name, lastName, address, email, password } = this.state;
    return (
      <div>
        <Register
          handleSubmit={this.handleSubmit}
          handleChangeName={this.handleChangeName}
          handleChangeLastName={this.handleChangeLastName}
          handleChangeAddress={this.handleChangeAddress}
          handleChangeEmail={this.handleChangeEmail}
          handleChangePassword={this.handleChangePassword}
          name={name}
          lastname={lastName}
          address={address}
          email={email}
          password={password}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    fetchRegister: register => dispatch(fetchRegister(register))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
