import React, { Component } from "react";

class DeviceCard extends Component {
  render() {
    // Object destructoring, getting the members of the object that we want...
    const { cardText, img, price, quality } = this.props;
    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img className="card-img-top" src={img} />
          <div className="card-body">
            <p className="card-text">{cardText}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-success btn-sm">
                  Köp
                </button>
              </div>
              <p>{price} :- </p>
              <small>{quality}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceCard;
