import Business from "backend/models/Business";
import { IBusiness } from "backend/models/interfaces";
import BusinessTable from "frontend/components/Tables/BusinessTable";
import TitleButton from "frontend/components/TitleButton";
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
            <TitleButton title='Empresas' path='/tech-admin/businesses/new' nameButton='Agregar una empresa'/>
            <BusinessTable businesses={businesses}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()
    const docBusinesses = await Business.find({})
    return {props:{businesses:formatIds(docBusinesses)}} 
}

