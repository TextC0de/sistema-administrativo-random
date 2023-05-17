import { useRouter } from 'next/router'
import useLoading from 'frontend/hooks/useLoading'

interface props {
	title: string
	path: string
	icon: JSX.Element
	toggle: boolean
	selectItem: (id: number) => void
	id: number
}

export default function Item({ title, path, icon, toggle, selectItem, id }: props): JSX.Element {
	const router = useRouter()
	const { startLoading, stopLoading } = useLoading()
	async function navigate(): Promise<void> {
		selectItem(id)
		startLoading()
		await router.push(path)
		stopLoading()
	}

	const handleNavigate = (): void => {
		void navigate()
	}

	return (
		<button
			className={`flex items-center w-full h-12 px-4 mt-1 rounded ${
				toggle ? 'bg-gray-700 text-gray-300' : ''
			} hover:bg-gray-700 hover:text-gray-300`}
			onClick={handleNavigate}
		>
			{icon}
			<span className="ml-2 text-sm font-medium select-none">{title}</span>
		</button>
	)
}
