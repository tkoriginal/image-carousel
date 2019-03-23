import React, { Component } from 'react'

class PostForm extends Component {
  state = {
    title: '',
    body: ''
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const post = {
      title: this.state.title,
      body: this.state.body
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }
  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form action="" method="post" onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" id="title" onChange={this.onChange} value={this.state.title}/>
          </div>
          <br/>
          <div>
            <label htmlFor="body: ">Body</label>
            <textarea name="body" id="body" onChange={this.onChange} value={this.state.body}></textarea>
          </div>
          <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default PostForm;