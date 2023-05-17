import { type IBusiness, type ICity, type IClient, type IPreventive, type IProvince, type IUser } from 'backend/models/interfaces'

import Item from './Item'
import { Table } from 'flowbite-react'
import { type ChangeEvent, useState } from 'react'
import Filter from 'frontend/components/Filter'

interface IPreventiveProps {
    preventives: IPreventive[]
    cities: ICity[]
    provinces: IProvince[]
    techs: IUser[]
    businesses: IBusiness[]
    clients: IClient[]
}

export default function PreventiveTable({ preventives, cities, provinces, techs, businesses, clients }: IPreventiveProps): JSX.Element {
    const [preventivesTable, setPreventivesTable] = useState<IPreventive[]>(preventives)
    const [type, setType] = useState<string>('')
    const [entities, setEntities] = useState<any[]>([] as any[])
    const filterTypes = ['Localidad', 'Provincia', 'Tecnico', 'Empresa', 'Cliente']

    function selectEntity(e: ChangeEvent<HTMLSelectElement>): void {
        const { value } = e.target
        // +console.log(value);

        switch (type) {
            case 'Localidad':
                // const city = cities.find(city=>city.name === value)
                setPreventivesTable(preventives.filter(preventive => preventive.branch.city.name === value))
                break
            case 'Provincia':
                setPreventivesTable(preventives.filter(preventive => (preventive.branch.city.province as IProvince).name === value))
                break
            case 'Tecnico':
                setPreventivesTable(preventives.filter(preventive => preventive.assigned.some(tech => tech.fullName === value)))
                break
            case 'Empresa':
                setPreventivesTable(preventives.filter(preventive => preventive.business.name === value))
                break
            case 'Cliente':
                setPreventivesTable(() => preventives.filter(preventive => preventive.branch.client.name === value))
                break
            default:
                setPreventivesTable(preventives)
                break
        }
    }

    function selectType(e: ChangeEvent<HTMLSelectElement>): void {
        const { value } = e.target

        setType(value)
        switch (value) {
            case 'Localidad':
                setEntities(cities)
                break
            case 'Provincia':
                setEntities(provinces)
                break
            case 'Tecnico':
                setEntities(techs)
                break
            case 'Empresa':
                setEntities(businesses)
                break
            case 'Cliente':
                setEntities(clients)
                break
            default:
                break
        }
    }

    function clearFilter(): void {
        setType('')
        setEntities([] as any[])
        setPreventivesTable(preventives)
    }

    const deletePreventive = (id: string): void => {
        setPreventivesTable(preventivesTable.filter(preventive => preventive._id !== id))
    }

    return (
        <>
            <Filter types={filterTypes} entities={entities} selectType={selectType} selectEntity={selectEntity} clearFilter={clearFilter}/>
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                        <Table.HeadCell>Empresa</Table.HeadCell>
                        <Table.HeadCell>Sucursal</Table.HeadCell>
                        <Table.HeadCell>Tecnico Asignado</Table.HeadCell>
                        <Table.HeadCell>Frecuencia</Table.HeadCell>
                        <Table.HeadCell>Meses impuestos</Table.HeadCell>
                        <Table.HeadCell>Observaciones</Table.HeadCell>
                        <Table.HeadCell>Ultima vez</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>
                        <Table.HeadCell>Fecha bateria</Table.HeadCell>
                        <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head >
                <Table.Body >
                    {preventivesTable.map((preventive, index) => <Item key={index} preventive={preventive} deletePreventive={deletePreventive}/>)}
                </Table.Body>
            </Table>
        </>
    )
}
