import React, { useState } from 'react';

function ToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`toggle-switch ${isChecked ? 'on' : 'off'}`} onClick={toggleSwitch}>
      <div className="toggle-switch-slider"></div>
    </div>
  );
}

export default ToggleSwitch;
