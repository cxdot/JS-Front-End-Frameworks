import * as actionTypes from '../actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({ value: state.counter, id: new Date(), value: action.result })
            }
        case actionTypes.DELETE_RESULT:
            // new array with the ids not equal to the id of the clicked index
            const updatedArray = state.results.filter(result => result.id !== action.resultElementId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
}

export default reducer;