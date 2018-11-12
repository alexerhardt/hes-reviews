import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';

class CourseListPage extends React.Component
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

export default CourseListPage;
