import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { myMiddleWare } from './utils/constants';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleWare)
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);