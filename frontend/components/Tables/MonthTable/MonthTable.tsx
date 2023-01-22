import { Table } from 'flowbite-react'
import Item from './Item'
import { Month } from 'backend/models/types'

interface props{
    months:Month[],
    deleteMonth: (month:Month)=>void
}
export default function MonthTable({months, deleteMonth}:props){
    
    return(
        <div className='mb-6'>
            <Table hoverable={true}>
                <Table.Head className='bg-teal-400'>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {months.map((month, index)=><Item key={index} month={month} deleteMonth={deleteMonth}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}