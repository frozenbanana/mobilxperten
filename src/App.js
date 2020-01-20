import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/navbar";
import ButtonViewer from "./components/buttonViewer";
import DeviceViewer from "./components/deviceViewer";
import DeviceCard from "./components/deviceCard";
import SellForm from "./components/sellForm";
import Map from "./components/map";

import { Button } from "react-bootstrap";
class App extends Component {
    state = {
        isLoaded: false,
        onFinalSelection: false,
        selectedBranch: null,
        selectedDevice: null,
        devices: [],
        originalDevices: [],
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
                    originalDevices: json,
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
                selectedBranch: device.name,
            });
        }
        const selectedChildren = device.children;
        if (!selectedChildren) {
            console.log("Got to the end, and this is the device", device);
            this.setState({
                onFinalSelection: true,
                selectedDevice: device,
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
            selectedBranch: null,
        });
    };

    mapFinalView = () => {
        const { onFinalSelection, selectedBranch, selectedDevice } = this.state;
        let view = null;
        if (onFinalSelection && selectedBranch === "Laga") {
            view = (
                <DeviceViewer
                    name={selectedDevice.name}
                    repairs={selectedDevice.repairs}
                />
            );
        } else if (onFinalSelection && selectedBranch === "Köp") {
            view = (
                <DeviceCard
                    cardText={selectedDevice.description}
                    img={selectedDevice.imgUrl}
                    quality={selectedDevice.quality}
                    price={selectedDevice.price}
                />
            );
        } else if (onFinalSelection && selectedBranch === "Sälj") {
            view = <SellForm />;
        }
        return view;
    };

    render() {
        const {
            isLoaded,
            devices,
            onFinalSelection,
            selectedDevice,
            selectedBranch,
        } = this.state;
        if (!isLoaded) {
            return <p>Loading...</p>;
        }

        console.log("The devices: ", devices);
        console.log(
            "asd",
            selectedDevice,
            selectedBranch,
            selectedBranch === "Sälj"
        );

        const buttonsView = (
            <ButtonViewer buttons={devices} onClick={this.handleClick} />
        );

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
                            <h1 className="jumbotron-heading">
                                Vad vill du laga?
                            </h1>
                            <p className="lead text-muted">
                                Something short and leading about the collection
                                below—its contents, the creator, etc. Make it
                                short and sweet, but not too short so folks
                                don't simply skip over it entirely.
                            </p>
                            {onFinalSelection
                                ? this.mapFinalView()
                                : buttonsView}
                            {selectedBranch ? resetButton : null}
                        </div>
                    </section>
                    <section>
                        <div className="row">
                            <div className="col-6">
                                <h2>Öppettider</h2>
                                <p>Måndag - Fredag : 10.00 - 17.00 </p>
                                <p>Lördag : 12.00 - 15.00 </p>
                                <p>Söndag : Stängt </p>
                            </div>
                            <div className="col-6">
                                <Map />
                            </div>
                        </div>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
