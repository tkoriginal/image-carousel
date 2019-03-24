import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class User extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return <div>Welcome {this.props.user.user}</div>;
  }
}
const mapStateToProps = state => ({
  user: state.app.user,
});

User.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  { fetchUser },
)(User);
