import React, { Component } from 'react';


// used to load components asynchronous (only when needed)
const asyncComponent = (importComponent) => {
    return class extends Component{
        state = {
            component: null
        }

        componentDidMount(){
            importComponent()
                .then(args => {
                    this.setState({component: args.default});
                });
        }

        render(){
            const C = this.state.component;
            // checking to see if the component has been loaded
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;