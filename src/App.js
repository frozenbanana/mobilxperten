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
        ],
        isLoaded: false,
        devices: []
    };

    constructor() {
        super();
        console.log('App constructor called');
    }

    componentDidMount() {
        // Place to do server calls. E.g Get product information.
        fetch('https://my-json-server.typicode.com/frozenbanana/mobilxperten/db')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    devices: json
                });
                console.log('Fetch done.');
                console.log('ComponentDidMount called', this.state)
            });
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
        const {isLoaded, devices } = this.state;
        console.log('render called');
        if (!isLoaded) {
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
            </React.Fragment>);
        }
        else {
            return (
                <div>
                <ul>{devices.map(device => (
                        <li key={device.id}>
                            Namn: {device.model} | "Antal lagningar: "  {device.reparations.length}
                        </li>
                     ))}
                </ul>
            </div>)
        }

        }
}

export default App;
