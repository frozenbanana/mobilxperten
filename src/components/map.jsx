import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

class Map extends Component {
    render() {
        const { lat, lng, zoom, height, width } = this.props;
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: { lat }, lng: { lng } }}
                defaultZoom={zoom}
            ></GoogleMap>
        ));
        return (
            <div>
                <GoogleMapExample
                    containerElement={
                        <div style={{ height: { height }, width: { width } }} />
                    }
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default Map;
