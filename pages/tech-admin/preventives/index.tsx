import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import PreventiveTable from 'frontend/components/Tables/PreventiveTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IPreventive } from 'backend/models/interfaces'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import { Button } from 'flowbite-react'
import Preventive from 'backend/models/Preventive'

interface IPreventiveProps{
    preventives:IPreventive[]
}

export default function Preventives({preventives}:IPreventiveProps){



    return(
        <>
            <div className='flex justify-between items-center mb-5 bg-teal-400 p-5 rounded-md'>
                <h2 className='text-lg text-teal-50'>Preventivos</h2>
                <Link href='/tech-admin/preventives/new'>
                    <Button className='flex justify-between items-center bg-teal-200 text-teal-600 hover:bg-teal-600 hover:text-teal-200'>
                        <BsPlus size='30'/>
                        <h4>
                            Agregar preventivo
                        </h4>
                    </Button>
                </Link>
            </div>
            <hr className='mb-2' />
            <PreventiveTable preventives={preventives}/>
        </>
    )
}

export async function getServerSideProps({req, res}:GetServerSidePropsContext){
    await dbConnect()
    const docPreventives = await Preventive.find({}).populate(Preventive.populateParameter())
    if(!docPreventives) return {props:{}}

    return {props:{preventives:formatIds(docPreventives)}}
}