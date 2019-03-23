import React, { Component } from 'react'
import styled from 'styled-components';
class Posts extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({posts: data}))
    }
  render() {
    const postItems = this.state.posts.map(post => ( 
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>))
    return (
      <div>
        <h1>Post</h1>
        {postItems}
      </div>
    )
  }
}

export default Posts