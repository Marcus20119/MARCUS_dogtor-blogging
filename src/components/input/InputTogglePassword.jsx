import { useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from '.';
import { OpenEye, CloseEye } from '~/icons';

/**
 * @requires
 * @param {object} control - control from react-hook-form
 * @param {string} name - name of the input
 */

const InputTogglePassword = ({ control, name, ...props }) => {
  const [toggle, setToggle] = useState(false);
  const toggleComponent = (
    <div
      onClick={() => {
        setToggle(!toggle);
      }}
      style={{ cursor: 'pointer' }}
    >
      {toggle ? <OpenEye /> : <CloseEye />}
    </div>
  );
  return (
    <Input
      control={control}
      name={name}
      {...props}
      type={toggle ? 'text' : 'password'}
      icon={toggleComponent}
    />
  );
};

InputTogglePassword.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export { InputTogglePassword };
