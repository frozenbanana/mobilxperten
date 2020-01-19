import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar";
import ButtonViewer from "./components/buttonViewer";
import DeviceViewer from "./components/deviceViewer";

class App extends Component {

    state = {
        counters: [
            {id: 1, value: 1},
            {id: 2, value: 0},
            {id: 3, value: 3}
        ],
        buttons: [
            { id: 0, name: 'Apple',
                children: [
                    { id:3, name: 'iPhone', children: [
                            {id:16, name: 'iPhone 6', children: []},
                            {id:17, name: 'iPhone 6s', children: []},
                            {id:18, name: 'iPhone 7', children: []}
                        ]
                         },
                    { id:4, name: 'iPad', children: {} },
                ]
            },
            { id: 1, name: 'Samsung',
                children: [
                    { id:5, name: 'Galaxy S5', children: {} },
                    { id:6, name: 'Galaxy S6', children: {} },
                    { id:7, name: 'Galaxy S7', children: {} },
                    { id:8, name: 'Galaxy S7 Edge', children: {} },
                    { id:9, name: 'Galaxy S8', children: {} },
                    { id:10, name: 'Galaxy Note 8', children: {} },
                    { id:11, name: 'Galaxy S9', children: {} },
                    { id:12, name: 'Galaxy Note 9', children: {} },
                ]
            }],
        isLoaded: false,
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
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isLoaded: true,
                    devices: json
                });
                console.log('Fetch done.');
                console.log('ComponentDidMount called', this.state)
            });
    }

    handleClick = (button) => {
        console.log('inside handleClick', this.state.buttons);
        const buttons = this.state.buttons;
        const idx = buttons.indexOf(button);
        this.setState({buttons: buttons[idx].children});
    }
    
    render() {
        const {isLoaded, devices } = this.state;
        if (isLoaded) {
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
                                <ButtonViewer buttons={this.state.buttons} onClick={this.handleClick}/>
                            </div>
                        </section>
                        <section>
                            {/* <DeviceViewer name={devices.phones.model}
                                          brand={devices.phones.manufacturer}
                                          repairs={devices.phones.reparations}/> */}
                        </section>
                        {/*{*/}
                        {/*    devices.phones.map(device => (*/}
                        {/*        <li key={device.id}>*/}
                        {/*            Namn: {device.model} | "Antal lagningar: " {device.reparations.length}*/}
                        {/*        </li>*/}
                        {/*    ))*/}
                        {/*}*/}
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
        } else {
            return (<p>Loading...</p>)
        }
    }
}

export default App;
