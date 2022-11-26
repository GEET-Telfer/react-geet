
import { combineComponents } from '../utils/combineComponents';
import { ProgressCtxProvider } from './ProgressContext';
import { AdminQuestionCtxProvider } from './AdminQuestionContext';
const providers = [
    ProgressCtxProvider,
    AdminQuestionCtxProvider
];

export const AppContextProvider = combineComponents(...providers);