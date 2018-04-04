import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axious-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            // turn orders object into an array
            for(let key in res.data){
                fetchedOrders.push({
                    // accessing the value for a given key which is the order
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            this.setState({ loading: false });
        });
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);