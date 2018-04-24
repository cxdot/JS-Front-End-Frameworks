import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axious-orders';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	}

	// fetch data
	componentDidMount () {
		// console.log(this.props);
		this.props.onInitIngredients();
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
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
		} else {
			// send to login/sign-up and then checkout
			this.props.onSetAuthRedirectPath('/checkout');
			// available through react router
			this.props.history.push('/auth');
		}
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
		this.props.onInitPurchase();
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

		let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
		
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
						isAuth={this.props.isAuthenticated}
						ordered={this.purchaseHandler} />
				</Aux>
			);
			orderSummary = <OrderSummary
				canceled={this.purchaseCancelHandler}
				continue={this.purchaseContinueHandler}
				ingredients={this.props.ings}
				price={this.props.price} />
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
}

export default connect(matchStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));