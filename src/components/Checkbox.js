import React from 'react';

export default props => (
  <input {...props} type="checkbox" ref={input => {
    if (input) {
      input.indeterminate = props.indeterminate();
    }
  }} />
);
