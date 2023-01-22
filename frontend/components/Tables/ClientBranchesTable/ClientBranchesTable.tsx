import { Table } from 'flowbite-react'
import mongoose from 'mongoose'
import { useState } from 'react'
import { IBranch } from 'backend/models/interfaces'
import Item from './Item'

interface props{
    branches:IBranch[]
}
export default function BranchTable({branches}:props){
    const [tableBranches, setTableBranches] = useState<IBranch[]>(branches)

    const deleteBranch = (id:string | mongoose.Schema.Types.ObjectId) =>{
        const newTable = (prev:IBranch[]) => prev.filter(branch => branch._id !== id)
        //console.log(newTable(branches));
        
        setTableBranches(newTable(branches))
    }

    
    return(
        <div className='mb-6'> 
            <Table hoverable={true}>
                <Table.Head >
                    <Table.HeadCell>Numero</Table.HeadCell>
                    <Table.HeadCell>Localidad</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableBranches.map((branch, index)=><Item key={index} branch={branch} deleteBranch={deleteBranch}/>)}
                </Table.Body>
            </Table>
        </div> 
    )
}