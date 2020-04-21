import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import _ from "lodash";


class ButtonViewer extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        // A good place to get new information if user has specified a certain product interest
        // console.log("prevProps:", prevProps);
        // console.log("prevState:", prevState);
    }

    componentWillUnmount() {
        // Here you can clean up timers and such.
        console.log("ButtonViewer unmounted!");
    }

    mapElements = (buttons, onclick) => {
        const buttonStyle = { margin: "5px" };

        return Object.keys(buttons).map(key =>
            (
                <Button style={buttonStyle} key={_.uniqueId()} size={this.getButtonSize()} variant={this.getButtonVariant()} onClick={() => onclick(buttons[key], key)}>
                    {key}
                </Button>
            ));
    };

    render() {
        const { buttons, onClick } = this.props;
        const mappedButtons = this.mapElements(buttons, onClick);
        const styles = { justifyContent: 'center' };
        return (
            <div>
                <ButtonToolbar style={styles}>{mappedButtons}</ButtonToolbar>
            </div>
        );
    }

    getButtonVariant() {
        const { isInital } = this.props;
        let variant = isInital ? "success" : "primary";
        return variant;
    }

    getButtonSize() {
        const { isInital } = this.props;
        let size = isInital ? "lg " : "";
        return size;
    }
}

export default ButtonViewer;
