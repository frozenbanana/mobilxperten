import React, { Component } from "react";
import { Button } from "react-bootstrap";

class SellForm extends Component {
  state = {
    questions: [
      { name: "model", placeholder: "Ange modelnamn", type: "text", value: "" },
      { name: "otherInfo", placeholder: "Övrig info", type: "text", value: "" }
    ],
    idx: 0
  };

  handleSubmit = () => {
    console.log("Sending data to backend...");
  };

  mapForm = () => {
    let inputs = [this.state.model, this.state.isLocked, this.state.otherInfo];
  };

  handleChange = event => {
    let { questions, idx } = this.state;
    this.setState({
      questions: questions.map((q, _idx) => {
        if (_idx == idx) {
          return { ...q, value: event.target.value }; // the correct question elements value to be updated
        }
        return q;
      })
    });
  };

  render() {
    // Object destructoring, getting the members of the object that we want...
    const { questions, idx } = this.state;
    console.log("rendering form.", questions);

    const nextButton = (
      <Button variant="primary" onClick={() => this.setState({ idx: idx + 1 })}>
        Next
      </Button>
    );

    const backButton = (
      <Button variant="primary" onClick={() => this.setState({ idx: idx - 1 })}>
        Back
      </Button>
    );

    const submitButton = (
      <Button variant="success" onClick={this.handleSubmit}>
        Skicka in
      </Button>
    );

    let begining = true;
    let finished = false;
    if (idx >= questions.length - 1) {
      finished = true;
    }
    if (idx > 0) {
      begining = false;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Beskriv din model för att få ett estimerat bud</p>
          <input
            type={questions[idx].type}
            value={questions[idx].value}
            onChange={this.handleChange}
            placeholder={questions[idx].placeholder}
            required
          />
        </form>

        {!begining ? backButton : null}
        {!finished ? nextButton : null}
        {finished ? submitButton : null}
      </div>
    );
  }
}

export default SellForm;
