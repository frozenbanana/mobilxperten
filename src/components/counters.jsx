import React, { Component } from 'react';
import Counter from "./counter";

class Counters extends Component{
    render() {
        // Object destructoring, getting the members of the object that we want...
        const {counters, onDelete, onIncrement, onReset} = this.props;
        return (
            <div>
                {
                    counters.map( c =>
                        <Counter key={c.id} counter={c} onDelete={onDelete} onIncrement={onIncrement}>
                            <p>Counter #{c.id}</p>
                        </Counter>)
                }
                <button onClick={onReset} className="btn btn-primary btn-sm m-2">Reset</button>
            </div>
        );
    }
}

export default Counters;