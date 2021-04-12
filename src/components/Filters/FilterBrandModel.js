import React, { Component } from "react";
import { connect } from "react-redux";
// import BrandSegmentsExplorer from "../FindVehicle/components/BrandModelsExplorer";

export class FilterBrandModels extends Component {
  

  render() {
    return (
      <div><h1>BrandSegmentsExplorer</h1></div>
      // <BrandSegmentsExplorer />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBrandModels);