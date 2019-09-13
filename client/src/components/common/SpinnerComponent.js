import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SpinnerComponent = ({ loading, text }) => (
    <div className={classnames('button-container', { 'show': loading === true })}>
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
                <div className="gap-patch">
                    <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
        <p>{text}</p>
    </div>
);

SpinnerComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default SpinnerComponent;