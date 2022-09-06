import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { TAppDispatch, TRootState } from '..'

export const useAppDispatch: () => TAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector