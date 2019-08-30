import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup = ({
    label,
    type,
    id,
    name,
    value,
    onChange,
    icon,
    info,
    errorMessage
}) => (
    <div className="row">
        <div className="col s12 input-field">
            <span className={`${icon} prefix`}></span>
            <input 
                className={classnames('form-input validate', {
                    'invalid': errorMessage
                })}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
            {info ? (<span className="helper-text">{info}</span>) : null}
            {errorMessage ? (<span className="helper-text invalid">{errorMessage}</span>) : null}
        </div>
    </div>
);

TextInputGroup.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    // info: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

TextInputGroup.defaultProps = {
    type: 'text'
};

export default TextInputGroup;