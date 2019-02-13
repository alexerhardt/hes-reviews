import React from 'react';

class MessageToast extends React.Component {

  render() {
    return (
      <div className={"bottom-toast toast " + this.props.class}>
        <button 
          className="btn btn-clear float-right"
          onClick={this.props.onClickDismiss}
        >
        </button>

        <h5>{this.props.headline}</h5>
        <p>{this.props.body}</p>
      </div>
    )
  }

}

export default MessageToast;
