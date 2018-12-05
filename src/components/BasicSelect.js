import React from 'react';

class BasicSelect extends React.Component
{
  render()
  {
    return (
      <div className="form-group">
        <select className="form-select">
          <option>{this.props.placeholder}</option>
          {
            Array.from(this.props.options.values()).map(value => (
              <option>{value}</option>
            ))
          }
        </select>
      </div>
    )
  }

}

export default BasicSelect;