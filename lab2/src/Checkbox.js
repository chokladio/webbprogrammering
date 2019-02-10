import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  name,
  arr,
  checked = false,
  onChange
}) => (<span>
  <input type='checkbox' checked={checked} name={name} onChange={onChange}/>
</span>);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Checkbox;
