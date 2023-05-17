import AlertContext, { type AlertContextProps } from '../context/alertContext/AlertContext'
import { useContext } from 'react'

export default function useAlert(): AlertContextProps {
	const context = useContext(AlertContext)
	return context
}
