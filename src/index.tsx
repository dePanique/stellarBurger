import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './components/services/reducers';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);