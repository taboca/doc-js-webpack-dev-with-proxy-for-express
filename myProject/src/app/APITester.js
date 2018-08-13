import React, { Component } from 'react';
import axios from 'axios';

class APITester extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading    : false,
      status     : 'no data yet'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({loading:true})

    var data = {
      "argumentToJSON": "foo"
    }

    //     axios.post('/app_send', {data}) // this is like data:data ..
    axios.post('/api/test', data)
        .then(res => {
          if(res.data.status=='ok') {
            this.setState({loading: false, status: 'ok'});
          };
        });

  }

  render() {
      if(!this.state.loading) {
        return (
          <div className="">
            <form onSubmit={this.handleSubmit}>
              <p>
                Result: {this.state.status} <br />
                <input type="submit" value="Call server" />
              </p>
            </form>
          </div>
        );
      } else {
        return (
          <div className="">
              <p>
                loading...
              </p>
          </div>
        );
      }
  }

}

export default APITester;
