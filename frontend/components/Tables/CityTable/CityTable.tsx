import { type ICity, type IProvince } from 'backend/models/interfaces'
import { type ChangeEvent, useState } from 'react'
import { Table } from 'flowbite-react'
import Item from './Item'
import Filter from 'frontend/components/Filter'

interface props {
	cities: ICity[]
	provinces: IProvince[]
}
export default function CityTable({ cities, provinces }: props): JSX.Element {
	const [tableCities, setTableCities] = useState<ICity[]>(cities)
	const [type, setType] = useState<string>('')
	const [entities, setEntities] = useState<any[]>([] as any[])
	const filterTypes = ['Provincia']

	function selectEntity(e: ChangeEvent<HTMLSelectElement>): void {
		const { value } = e.target
		// +console.log(value);

		switch (type) {
			case 'Provincia':
				setTableCities(cities.filter((city) => (city.province as IProvince).name === value))
				break
			default:
				setTableCities(cities)
				break
		}
	}

	function selectType(e: ChangeEvent<HTMLSelectElement>): void {
		const { value } = e.target

		setType(value)
		switch (value) {
			case 'Provincia':
				setEntities(provinces)
				break
			default:
				break
		}
	}

	function clearFilter(): void {
		setType('')
		setEntities([] as any[])
		setTableCities(cities)
	}
	const deleteCity = (id: string): void => {
		const newTable = (prev: ICity[]): ICity[] => prev.filter((city) => city._id !== id)
		setTableCities(newTable(cities))
	}

	return (
		<div className="mb-6">
			<Filter
				types={filterTypes}
				entities={entities}
				selectType={selectType}
				selectEntity={selectEntity}
				clearFilter={clearFilter}
			/>
			<Table hoverable={true} className="bg-white">
				<Table.Head className="bg-white border-b">
					<Table.HeadCell>Nombre</Table.HeadCell>
					<Table.HeadCell>Provincia</Table.HeadCell>
					<Table.HeadCell className="w-40 text-center">Acciones</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{tableCities.map((city, index) => (
						<Item key={index} city={city} deleteCity={deleteCity} />
					))}
				</Table.Body>
			</Table>
		</div>
	)
}
