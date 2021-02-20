import React, { Component } from 'react';
import axios from 'axios';

class ListData extends Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://192.168.0.167/orc/index.php`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return(
      <ul>
      { this.state.persons.map(person => <li>{person.name}</li>)}
    </ul>
    )
  }
}
export default ListData;