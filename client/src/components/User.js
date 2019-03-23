import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/actions';

class User extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return <div>Welcome {this.props.user.user}</div>;
  }
}
const mapStateToProps = state => ({
  user: state.posts.user,
});

User.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  { fetchUser },
)(User);