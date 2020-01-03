import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';


class ButtonViewer extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        // A good place to get new information if user has specified a certain product interest
        console.log('prevProps:', prevProps);
        console.log('prevState:', prevState);
        // if (prevProps.counter.value !== this.props.counter.value) {
        //     // make a server call and get new data
        // }
    }

    componentWillUnmount() {
        // Here you can clean up timers and such.
        console.log('Counter unmounted!');
    }

    render() {
        const { buttons, onClick } = this.props;
        return (
            <div>
                <ButtonToolbar>
                {
                    buttons.map(b => <Button
                        key={b.id}
                        variant="primary"
                        onClick={() => onClick(b)}>
                        {b.name}
                        </Button>)
                }
                </ButtonToolbar>
                {/*<button onClick={ () => this.props.onDelete(this.props.counter.id) } className="btn btn-danger btn-sm m-2">Delete</button>*/}
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

export default ButtonViewer;