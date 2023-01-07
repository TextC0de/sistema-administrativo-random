import { GetServerSidePropsContext } from "next"
import { IProvince, ICity, CityModel, IImage, ImageModel } from "../models/interfaces"
import mongoose from "mongoose"
import dbConnect from "../lib/dbConnect"
import User from "../models/User"


function CityCard ({city}:{city:ICity}){
    return (
        <>
            <div style={{border:'1px grey solid', padding:'1em', margin:'5em', borderRadius:'20px'}}>
                <h3>City: {city.name}</h3>
                <h3>Province: {city.province.name}</h3>
            </div>
        </>
    )
}

export default function Test({/* cities}:{cities:ICity[] */}){

    return(
        <>
            <h1>Testing!</h1>
            {/* cities.map((city,index)=><CityCard city={city} key={index}/>) */}
        </>
    )
}



export async function getServerSideProps({req,res}:GetServerSidePropsContext) {

    return { props: {/* cities */} }
  }