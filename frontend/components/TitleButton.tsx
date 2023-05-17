import useLoading from 'frontend/hooks/useLoading'
import { useRouter } from 'next/router'
import { BsPlus } from 'react-icons/bs'

interface props {
	title: string
	path: string
	nameButton: React.ReactNode
}

export default function TitleButton({ title, path, nameButton }: props): JSX.Element {
	const { startLoading, stopLoading } = useLoading()
	const router = useRouter()
	async function navigate(): Promise<void> {
		startLoading()
		await router.push(path)
		stopLoading()
	}

	function handleClick(): void {
		void navigate()
	}

	return (
		<>
			<div className="flex justify-between items-center px-5 py-4 border-bottom border-1 bg-white border-gray-400">
				<h2 className="text-xl font-semibold text-gray-600">{title}</h2>
				<button
					onClick={handleClick}
					className="flex gap-2 py-2 pl-2 pr-3 justify-between text-sm items-center bg-gray-900 text-white  hover:bg-gray-700 border border-1 border-gray-300 rounded-lg select-none"
				>
					<BsPlus size="20" />
					<h4>{nameButton}</h4>
				</button>
			</div>
			<hr className="bg-gray-100 mb-2" />
		</>
	)
}
