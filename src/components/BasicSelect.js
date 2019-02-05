import React from 'react';

class BasicSelect extends React.Component
{
  render()
  {
    return (
      <div className="form-group">
        <select 
          className="form-select"
          onChange={this.props.onChange}
        >
          <option value="">{this.props.placeholder}</option>
          {
            Array.from(this.props.options.values()).map((value, i) => (
              <option value={i + 1}>{value}</option>
            ))
          }
        </select>
      </div>
    )
  }

}

export default BasicSelect;