import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

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
                <CounterControl label="Add 10" clicked={this.props.onAdd5counter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtract5counter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(storedResult => (
                         <li key={storedResult.id} onClick={() => this.props.onDeleteResult(storedResult.id)}>{storedResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

// state we want to get
const mapStateToProps = state => {
    return {
        // accessing the reducers
        ctr: state.counter.counter,
        storedResults: state.result.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementcounter: () => dispatch({ type: actionTypes.INCREMENT}),
        onDecrementcounter: () => dispatch({ type: actionTypes.DECREMENT}),
        onAdd5counter: () => dispatch({ type: actionTypes.ADD, value: 10}),
        onSubtract5counter: () => dispatch({ type: actionTypes.SUBTRACT, value: 15}),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElementId: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);