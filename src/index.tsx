import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import { Action, ActionCreator, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { myMiddleWare } from './utils/constants';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleWare)
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppDispatch = typeof store.dispatch | ActionCreator<void>
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, TRootState, TRootState, Action>
>;

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