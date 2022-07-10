import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './components/services/reducers';

const store = configureStore({
  reducer: rootReducer,
})

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);