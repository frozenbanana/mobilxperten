import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class DeviceViewer extends Component{
    render() {
        const {name, brand, repairs} = this.props;
        return (
            <Container>
                <h2>{"Laga en" + brand + " - " + name}</h2>
                <Row>
                    <Col>
                        <img className="card-img-top"
                             src="https://dustinweb.azureedge.net/image/485002/400/320/apple-iphone-11-64gb-svart.tif"
                             data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
                             alt="Card image cap"/>
                    </Col>
                    <Col>
                        <h3>Reperationspriser</h3>
                        <ul>
                            {repairs.map(r => <li key={r.name}>{r.name}- {r.price}</li>)}
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DeviceViewer;