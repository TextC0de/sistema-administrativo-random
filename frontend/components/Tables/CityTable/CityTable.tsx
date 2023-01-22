import { Table } from 'flowbite-react'
import mongoose from 'mongoose'
import { useState } from 'react'
import { ICity } from 'backend/models/interfaces'
import Item from './Item'

interface props{
    cities:ICity[]
}
export default function CityTable({cities}:props){
    const [tableCities, setTableCities] = useState<ICity[]>(cities)

    const deleteCity = (id:string | mongoose.Schema.Types.ObjectId) =>{
        const newTable = (prev:ICity[]) => prev.filter(city => city._id !== id)
        //console.log(newTable(cities));
        
        setTableCities(newTable(cities))
    }

    
    return(
        <div className='mb-6'>
            <Table hoverable={true}>
                <Table.Head >
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Province</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableCities.map((city, index)=><Item key={index} city={city} deleteCity={deleteCity}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}