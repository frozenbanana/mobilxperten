import React, { Component } from 'react';

class Counter extends Component{
    // state = {
    //     value: this.props.counter.value,
    //     imageUrl: "https://picsum.photos/200",
    //     tags: ['tag1', 'tag2', 'tag3']
    // };

    styles = {
        fontSize: 18,
        fontWeight: 'bold'
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // A good place to get new information if user has specificed a certain product interest
        console.log('prevProps:', prevProps);
        console.log('prevState:', prevState);
        if (prevProps.counter.value !== this.props.counter.value) {
            // make a server call and get new data
        }
    }

    componentWillUnmount() {
        // Here you can clean up timers and such.
        console.log('Counter unmounted!');
    }

    render() {
        return (
            <div>
                <span style={this.styles} className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick={ () => this.props.onIncrement(this.props.counter) } className="btn btn-secondary btn-sm">Increment</button>
                <button onClick={ () => this.props.onDelete(this.props.counter.id) } className="btn btn-danger btn-sm m-2">Delete</button>
                {/*<ul>*/}
                {/*    { this.renderTags()}*/}
                {/*</ul>*/}
            </div>
        );
    }

    renderTags() {
        if (this.props.counter.tags.length === 0) return <p>There is no tags!</p>;
        return this.props.counter.tags.map(tag => <li key={tag}>{tag}</li>);
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;

        console.log (value === 0);
        return value === 0 ? 'ZERO' : value;
    }
}

export default Counter;