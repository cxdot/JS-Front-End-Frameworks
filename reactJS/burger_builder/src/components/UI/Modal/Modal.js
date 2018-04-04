import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState){
		// update if show state changed or if the children are not the same
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	componentWillUpdate(){
		console.log('[modal] WillUpdate');
	}

	render () {
		return(
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div 
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>	
			</Aux>
		)
	}
}

export default Modal;