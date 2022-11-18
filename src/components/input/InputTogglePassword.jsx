import { useState } from 'react';
import { Input } from '.';
import { OpenEye, CloseEye } from '~/icons';

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

export { InputTogglePassword };
