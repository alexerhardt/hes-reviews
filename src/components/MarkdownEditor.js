import React from 'react';
const marked = require('marked');

class MarkdownEditor extends React.Component
{
  createMarkup = (string) => {
      return {__html: marked(string)};
  }

  render()
  {
    return (
      <div id="sliding-window" className={this.props.windowPosition}>
          <div className="pane-frame pane-frame--editor">
            <div className="pane pane--editor">
                <h3 className="text-center">Write Here</h3>
                <textarea 
                    className="user-textbox user-textbox--editor card"
                    value={this.props.editorValue}
                    onFocus={this.props.onFocus}
                    onChange={this.props.onChange}
                    maxLength={this.props.maxLength}
                >
                </textarea>
            </div>
          </div>

          <div className="pane-frame pane-frame--preview">
            <div className="pane pane--preview">
              <h3 className="text-center">Preview</h3>
              <div  
                className="user-textbox user-textbox--preview"
                dangerouslySetInnerHTML={this.createMarkup(this.props.editorValue)}>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default MarkdownEditor;