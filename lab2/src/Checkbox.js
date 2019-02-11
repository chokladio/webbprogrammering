import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  name,
  onChange
}) => (<input type='checkbox' name={name} onChange={onChange}/>);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Checkbox;
