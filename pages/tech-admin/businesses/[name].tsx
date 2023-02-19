import { StreamRequestOptions } from "@google-cloud/storage/build/src/nodejs-common";
import Business from "backend/models/Business";
import { IBusiness } from "backend/models/interfaces";
import BusinessForm, { IBusinessForm } from "frontend/components/Forms/TechAdmin/BusinessForm";
import dbConnect from "lib/dbConnect";
import { deSlugify, formatIds } from "lib/utils";
import {GetServerSidePropsContext } from "next";

interface props{
    business:IBusiness
}

export default function EditBusiness({business}:props){
    const businessForm:IBusinessForm = {
        _id:business._id as string,
        name:business.name
    }
    return(
        <>
            <BusinessForm newBusiness={false} businessForm={businessForm}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    if(!params) return {props:{}}
    
    await dbConnect()
    const docBusiness = await Business.findOneUndeleted({name:deSlugify(params.name as string)})
    const props = {business:formatIds(docBusiness)}
    
    return {props}
}