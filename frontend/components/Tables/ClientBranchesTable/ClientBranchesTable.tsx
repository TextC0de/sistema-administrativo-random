import { IBranch } from 'backend/models/interfaces'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import Item from './Item'

interface props{
    branches:IBranch[]
}
export default function BranchTable({branches}:props){
    const [tableBranches, setTableBranches] = useState<IBranch[]>(branches)

    const deleteBranch = (id:string) =>{
        const newTable = (prev:IBranch[]) => prev.filter(branch => branch._id !== id)
        setTableBranches(newTable(branches))
    }

    return(
        <div className='rounded-none'> 
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                    <Table.HeadCell>Sucursal</Table.HeadCell>
                    <Table.HeadCell>Localidad</Table.HeadCell>
                    <Table.HeadCell className='w-40 text-center'>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableBranches.map((branch, index)=><Item key={index} branch={branch} deleteBranch={deleteBranch}/>)}
                </Table.Body>
            </Table>
        </div> 
    )
}