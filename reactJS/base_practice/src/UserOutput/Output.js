import React from 'react';

const UserOutput = (props) => {
    const style = {
        fontSize: '20px',
        textTransform: 'uppercase'
    }

    return (
        <div>
            <p style={style}>{props.username}</p>
            <p style= {style}>{props.username}</p>
        </div>
    )
}

export default UserOutput;