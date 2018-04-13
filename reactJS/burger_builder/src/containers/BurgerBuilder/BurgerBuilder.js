import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axious-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		err: false
	}

	// fetch data
	componentDidMount () {
		// axios.get('https://burger-builder-e8a8c.firebaseio.com/ingredients.json')
		// 	.then(res => {
		// 		this.setState({ingredients: res.data});
		// 	})
		// 	.catch(err => {
		// 		this.setState({err: true})
		// 	});
	}

	updatePurchaseState (ingredients){
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	// MANAGING WITH REDUX; NO LONGER NEED QUERY PARAMS
	// purchaseContinueHandler = () => {
	// 	const queryParams = [];
	// 	for(let i in this.state.ingredients){
	// 		// setting property name equal to property value
	// 		queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
	// 	}
	// 	// passing in total price to checkout component 
	// 	queryParams.push('price=' + this.state.totalPrice);
	// 	const queryString = queryParams.join('&');
	// 	this.props.history.push({
	// 		pathname: '/checkout',
	// 		search: '?' + queryString
	// 	});
	// }

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// returns true or false IE: {salad: true, meat: false } 

		let orderSummary = null;

		let burger = this.state.err ? <p>Ingredients cant be loaded!</p> : <Spinner />;
		
		if(this.props.ings){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHandler} />
				</Aux>
			);
			orderSummary = <OrderSummary
				canceled={this.purchaseCancelHandler}
				continue={this.purchaseContinueHandler}
				ingredients={this.props.ings}
				price={this.props.price} />
		}
		
		if(this.state.loading){
			orderSummary = <Spinner />; 
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{ burger }
			</Aux>
		);
	}
}

const matchStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	};
}

export default connect(matchStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));