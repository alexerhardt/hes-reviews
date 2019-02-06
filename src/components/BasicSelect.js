import React from 'react';
import classnames from 'classnames';

class BasicSelect extends React.Component
{
  render()
  {
    return (
      <div
        className={classnames(
          'form-group',
          { 'has-error': this.props.error }
        )}
      >
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
        {
          this.props.error &&
          <p className="form-input-hint">
            {this.props.error}
          </p>
        }
      </div>
    )
  }

}

export default BasicSelect;