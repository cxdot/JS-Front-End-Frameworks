import * as actionTypes from './actionTypes';
import axios from '../../axious-orders';

// dispatched actions coming from container/BurgerBuilder/BurgerBuilder then to the BurgerBuilder reducer
export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    // dispatch available due to redux-thunk
    return dispatch => {    
        axios.get('https://burger-builder-e8a8c.firebaseio.com/ingredients.json')
            .then(res => {
                // data available on axios response
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
    };
};