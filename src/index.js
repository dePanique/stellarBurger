import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { myMiddleWare } from './utils/constants';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleWare)
})

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

//     const enhancer = composeEnhancers(
//       applyMiddleware(thunkMiddleware, myMiddleWare)
//     );


// const store =  createStore(
//   rootReducer,
//   enhancer
// )

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

if (module.hot) {
  module.hot.accept();
}