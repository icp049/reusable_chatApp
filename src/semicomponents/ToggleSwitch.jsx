import React, { useState } from 'react';

function ToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <style>
        {`
          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
            background-color: #ccc;
            border-radius: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          
          .toggle-switch-slider {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
            transition: transform 0.3s ease;
          }
          
          .toggle-switch.on {
            background-color: #4caf50;
          }
          
          .toggle-switch.on .toggle-switch-slider {
            transform: translateX(20px);
          }
        `}
      </style>
      <div className={`toggle-switch ${isChecked ? 'on' : 'off'}`} onClick={toggleSwitch}>
        <div className="toggle-switch-slider"></div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
