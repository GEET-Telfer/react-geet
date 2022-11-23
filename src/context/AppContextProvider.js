
import { combineComponents } from '../utils/combineComponents';
import { ProgressCtxProvider } from './ProgressContext';

const providers = [
    ProgressCtxProvider
];

export const AppContextProvider = combineComponents(...providers);