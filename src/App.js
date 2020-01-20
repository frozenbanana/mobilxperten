import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/navbar";
import ButtonViewer from "./components/buttonViewer";
import DeviceViewer from "./components/deviceViewer";
import DeviceCard from "./components/deviceCard";
import { Button } from "react-bootstrap";
class App extends Component {
  state = {
    isLoaded: false,
    onFinalSelection: false,
    selectedBranch: null,
    selectedDevice: null,
    devices: [],
    originalDevices: []
  };

  constructor() {
    super();
    console.log("App constructor called");
  }

  componentDidMount() {
    console.log("Inside componentDidMount");
    // Place to do server calls. E.g Get product information.
    fetch("http://localhost:3000/data")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          isLoaded: true,
          devices: json,
          originalDevices: json
        });
        console.log("ComponentDidMount called", this.state);
      });
  }

  handleClick = button => {
    const { devices, selectedBranch } = this.state;
    const idx = devices.indexOf(button);

    const device = devices[idx];

    if (!selectedBranch) {
      this.setState({
        selectedBranch: device.name
      });
    }
    const selectedChildren = device.children;
    if (!selectedChildren) {
      console.log("Got to the end, and this is the device", device);
      this.setState({
        onFinalSelection: true,
        selectedDevice: device
      });
      return;
    }
    this.setState({ devices: selectedChildren });
  };

  handleReset = () => {
    const { originalDevices } = this.state;
    this.setState({
      selectedDevice: null,
      devices: originalDevices,
      onFinalSelection: false,
      selectedBranch: null
    });
  };

  render() {
    const {
      isLoaded,
      devices,
      originalDevices,
      onFinalSelection,
      selectedDevice,
      selectedBranch
    } = this.state;
    let deviceView = null;
    if (!isLoaded) {
      return <p>Loading...</p>;
    }

    console.log("The devices: ", devices);
    console.log(
      "asd",
      selectedDevice,
      selectedBranch,
      selectedBranch === "Köp"
    );

    const buttonsView = (
      <ButtonViewer buttons={devices} onClick={this.handleClick} />
    );
    if (onFinalSelection && selectedBranch === "Laga") {
      deviceView = (
        <DeviceViewer
          name={selectedDevice.name}
          repairs={selectedDevice.repairs}
        />
      );
    } else if (onFinalSelection && selectedBranch === "Köp") {
      console.log("asd", selectedDevice);
      deviceView = (
        <DeviceCard
          cardText={selectedDevice.description}
          img={selectedDevice.imgUrl}
          quality={selectedDevice.quality}
          price={selectedDevice.price}
        />
      );
    }

    const resetButton = (
      <Button variant="danger" onClick={this.handleReset}>
        Börja om
      </Button>
    );
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="jumbotron-heading">Vad vill du laga?</h1>
              <p className="lead text-muted">
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don't simply skip over it entirely.
              </p>
              {onFinalSelection ? deviceView : buttonsView}
              {devices !== originalDevices ? resetButton : null}
            </div>
          </section>
          <section>
            <h2 className="text-center">Smartphones och Tablets till Salu</h2>
            <div className="row">
              <DeviceCard
                cardText="This is very nice phone because you can make phone calls and take pictures and such. Kings 100 years ago would go to war killing millions of innocent babies just to get half as good a phone than this. Can you imagine? Just buy it. and yes... You can use snapchat on it. Fucking brat. "
                img="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                price="1199"
              ></DeviceCard>
              <DeviceCard
                cardText="This is very nice phone because you can make phone calls and take pictures and such. Kings 100 years ago would go to war killing millions of innocent babies just to get half as good a phone than this. Can you imagine? Just buy it. and yes... You can use snapchat on it. Fucking brat. "
                img="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                price="1299"
              ></DeviceCard>
              <DeviceCard
                cardText="This is very nice phone because you can make phone calls and take pictures and such. Kings 100 years ago would go to war killing millions of innocent babies just to get half as good a phone than this. Can you imagine? Just buy it. and yes... You can use snapchat on it. Fucking brat. "
                img="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                price="1399"
              ></DeviceCard>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
