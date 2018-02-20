import React from 'react';

const checkValidation = (props) => {

    return(
        <div>
            { props.textLength > 5 ? 'Text long enough' : 'Text too short' }
        </div>
    )
}

export default checkValidation;