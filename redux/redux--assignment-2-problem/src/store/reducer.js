const initialState ={
    persons: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'PERSON_ADDED':
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor(Math.random() * 40)
            }
            return{
                ...state,
                persons: state.persons.concat(newPerson)
            }
        case 'PERSON_DELETED':
            const updatedArray = state.persons.filter(person => person.id !== action.personId)
            return{
                ...state,
                persons: updatedArray
            }
        }
    return state;
}



export default reducer;