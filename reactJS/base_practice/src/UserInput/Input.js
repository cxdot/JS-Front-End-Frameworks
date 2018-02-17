import React from 'react'

const UserInput = (props) => {
    const style = {
        width: '30%',
        border: '2px solid #129cf3',
        backgroundColor: '#fff',
        marginTop: '20px'
    }

    return <input style={style} type="text" onChange={props.changed} />
}

export default UserInput;