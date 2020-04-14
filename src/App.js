import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/navbar";
import ButtonViewer from "./components/buttonViewer";
import DeviceViewer from "./components/deviceViewer";
import DeviceCard from "./components/deviceCard";
import SellForm from "./components/sellForm";
import _ from "lodash";
// import Map from "./components/map";

import { Button } from "react-bootstrap";
class App extends Component {
    state = {
        isLoaded: false,
        onFinalSelection: false,
        selectedBranch: null,
        selectedDevice: null,
        decisionTree: {},
        originalDecisionTree: [],
    };

    constructor() {
        super();
        console.log("App constructor called");
    }

    fetchDevices(url) {
        let { decisionTree } = this.state;
        if (_.isEmpty(decisionTree)) {
            console.log('DecisionTree is empty. Will create new structure', decisionTree);
            decisionTree = this.initTreeStructure();
        }
        fetch(url, { mode: "cors" }).then(res => {
            return res.json();
        }).then(json => {
            json.forEach(device => {
                decisionTree.fix[device.brand.toLowerCase()][device.type.toLowerCase()].push(device);
            });
            this.setState({
                isLoaded: true,
                decisionTree: decisionTree,
                originalDecisionTree: decisionTree,
            });
        }).catch(err => {
            console.log("Fetch to api is not working.", err);
            this.setState({
                decisionTree: decisionTree,
                originalDecisionTree: decisionTree
            });
        });
    }

    componentDidMount() {
        this.fetchDevices('http://localhost:5000/api/devices');
    }

    initTreeStructure = () => {
        const tree = {
            fix: {
                apple: {
                    smartphone: [],
                    tablet: [],
                    computer: [],
                    wearable: [],
                },
                samsung: {
                    smartphone: [],
                    tablet: [],
                    computer: [],
                    wearable: []
                },
                huawei: {
                    smartphone: [],
                    tablet: [],
                    computer: [],
                    wearable: []
                },
                sony: {
                    smartphone: [],
                    tablet: [],
                    computer: [],
                    wearable: []
                },
            },
            buy: {
                apple: [],
                samsung: [],
                huawei: [],
                sony: [],
                other: []
            },
            sell: {
                apple: [],
                samsung: [],
                huawei: [],
                sony: [],
                other: []
            },
        }

        return tree;
    };

    handleClick = button => {
        // console.log("handleClick what is button", button);
        const { decisionTree } = this.state;
        let decision = button;

        if (decision.repairs) {
            this.setState({
                onFinalSelection: true,
                selectedDevice: decision,
                selectedBranch: 'fix'
            });
            return;
        }

        // Check if arrived at array of devices
        if (Array.isArray(decision) && decision[0].repairs) {
            // Since ButtonViewer always expects to render keys of objects
            // Array of Objects becomes objects with keys
            const arrayToObject = (array, keyField) =>
                array.reduce((obj, item) => {
                    obj[item[keyField]] = item;
                    return obj;
                }, {})

            let devicesArray = decision;
            const devicesObject = arrayToObject(devicesArray, "model");
            decision = devicesObject;
        }
        this.setState({
            decisionTree: decision
        });
    };

    handleReset = () => {
        const { originalDecisionTree } = this.state;
        this.setState({
            selectedDevice: null,
            decisionTree: originalDecisionTree,
            onFinalSelection: false,
            selectedBranch: null,
        });
    };

    mapFinalView = () => {
        const { onFinalSelection, selectedBranch, selectedDevice } = this.state;
        let view = null;
        console.log('final view',selectedBranch);
        if (onFinalSelection && selectedBranch.toLowerCase() === "fix") {
            view = (
                <DeviceViewer
                    name={selectedDevice.model}
                    repairs={selectedDevice.repairs}
                />
            );
        } else if (onFinalSelection && selectedBranch.toLowerCase() === "buy") {
            view = (
                <DeviceCard
                    cardText={selectedDevice.description}
                    img={selectedDevice.imgUrl}
                    quality={selectedDevice.quality}
                    price={selectedDevice.price}
                />
            );
        } else if (onFinalSelection && selectedBranch.toLowerCase() === "sell") {
            view = <SellForm />;
        }
        return view;
    };

    render() {
        const {
            isLoaded,
            decisionTree,
            onFinalSelection,
            selectedDevice,
            selectedBranch,
        } = this.state;
        if (!isLoaded) {
            return <p>Loading...</p>;
        }

        const buttonsView = (
            <ButtonViewer buttons={decisionTree} onClick={this.handleClick} />
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
                        </div>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
