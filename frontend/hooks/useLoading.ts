import LoadingContext, { type LoadingContextProps } from 'frontend/context/loadingContext/LoadingContext'
import { useContext } from 'react'

export default function useLoading(): LoadingContextProps {
	const context = useContext(LoadingContext)
	return context
}
