import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Dropdown = ({ 
    id,
    name,
    label,
    onChange,
    value,
    errorMessage
 }) => (
     <div className="input-field col s12">
         <span className="mdi mdi-bank prefix"></span>
         <select 
            onChange={onChange} 
            name={name} 
            id={id} 
            className={classnames('profile-field validate', {
                'invalid': errorMessage
            })}
            value={value}
        >
            <option disabled value="">Choose your Bank</option>
            <option value="First Bank">First Bank</option>
            <option value="Diamond Bank">Diamond Bank</option>
            <option value="AccessBank">AccessBank</option>
        </select>
        <label htmlFor={id}>{label}</label>
        {errorMessage ? (<span className="helper-text invalid-text">{errorMessage}</span>) : null}
     </div>
);

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default Dropdown;