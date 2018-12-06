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
          <div className="sub-pane-text sub-pane-editor">
              <textarea 
                  id="editor"
                  value={this.props.editorValue}
                  onFocus={this.props.onFocus}
                  onChange={this.props.onChange}
              >
              </textarea>
          </div>
          <div className="sub-pane-text sub-pane-preview">
              <div id="preview" 
                dangerouslySetInnerHTML={this.createMarkup(this.props.editorValue)}>
              </div>
          </div>
      </div>
    )
  }
}

export default MarkdownEditor;