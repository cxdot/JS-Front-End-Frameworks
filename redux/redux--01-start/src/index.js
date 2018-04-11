import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// merging multiple reducers
const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultReducer
})

const store = createStore(rootReducer);

// Provider is a helper component that allows us to inject our store to the react components
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
