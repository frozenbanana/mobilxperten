import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
    state = {
        counters: [
            {id: 1, value: 1},
            {id: 2, value: 0},
            {id: 3, value: 3}
        ]
    };

    constructor() {
        super();
        console.log('App constructor called');
    }

    componentDidMount() {
        // Place to do server calls. E.g Get product information.
        console.log('ComponentDidMount called')
    }

    handleDelete = (counterId) => {
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({counters: counters});
    };

    handleReset = () => {
        const counters = this.state.counters.map(c => {c.value = 0; return c;});
        this.setState({counters: counters});
    };

    handleIncrement = (counter) => {
        console.log("Increment clicked!", counter);
        // Copy counters references
        const counters = [...this.state.counters];
        // Find incremented index
        const index = counters.indexOf(counter);
        // Make a incremented counter to replace
        counters[index] = {...counter};
        counters[index].value++;
        this.setState({counters: counters})
    };

    render() {
        console.log('render called')
        return (
        <React.Fragment>
        <Navbar totalCounters={this.state.counters.filter(c => c.value > 0).length}/>
        <main className="container">
          <Counters
              counters={this.state.counters}
              onDelete={this.handleDelete}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
          />
        </main>
        </React.Fragment>
    );
  }
}

export default App;
