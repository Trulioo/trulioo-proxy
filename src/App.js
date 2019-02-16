import React, { Component } from 'react'
import EmbedID from 'trulioo-react/EmbedID'

class App extends Component {

  handleResponse = (e) => {
    // handle verification submission result here ...
  } 

  render() {
    return (
      <div className="App">
        <EmbedID url='http://localhost:3111' handleResponse={this.handleResponse} />
      </div>
    )
  }
}

export default App