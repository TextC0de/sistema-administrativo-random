import Business from "backend/models/Business";
import { IBusiness } from "backend/models/interfaces";
import BusinessTable from "frontend/components/Tables/BusinessTable";
import dbConnect from "lib/dbConnect";
import { formatIds } from "lib/utils";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

interface props{
    businesses:IBusiness[]
}

export default function Businesses({businesses}:props){

    return(
        <>
            <div className='flex justify-between' >
                <h2 className='text-lg'>Empresas</h2>
                <Link href='/tech-admin/businesses/new'>
                    <button className='flex justify-between items-center'>
                        <BsPlus size='30'/>
                        <h4>Agregar una empresa</h4>
                    </button>
                </Link>
            </div>
            <hr className='mb-2'/>
            <BusinessTable businesses={businesses}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()
    const docBusinesses = await Business.find({})
    return {props:{businesses:formatIds(docBusinesses)}} 
}

