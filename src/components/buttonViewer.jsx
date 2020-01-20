import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";

class ButtonViewer extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    // A good place to get new information if user has specified a certain product interest
    console.log("prevProps:", prevProps);
    console.log("prevState:", prevState);
    // if (prevProps.counter.value !== this.props.counter.value) {
    //     // make a server call and get new data
    // }
  }

  componentWillUnmount() {
    // Here you can clean up timers and such.
    console.log("ButtonViewer unmounted!");
  }

  mapElements = (buttons, onclick) => {
    return buttons.map(b => (
      <Button key={b.id} variant="primary" onClick={() => onclick(b)}>
        {b.name}
      </Button>
    ));
  };

  render() {
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
