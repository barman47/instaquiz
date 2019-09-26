import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FundsTextInput = ({
    label,
    type,
    id,
    name,
    value,
    placeholder,
    onChange,
    icon,
    info,
    disabled,
    errorMessage
}) => (
    <div className="input-field">
        <span className={`${icon} prefix`}></span>
        <input 
            className={classnames('form-input profile-field validate', {
                'invalid': errorMessage
            })}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        <label htmlFor={id}>{label}</label>
        {info ? (<span className="helper-text">{info}</span>) : null}
        {errorMessage ? (<span className="helper-text invalid-text">{errorMessage}</span>) : null}
    </div>
);

FundsTextInput.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    icon: PropTypes.string.isRequired,
    info: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

FundsTextInput.defaultProps = {
    type: 'text'
};

export default FundsTextInput;