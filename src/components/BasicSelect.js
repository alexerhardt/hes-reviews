import React from 'react';
import classnames from 'classnames';

class BasicSelect extends React.Component
{
  render()
  {
    const useValue = this.props.useValue;

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
            
            Array.from(this.props.options.values()).map((value, i) => {
              // A disgusting hack to switch between value and index
              const val = useValue ? value : i + 1;
              return <option value={val}>{value}</option>
            })
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