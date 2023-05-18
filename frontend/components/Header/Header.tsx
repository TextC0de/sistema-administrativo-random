import { useRouter } from 'next/router'
import Image from 'next/image'
import * as apiEndpoints from 'lib/apiEndpoints'
import useUser from 'frontend/hooks/useUser'
import { useEffect } from 'react'
import { Dropdown } from 'flowbite-react'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { FaUserCircle } from 'react-icons/fa'

const logo = '/logo_placeholder.png'

export default function Header(): JSX.Element {
	const router = useRouter()
	const { user, loginUser, logoutUser, isLoggedIn } = useUser()
	const { startLoading, stopLoading } = useLoading()
	const logout = async (): Promise<void> => {
		try {
			startLoading()
			await fetcher.get(apiEndpoints.logoutUrl)
		} catch (error) {
			console.log(error)
			stopLoading()
			alert('Falló al intentar desloguear al usuario')
		}
		logoutUser()
		await router.push('/login')
		stopLoading()
	}

	useEffect(() => {
		if (!isLoggedIn) void loginUser()
	}, [])

	async function navigate(): Promise<void> {
		startLoading()
		await router.push('/')
		stopLoading()
	}

	const edit = async (): Promise<void> => {
		startLoading()
		await router.push('/edit-profile')
		stopLoading()
	}

	const handleNavigate = (): void => {
		void navigate()
	}

	const handleNavigateEdit = (): void => {
		void edit()
	}

	const handleLogout = (): void => {
		void logout()
	}

	return (
		<header className="fixed bg-white w-full shadow-md flex items-center justify-between px-6 z-50">
			<div className="flex-shrink-0 flex items-center justify-center">
				<button onClick={handleNavigate}>
					<Image height={'60px'} width={'155px'} src={logo} alt="pet care logo" />
				</button>
			</div>
			{isLoggedIn && <h2 className="flex items-center text-lg">Hola {user.firstName}!</h2>}
			<div className="flex justify-end">
				{isLoggedIn && (
					<div className="flex gap-2">
						<Dropdown label={<FaUserCircle size={18} />} color="black">
							<Dropdown.Header>
								<span className="block text-sm">{user.fullName}</span>
								<span className="block truncate text-sm font-medium">{user.email}</span>
							</Dropdown.Header>
							<Dropdown.Item onClick={handleNavigateEdit}>Ajustes</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleLogout}>Cerrar sesion</Dropdown.Item>
						</Dropdown>
					</div>
				)}
			</div>
		</header>
	)
}
