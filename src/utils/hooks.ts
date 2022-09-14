import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppThunk, TAppDispatch, TRootState } from '..'

export const appUseDispatch: () => TAppDispatch = useDispatch
export const appUseSelector: TypedUseSelectorHook<TRootState> = useSelector