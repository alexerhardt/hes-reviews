import React from 'react';

class CoursesPage extends React.Component
{
  showSettings(event)
  {
    event.preventDefault();
  }

  render()
  {
    return (
      <div>
        <Menu>
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </Menu>
        <div id="page-wrap">
          <p>Hello</p>
        </div>

      </div>
    )
  }
}

export default CoursesPage;
