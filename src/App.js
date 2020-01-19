import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar";
import ButtonViewer from "./components/buttonViewer";
import DeviceViewer from "./components/deviceViewer";

class App extends Component {

    state = {
        isLoaded: false,
        onFinalSelection: false,
        selectedDevice: null,
        devices: [],
    };

    constructor() {
        super();
        console.log('App constructor called');
    }

    componentDidMount() {
        console.log('Inside componentDidMount');
        // Place to do server calls. E.g Get product information.
        fetch('https://my-json-server.typicode.com/frozenbanana/mobilxperten/db')
            .then(res => {
                console.log(res);
                res.json();})
            .then(json => {
                this.setState({
                    isLoaded: true,
                    devices: json
                });
                console.log('Fetch done', json);
                console.log('ComponentDidMount called', this.state)
            });
    }

    handleClick = (button) => {
        console.log('inside handleClick', this.state.buttons);
        const {devices} = this.state.devices;
        const idx = devices.indexOf(button);

        const device = devices[idx];
        const selectedChildren = device.children;
        if (!selectedChildren) {
            this.setState("Got to the end, and this is the device", device);
            this.state( {
                onFinalSelection: true,
                selectedDevice: device
            });
            return;
        }
        this.setState({devices: selectedChildren});
    }

    render() {
        const {isLoaded, devices, onFinalSelection, selectedDevice} = this.state;

        if (!isLoaded) {
            return (<p>Loading...</p>);
        }

        console.log("The devices: ", devices);

        let deviceChoiceSection = <ButtonViewer buttons={devices} onClick={this.handleClick}/>;

        if (onFinalSelection) {
            deviceChoiceSection = <DeviceViewer name={selectedDevice.model}
                                                brand={selectedDevice.manufacturer}
                                                repairs={selectedDevice.reparations}/>;
        }

        return (
            <React.Fragment>
                <Navbar/>
                <main className="container">
                    <section className="jumbotron text-center">
                        <div className="container">
                            <h1 className="jumbotron-heading">Vad vill du laga?</h1>
                            <p className="lead text-muted">Something short and leading about the collection
                                below—its contents, the creator, etc. Make it short and sweet, but not too short so
                                folks don't simply skip over it entirely.</p>
                            {deviceChoiceSection}
                            {/*TODO - do as JSX ternary for didactic purposes*/}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-center">Smartphones och Tablets till Salu</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top"
                                         src="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                                         data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below
                                            as a natural lead-in to additional content. This content is a little
                                            bit longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">View
                                                </button>
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">Edit
                                                </button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top"
                                         src="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                                         data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below
                                            as a natural lead-in to additional content. This content is a little
                                            bit longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">View
                                                </button>
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">Edit
                                                </button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top"
                                         src="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                                         data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below
                                            as a natural lead-in to additional content. This content is a little
                                            bit longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">View
                                                </button>
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-secondary">Edit
                                                </button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </React.Fragment>);
    }
}

export default App;
