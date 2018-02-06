// module imports
import React from 'react';

// local imports

// style imports

const MaterialIcon = ({ icon, color }) => {
  const style = {
    display: 'block',
    height: '24px',
    width: '24px',
    userSelect: 'none',
    transition: 'all 450ms cubic-bezer(0.23, 1, 0.32, 1) 0ms',
    margin: '12px'
  };
  let iconName = icon.replace(/Icon$/, '');
  let resolved = require(`material-ui-icons/${iconName}`).default;
  if (!resolved) {
    throw Error(`Could not find material-ui-icons/${iconName}`);
  }
  return React.createElement(resolved, { color, style });
};

export default MaterialIcon;
