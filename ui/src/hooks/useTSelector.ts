import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { reducersTypes } from '../store/reducers/root'

export const useTSelector: TypedUseSelectorHook<reducersTypes> = useSelector