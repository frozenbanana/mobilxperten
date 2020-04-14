import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import _ from "lodash";
class ButtonViewer extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        // A good place to get new information if user has specified a certain product interest
        console.log("prevProps:", prevProps);
        console.log("prevState:", prevState);
    }

    componentWillUnmount() {
        // Here you can clean up timers and such.
        console.log("ButtonViewer unmounted!");
    }

    mapElements = (buttons, onclick) => {
        console.log('inside map', buttons, Object.keys(buttons));
        return Object.keys(buttons).map(b =>
            (
                <Button key={_.uniqueId()} variant="primary" onClick={() => onclick(buttons[b])}>
                    {b}
                </Button>
            ));
    };

    render() {
        console.log('Rendering buttons', this.props);
        const { buttons, onClick } = this.props;
        const mappedButtons = this.mapElements(buttons, onClick);

        return (
            <div>
                <ButtonToolbar>{mappedButtons}</ButtonToolbar>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }
}

export default ButtonViewer;
