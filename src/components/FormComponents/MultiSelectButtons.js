import React, { Component, Fragment } from 'react';
import { Col, Label, Row } from 'components/Bootstrap';



class MultiSelectButtons extends Component {
    constructor(props) {
        super(props);
        this.result = [];
    }  

    render() {
        const { props, result } = this;
        const value = props.value || [];
        const htmlName = props.name;
        const setValue = props.onSetValue || ((x, y) => true);
        const label = props.label;
        const options = props.options || [];        
        return (
            <Row>
                <Col md={12}>
                    {label && <Label className={"d-inline-block texts text-medium w-100"} htmlFor={htmlName}>{label}</Label>}
                    <div className="" data-toggle="buttons">
                        {options.map((o, i) =>
                            <button key={htmlName + "_" + i} type="button" 
                            className={"button-big small" + (value.includes(o.value) ? " " : " invert")}
                                onClick={(e) => { e.preventDefault(); setValue(o.value) }}> {o.label}</button>
                        )}
                    </div>
                </Col>
            </Row>);
    }
}

export default MultiSelectButtons;