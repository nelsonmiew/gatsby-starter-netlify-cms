import React, { Component } from "react";

export class CardVehiclePlaceholder extends Component {
  render() {
    return (
      <div className="card-vehicle card-vehicle-placeholder d-block h-100 border-0" disabled={true}>
        <figure>
          <picture>
            <div className="aspectRatioPlaceholder">
              <div className="fill" style={{ paddingBottom: "62.2641%" }}></div>
            </div>
          </picture>
          <figcaption className="bg-white">
            <div className="p-adapt-3">
              <div className="aspectRatioPlaceholder">
                <div className="fill" style={{ paddingBottom: "55.2147%" }}></div>
              </div>
            </div>
            <div className="vehicle-price">
              <div className="aspectRatioPlaceholder">
                <div className="fill" style={{ paddingBottom: "16.9981%" }}></div>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default CardVehiclePlaceholder;
