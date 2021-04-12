import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/Loading'

const classLoading = "fa fa-spinner fa-spin fa-fw";
const classOk = "fa fa-check";

class TextWithLoading extends Component {
    componentDidUpdate(prevProps) {

    }
    render() {
        const { loading, value } = this.props;     
        return (
            <div className="textWithLoading input-group mb-3">
                <span type="text" className={"p-1"}>
                  {value}
                </span>
                <div className="input-group-append">
                    <span className={"input-group-text"} disabled><span className={loading ? classLoading : classOk}></span></span>
                </div>
            </div>
        );
    }
}

TextWithLoading.propTypes = {
    loading: PropTypes.bool,
    text:  PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TextWithLoading;

export const TextWithLoadingRedux = ({ input, ...props }) => (
    <TextWithLoading {...props} {...input} />
  );
  