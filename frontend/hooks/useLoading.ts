import { useContext } from 'react';

import LoadingContext, {
    type LoadingContextProps,
} from 'frontend/context/loadingContext/LoadingContext';

export default function useLoading(): LoadingContextProps {
    const context = useContext(LoadingContext);
    return context;
}
