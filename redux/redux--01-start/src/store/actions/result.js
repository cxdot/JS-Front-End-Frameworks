import * as actionTypes from './actionTypes';

const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
}

// async code dispatching saveResult
export const storeResult = (res) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            // const oldCounter = getState().counter.counter;
            // console.log(oldCounter);
            dispatch(saveResult(res));
        }, 2000);
    }
}

export const deleteResult = (resElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        result: resElId
    };
};