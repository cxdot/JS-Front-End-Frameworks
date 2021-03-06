import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axious-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Expedited', displayValue: 'Expedited'},
                        {value: 'Normal', displayValue: 'Normal'},
                    ]
                },
                value: 'Expedited',
                validation: {},
                touched: false,
                valid: true
            }
        },
        formIsValid: false,
    }
    
    
    orderHandler = (event) => {
        // prevent it from sending a request and reloading the page
        event.preventDefault();
        const formData = {};
        // formElementIdentifier = name, country, email, ect
        for(let formElementIdentifier in this.state.orderForm){
            // create key value pairs for properties and user inputs for submission
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
		const order = {
			ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }
    
    checkValidity(value, rules) {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    // update the value for a given input upon user changes, immutably
    inputChangedHandler = (event, inputIndentifier) => {
        // inputIndentifier = name, email, delivery method, ect
        // clone order form
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // clone the properties inside the selected order form element
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier]
        };
        // changing the value of the updated form
        updatedFormElement.value = event.target.value;
        // passing the value of the input and the validation property
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIndentifier] = updatedFormElement;
        // console.log(updatedFormElement);
        // set to true so that all values are checked and not just the last value
        let formIsValid = true;
        for( inputIndentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){
        const formElementsArray = [];
        // object into array to use with input elements
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valueType={formElement.id}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                { form }
            </div>   
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));