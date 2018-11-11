import React from 'react';
import Header from './Header';

class HomePage extends React.Component
{
    render()
    {
        return (
            <div>
                <Header />
                <div>
                    This is home.
                </div>
            </div>
        )
    }
}

export default HomePage

