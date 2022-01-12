import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import vaultReducer from '../features/vault/vaultSlice';
import { multicall } from './multicall';

export const rootReducer = combineReducers({
  [multicall.reducerPath]: multicall.reducer,
  counter: counterReducer,
  vault: vaultReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
