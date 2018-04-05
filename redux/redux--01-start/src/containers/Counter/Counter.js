import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementcounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementcounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAdd5counter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtract5counter}  />
            </div>
        );
    }
}

// state we want to get
const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementcounter: () => dispatch({ type: 'INCREMENT'}),
        onDecrementcounter: () => dispatch({ type: 'DECREMENT'}),
        onAdd5counter: () => dispatch({ type: 'ADD'}),
        onSubtract5counter: () => dispatch({ type: 'SUBTRACT'})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);